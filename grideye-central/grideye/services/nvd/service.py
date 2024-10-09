"""Service module for interacting with the NVD API and NVD data (json) files."""
import time
from datetime import datetime, timezone
from typing import Any, Dict, Generator, List, Mapping

import msgspec
import requests
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
from msgspec.structs import asdict

from grideye.db.models.nvd import (
    Configuration,
    CpeCriteria,
    Cve,
    CveJsonResponse,
    NvdAuditLog,
    NvdUpdateMode,
)
from grideye.services.elasticsearch import service as elastic_service
from grideye.settings import ConfigJsonFileSettings, LogLevel, logger, settings

# CONSTANTS defined here.
# Number of seconds we need to wait between NVD API requests.
NVD_API_COOLDOWN_SECONDS: float = 6.0
# This is the maximum number of CVE records we can pull in one request to NVD.
NVD_API_BATCH_SIZE: int = 2000
# The expected HTTP status code for a successful request to the NVD API.
NVD_RESPONSE_SUCCESS_STATUS_CODE: int = 200

# NOTE - when splitting the CPE formatted string, we should get exactly 13 parts.
CPE_CRITERIA_PARTS: int = 13


def create_nvd_audit_log(
    mode_of_update: NvdUpdateMode,
    nvd_filename: str | None = None,
) -> None:
    """
    Create an audit log object and call function in elasticsearch service.py to insert.

    :param mode_of_update: The mode of update (Web, CLI or automated task).
    :param nvd_filename: The filename of the NVD JSON file that was updated, only used
        when the mode of update is Web or CLI.

    .. note::
        TODO - Insert the actual user ID for the user. For now, it's just a placeholder.
    """
    # Get the current time and date (UTC).
    time_of_update: datetime = datetime.now(timezone.utc)

    updated_by: str = "user"

    nvd_audit_log: NvdAuditLog = NvdAuditLog(
        time_of_update,
        updated_by,
        mode_of_update,
        nvd_filename,
    )

    # Insert the audit log entry into the audit index.
    create_audit_log_entry(nvd_audit_log=nvd_audit_log)


def get_nvd_data(result_per_page: int, start_index: int) -> bytes:
    """
    Get the latest CVE data from the NIST NVD API.

    :param result_per_page: The number of results to return per page (max 2000).
    :param start_index: The index of the first result to return i.e. the offset.
    :return: Bytes (raw string) of the CVEs JSON data.
    """
    # Load the settings for NVD, loaded from the 'config.json' file.
    config_file_settings: ConfigJsonFileSettings = settings.get_config_file_settings()

    # Get the CVEs from the NIST NVD service.py as a JSON string.
    response = requests.request(
        method="GET",
        url="{0}/?resultsPerPage={1}&startIndex={2}".format(
            config_file_settings.NIST_NVD_API_URL,
            result_per_page,
            start_index,
        ),
        headers={
            "Content-Type": "application/json",
            "apiKey": config_file_settings.NIST_NVD_API_KEY,
        },
        timeout=config_file_settings.NIST_NVD_API_TIMEOUT,
    )

    # If the API request was not successful, check the response for an error message.
    if response.status_code != NVD_RESPONSE_SUCCESS_STATUS_CODE:
        check_nvd_response_error(response)

    return response.content


def get_total_cve_record_count() -> int:
    """
    Request the NIST NVD API to get the total number of CVE records.

    We will use this total number to determine how many batches to process assuming a
    batch size of 2000 (the maximum allowed by the NVD API).

    :return: Total number of CVE records in the NIST NVD database.
    :raises ValueError: If we fail to get the total number of records from a string.
    """
    # Load the settings for NVD, loaded from the 'config.json' file.
    config_file_settings: ConfigJsonFileSettings = settings.get_config_file_settings()

    response: requests.Response = requests.request(
        method="GET",
        url=f"{config_file_settings.NIST_NVD_API_URL}/?resultsPerPage=1&startIndex=0",
        headers={
            "Content-Type": "application/json",
            "apiKey": config_file_settings.NIST_NVD_API_KEY,
        },
        # Setting a large 30 seconds timeout; timeout will default to 0 (no timeout)
        #  which can cause the request/program to hang indefinitely.
        timeout=config_file_settings.NIST_NVD_API_TIMEOUT,
    )
    # If the API request was not successful, check the response for an error message.
    if response.status_code != NVD_RESPONSE_SUCCESS_STATUS_CODE:
        check_nvd_response_error(response)

    # Get the total number of records from the NVD API response.
    response_json: Dict[str, Any] = response.json()
    total_records: str | None = response_json.get("totalResults")
    if total_records is None:
        raise ValueError("totalResults not found in NVD API response!")
    # Return the total results count as an integer.
    try:
        return int(total_records)
    except ValueError as exc:
        raise ValueError(
            f"Conversion to int failed! [totalResults: {total_records}]",
        ) from exc


