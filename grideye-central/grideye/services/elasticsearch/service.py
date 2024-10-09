"""Service for interacting with the Elastic DB."""
from typing import Any, Dict, List, Mapping

from elastic_transport import ConnectionError as ElasticConnectionError
from elastic_transport import ConnectionTimeout as ElasticConnectionTimeout
from elastic_transport import HeadApiResponse, ObjectApiResponse
from elasticsearch import AuthenticationException, Elasticsearch, NotFoundError

from grideye.settings import ConfigJsonFileSettings, LogLevel, logger, settings

# CONSTANTS defined here.
# elasticsearch NotFoundError exception message.
INDEX_NOT_FOUND_EXCEPTION: str = "index_not_found_exception"


def get_elastic_client() -> Elasticsearch:
    """
    Connect to the Elastic DB and return the connection handle.

    :return: The Elastic DB connection handle if connection successful, else None.
    :raises Exception: If the connection to the Elastic DB fails.

    .. note::
        Make sure to include the CA certificate path with the 'ca_certs' argument which
        can be configured in the config.json.

        TODO - Remove the verify_certs=False, was needing this for the dev environment.
    """
    try:
        config_file: ConfigJsonFileSettings = settings.get_config_file_settings()
        db_url = config_file.GRIDEYE_DATABASE_URL
        db_username = config_file.GRIDEYE_DATABASE_USERNAME
        db_password = config_file.GRIDEYE_DATABASE_PASSWORD
        db_cert_path = config_file.GRIDEYE_DATABASE_CA_CERT_PATH
        return Elasticsearch(
            hosts=db_url,
            basic_auth=(db_username, db_password),
            ca_certs=db_cert_path,
            verify_certs=False,
        )
    except Exception as exc:
        logger(f"Failed to get elasticsearch client [exception: {exc}]", LogLevel.ERROR)
        raise exc


def get_elastic_db_connection_status(db_handle: Elasticsearch) -> bool:
    """
    Get the status of the Elastic DB connection using ping().

    :param db_handle: The Elastic DB connection.
    :return: True if connected, False if not.
    """
    try:
        ping_status: bool = db_handle.ping()
        logger(f"elasticsearch ping_status: {ping_status}", LogLevel.DEBUG)
        # Checking the health report will confirm if the DB connection works.
        health_report_response = db_handle.health_report()
        cluster_name = health_report_response.get("cluster_name")
        health_status = health_report_response.get("status")
        logger(
            f"elasticsearch health_report_response: [cluster name: {cluster_name}] "
            f"[health status: {health_status}]",
            LogLevel.DEBUG,
        )
        return True
    except (ElasticConnectionError, ElasticConnectionTimeout) as exc:
        # Elasticsearch db Connection timeout
        logger(f"Failed to connect to elasticsearch. [error: {exc}]", LogLevel.ERROR)
    except AuthenticationException as exc:
        # Authentication issue with credentials or SSL certs.
        logger(
            "Failed to authenticate with elasticsearch db. Check credentials. "
            f"[error: {exc}]",
            LogLevel.ERROR,
        )
    except Exception as exc:
        logger(f"Failed to connect with DB [exception: {exc}]", LogLevel.ERROR)
    return False


def is_elastic_db_online() -> bool:
    """
    Check if the Elastic DB is online.

    :return: True if the Elastic DB is online, False otherwise.
    """
    db_handle: Elasticsearch = get_elastic_client()
    return get_elastic_db_connection_status(db_handle)


def elasticsearch_insert_document(
    index: str,
    document: Mapping[str, Any],
    document_id: str | None = None,
) -> bool:
    """
    Insert a document into the given elasticsearch index.

    :param index: The index to insert the document into.
    :param document: The JSON document to insert.
    :param document_id: The document id to use for the document insert. If not provided,
         elasticsearch will generate a random id.
    :return: True if the document was inserted successfully, False otherwise.

    .. note::
        We are checking the insert status by check the body.get('result') field in the
        response which should be created if the insert was successful.

        TODO - Add more Exception types like JSON decode errors or other elasticsearch
        exceptions. The current `Exception` is way too generic for this function.
    """
    elastic_client: Elasticsearch = get_elastic_client()
    try:
        response: ObjectApiResponse[Any] = elastic_client.index(
            index=index,
            id=document_id,
            document=document,
        )
        # Log a warning if status code is not created.
        insert_result: str = response.body.get("result")
        if insert_result != "created":
            logger(
                "elasticsearch insert status was not 'created'. "
                f"[response.body.result: {insert_result}]",
                LogLevel.WARNING,
            )
        return True
    except Exception as exc:
        logger(
            f"Failed to insert document into elasticsearch index. [exception: {exc}]",
            LogLevel.ERROR,
        )
        return False