def check_nvd_response_error(response: requests.Response) -> None:
    """
    Check the NVD API response for an error message in the 'message' HTTP header.

    :param response: The response object from the NVD API request.
    :raises RuntimeWarning: If the NVD settings are not loaded.
    """
    error_message = response.headers.get("message")
    logger(
        f"NVD Response: {response.status_code} {response.reason}"
        f"[API error message: {error_message}]",
        LogLevel.ERROR,
    )
    raise RuntimeWarning(
        f"NVD Response: {response.status_code} {response.reason}"
        f"[API error message: {error_message}]",
    )


def convert_cve_json_to_struct(cve_data: bytes) -> CveJsonResponse:
    """
    Convert and validate the NVD CVEs JSON (bytes) to a struct object using msgspec.

    :param cve_data: The CVEs JSON string (bytes) coming from the API or a .json file.
    :return: A struct object of the CVEs JSON data.
    :rtype: CveJsonResponse
    :raises msgspec.ValidationError: If the JSON string fails to validate.
    """
    try:
        # Convert the JSON string to a struct object using msgspec.
        cve_json_obj: CveJsonResponse = msgspec.json.decode(
            cve_data,
            type=CveJsonResponse,
        )
        total: int = cve_json_obj.totalResults
        # Validate the struct object.
        logger(f"Converted NVD JSON to a struct object. [Total results: {total}]")
        return cve_json_obj
    except msgspec.ValidationError as exc:
        logger(
            f"Failed to decode the NVD response JSON using msgspec. {exc}",
            LogLevel.ERROR,
        )
        raise


def task_get_cves() -> bool:  # noqa: WPS210
    """
    Get the CVE data from the NIST NVD API into elastic database.

    :return: True if processed all the CVE data successfully.
    """
    # Adding 2 to the number of batches to account for the remainder and offset.
    total_records_count: int = get_total_cve_record_count()

    # Calculate the total number of API requests to make to the NVD API.
    total_requests_count: int = (total_records_count // NVD_API_BATCH_SIZE) + 1

    # Get the CVEs from the NIST NVD service as a JSON string.
    start_index = 0

    logger(
        f"NVD Task [Total NVD Records: {total_records_count}] "
        f"[Requests Count: {total_requests_count}].",
    )

    for i in range(0, total_requests_count):  # noqa: WPS111
        # Sleep for 6 seconds between API requests as per the NVD API guidelines. We
        # just made an API request above to get the `total_records_count`.
        nvd_api_cooldown()

        # Log the progress of the API requests. The current / total (percentage).
        task_progress: float = (i / total_requests_count) * 100
        # Log the API record offset and task progress.
        logger(
            f"NVD API Request [start_index: {start_index}] "
            f"[Requests Progress: {i} / {total_requests_count} ({task_progress:.1f}%)]",
        )

        # Get 2000 records from the NVD API.
        # NOTE - this is a raw JSON string returned as bytes in the response body.
        response_body: bytes = get_nvd_data(
            result_per_page=NVD_API_BATCH_SIZE,
            start_index=start_index,
        )

        # Increment the start index (offset) for the next request.
        start_index += NVD_API_BATCH_SIZE

        try:
            # Convert the JSON string to a struct object using msgspec.
            cve_json_obj: CveJsonResponse = convert_cve_json_to_struct(response_body)
        except msgspec.ValidationError:
            continue

        # Process the CVE data. This will handle processing the CPE match string into a
        # list of CPE objects and then insert the CVE data into elastic search.
        handle_cve_data(cve_json_obj)

    return True


def nvd_api_cooldown(seconds: float = NVD_API_COOLDOWN_SECONDS) -> None:
    """
    Sleep for 6 seconds to avoid hitting the NVD API rate limit.

    :param seconds: The number of seconds to sleep for. Defaults to 6 seconds.
    """
    logger(f"Waiting {seconds} seconds before another NVD API request.", LogLevel.DEBUG)
    time.sleep(seconds)
    logger("Done waiting! Preparing for next NVD API request.", LogLevel.DEBUG)


def cve_exists_query(cve_id: str) -> bool:
    """
    Check if the CVE exists in elastic search.

    :param cve_id: CVE ID to check.
    :return: True if the CVE exists in elastic search.
    """
    return elastic_service.cve_exists_query(cve_id)


def create_audit_log_entry(nvd_audit_log: NvdAuditLog) -> None:
    """
    Create an audit log entry in the audit index.

    :param nvd_audit_log: The audit log entry to create.
    """
    # Load the settings for NVD, loaded from the 'config.json' file.
    config_file_settings: ConfigJsonFileSettings = settings.get_config_file_settings()
    nvd_audit_index: str = config_file_settings.NVD_AUDIT_INDEX

    obj: Mapping[str, Any] = asdict(nvd_audit_log)

    # Create the document to insert into the audit index.
    elastic_service.elasticsearch_insert_document(index=nvd_audit_index, document=obj)


def process_cpe_criteria(cpe_criteria: str) -> CpeCriteria | None:
    r"""
    Process a single CPE criteria match string and create a CPE criteria object.

    :param cpe_criteria: The CPE match string to process.
    :return: The CPE criteria object if processing the CPE match string was successful,
       otherwise None.
    :rtype: CpeCriteria | None - Returns a CpeCriteria object if successful.

    .. note::
        The CPE criteria match string is a "WFN bound to a formatted string" or
        "formatted string binding". Here is an example of a CPE criteria match string-
        cpe:2.3:o:microsoft:windows_vista:6.0:sp1:-:-:home_premium:-:x64:-

    .. note::
        The CPE criteria match string is a colon ':' separated string with 13
        parts. The first part is the string "cpe". The remaining 12 parts are the actual
        CPE criteria parts. The second part is the CPE version (2.3 in this case). See
        more on CPE 2.3 specification here: https://cpe.mitre.org/specification/

    .. warning::
        The CPE criteria match string can contain the colon ':' character which can be
        confusing with the colon ':' used to separate the parts of the CPE. We are
        replacing the '\:' with '-' in the CPE formatted string to avoid issues.
    """
    # Split the CPE criteria string into parts and verify length is exactly 13 parts.
    criteria_parts: list[str] = cpe_criteria.split(":")

    # Normal CPE match string, create the CPE criteria object.
    if len(criteria_parts) == CPE_CRITERIA_PARTS:
        # NOTE - we are slicing off the first element as it's just the string "cpe" and
        #  our CpeCriteria class requires exactly 12 parts.
        return CpeCriteria(*criteria_parts[1:])

    # NOTE - this is not the normal CPE match string case, since the split() didn't
    #  result in 13 parts. So we will try to replace the "\:" with "-" and try again.
    criteria_string = cpe_criteria.replace(r"\:", "-")
    criteria_parts = criteria_string.split(":")

    # Failed to parse this CPE match string into the desired 13 parts.
    if len(criteria_parts) != CPE_CRITERIA_PARTS:
        logger(f"Failed to process CPE criteria: {cpe_criteria}", LogLevel.ERROR)
        return None

    return CpeCriteria(*criteria_parts[1:])


def process_cve_cpe_match_data(cve: Cve) -> bool:
    """
    Process a single CVE CPE match data, and extract the individual CPE match fields.

    :param cve: The CVE object to process.
    :return: True if the CVE was processed successfully, False otherwise.

    .. note::
        TODO - Do we need a log message (warning, info or debug) when CVE has no
         configurations? e.g.
          `logger(f"No configurations found for CVE [{cve.id}]", LogLevel.DEBUG)`

    """
    # Get the list of CVE configurations if they exist (otherwise None).
    cve_configurations: List[Configuration] | None = cve.configurations

    if not cve_configurations:
        return False

    # Process the CVE configurations.
    for config in cve_configurations:
        # Check each node in the configuration.
        for node in config.nodes:
            # Check each CPE match string in the nodes.
            for cpe in node.cpeMatch:
                # Process the CPE match string, converting into the CPE criteria object.
                cpe.criteria_object = process_cpe_criteria(cpe.criteria)

    # Processed all the CPE match strings for the given CVE successfully.
    return True


def generate_cve_docs(
    index: str,
    cve_data: CveJsonResponse,
    encoder: msgspec.json.Encoder,
) -> Generator[dict[str, str | bytes], None, None]:
    """
    A generator function to create CPE objects to bulk insert into the Elastic DB.

    :param index: The elasticsearch index name which we want to insert the data into.
    :param cve_data: CVE data which we need to process and then add/update in the DB.
    :param encoder: The msgspec JSON encoder to use for the generator function.
    :yields: A generator function to use with the elasticsearch helper bulk() function.

    .. note::
        This method could be later used to be a generic bulk insert method for any
        type of elastic DB insert. For now, it's coupled to the CVE loading..
    """
    for vul in cve_data.vulnerabilities or []:
        cve: Cve = vul.cve
        # NOTE - this line is parsing the CPE match string into individual fields.
        process_cve_cpe_match_data(cve)
        doc: dict[str, str | bytes] = {
            "_index": index,
            "_id": cve.id,
            "_source": encoder.encode(cve),
        }
        yield doc


def handle_cve_data(cve_data: CveJsonResponse) -> None:
    """
    Handle the CVE data.

    :param cve_data: The CVE data which we need to add/update in the DB.
    """
    # Get config file settings
    config_file_settings: ConfigJsonFileSettings = settings.get_config_file_settings()

    # Get elasticsearch indices or create them if they don't exist.
    elastic_client: Elasticsearch = elastic_service.get_elastic_client()
    elastic_service.create_grideye_index(elastic_client)

    # Create a single JSON encoder to use for the generator function.
    encoder = msgspec.json.Encoder()

    # NOTE - this is an included function from the elasticsearch helper library.
    # Use bulk() helper to insert/update the documents in bulk.
    bulk(
        elastic_client,
        generate_cve_docs(config_file_settings.NVD_CVE_INDEX, cve_data, encoder),
    )

    # TODO - insert log into the Audit index.