def create_grideye_index(elastic_client: Elasticsearch) -> bool:
    """
    Create the indices for the Grideye sensor data.

    :param elastic_client: The Elasticsearch client.
    :return: True if successful, False is there was an error.
    """
    # Get the index names from the config file.
    config_file_settings: ConfigJsonFileSettings = settings.get_config_file_settings()
    index_list: List[str] = [
        config_file_settings.NVD_CVE_INDEX,
        config_file_settings.NVD_AUDIT_INDEX,
        config_file_settings.TOPOLOGY_INDEX,
    ]
    # Check if the index exists, if not, create the index
    for index_name in index_list:
        create_index(elastic_client, index_name)
    return True


def create_index(elastic_client: Elasticsearch, index_name: str) -> None:
    """
    This method will check if the index exists, if not, it will create the index.

    :param elastic_client: The Elasticsearch client.
    :param index_name: The index which we want to create.
    """
    index_exists: bool = bool(elastic_client.indices.exists(index=index_name))
    if index_exists:
        logger(f"elasticsearch index already exists: {index_name}", LogLevel.DEBUG)
    else:
        logger(f"Creating elasticsearch index: {index_name}", LogLevel.DEBUG)
        elastic_client.indices.create(index=index_name)


def cve_exists_query(cve_id: str) -> bool:
    """
    Basic query to check if CVE is in our elasticsearch index.

    :param cve_id: The CVE ID to query with.
    :return: True if the CVE exists in the index, False otherwise.
    :rtype: bool

    .. note::  We are not returning the query result here, instead we are explicitly
        checking the response string and returning True or False.
    """
    # Load the settings for NVD, loaded from the 'config.json' file.
    config_file_settings: ConfigJsonFileSettings = settings.get_config_file_settings()
    # Get the elasticsearch client
    elastic_client: Elasticsearch = get_elastic_client()

    # Perform elasticsearch query for a single CVE in our index.
    query_response: HeadApiResponse = elastic_client.exists(
        index=config_file_settings.NVD_CVE_INDEX,
        id=cve_id,
    )

    # Convert response to lowercase string and perform explicit check on the string.
    response_str: str = str(query_response).lower()
    if response_str == "true":
        return True
    if response_str == "false":
        return False
    logger(
        f"Unexpected response from elasticsearch query exists: {response_str}",
        LogLevel.WARNING,
    )
    return False


def elasticsearch_get_document(index: str, document_id: str) -> Dict[str, Any] | None:
    """
    Get a document from the elasticsearch index.

    :param index: The index to query.
    :param document_id: The document ID to query.
    :return: The document if successful, otherwise None.
    :rtype: Dict[str, Any] | None - The document as a dict if successful, else None.
    :raises Exception: If there was an error querying elasticsearch.
    """
    # Get the elasticsearch client
    elastic_client: Elasticsearch = get_elastic_client()

    # Perform elasticsearch query for a single CVE in our index.
    try:
        query_response: ObjectApiResponse[Any] = elastic_client.get(
            index=index,
            id=document_id,
        )
    except NotFoundError as exc:
        if exc.body.get("_index") == index:
            logger(
                f"elasticsearch document not found! [index: {index}] "
                f"[document id: {document_id}]",
                LogLevel.DEBUG,
            )
        else:
            logger(
                f"elasticsearch index not found! [index: {index}] "
                f"[message: {exc.message}]",
                LogLevel.WARNING,
            )
        return None
    except Exception as exc:
        logger("Failed to query elasticsearch with get()!", LogLevel.ERROR)
        raise exc

    # Check if the query was successful.
    if query_response.body.get("found", False):
        return query_response.body.get("_source")
    return None
