"""FastAPI views for the NVD CVE module."""
import os
from http import HTTPStatus

import msgspec
from fastapi import APIRouter, File, Response, UploadFile
from starlette.responses import HTMLResponse

from grideye.db.models.nvd import CveJsonResponse, NvdUpdateMode
from grideye.services.nvd.service import (
    convert_cve_json_to_struct,
    create_nvd_audit_log,
    cve_exists_query,
    get_total_cve_record_count,
    handle_cve_data,
    task_get_cves,
)
from grideye.settings import TEMP_DIR, logger

router = APIRouter()


@router.get("/")
def trigger_update_cve_task_page() -> HTMLResponse:
    """
    Get the CVEs from the NIST NVD service.py and return them as JSON.

    :return: Response with the same JSON for now.

    .. note::
        TODO - This is a temporary endpoint to trigger the task.
        TODO - This endpoint will be replaced with a background task/cron job.
    """
    content: str = """
    <body>
    <h2>Trigger CVE Update Task</h2>
      <form action="/api/nvd/task-simulate" method="POST">
         <h5>Enter Password</h5>
         <p><input type='password' name='pwd'/></p>
         <p><input type='submit' value='Go'/></p>
      </form>
    </body>
    """
    return HTMLResponse(content=content)


@router.post("/task-simulate")
def trigger_update_cve_task() -> Response:
    """
    A POST endpoint to trigger the update CVEs task.

    :return: The status of the task, true if successful, false if not.
    """
    # Create audit log entry.
    create_nvd_audit_log(NvdUpdateMode.AUTO)

    is_processed: bool = task_get_cves()

    return Response(
        content="Task complete: {0}".format(is_processed),
        media_type="text/plain",
    )


@router.get("/cve/count")
def get_nvd_api_cve_count() -> Response:
    """
    Get the total number of CVE records from the NIST NVD API.

    :return: Response with the count of total number of CVE records.
    """
    total_cve_record_count: int = get_total_cve_record_count()
    return Response(content=str(total_cve_record_count), media_type="text/plain")


@router.post("/upload")
def create_file(json_file: UploadFile = File(...)) -> Response:
    """
    A POST endpoint to upload a JSON file of NIST NVD CVEs.

    :param json_file: UploadFile - the JSON file to containing CVEs to upload.
    :return: The filename of the uploaded file.
    """
    # Create audit log entry with the filename of the uploaded JSON file.
    create_nvd_audit_log(NvdUpdateMode.WEB, json_file.filename)

    logger(f"{json_file.filename} - {json_file.content_type}")

    # Join filename and temp directory path.
    full_path: str = os.path.join(TEMP_DIR, "uploaded.json")

    # Check if the uploaded file is a JSON file.
    if json_file.content_type != "application/json":
        return Response(
            content="Uploaded file must be a JSON file.",
            media_type="text/plain",
            status_code=HTTPStatus.BAD_REQUEST,
        )

    # Store the uploaded file in a temp directory.
    with open(full_path, "wb") as openfile:
        uploaded_content: bytes = json_file.file.read()
        openfile.write(uploaded_content)

    try:
        # Convert the JSON string to a struct object using msgspec.
        cve_json_obj: CveJsonResponse = convert_cve_json_to_struct(uploaded_content)
    except msgspec.ValidationError:
        return Response(
            content="Failed to process uploaded JSON file.",
            media_type="text/plain",
            status_code=HTTPStatus.BAD_REQUEST,
        )

    # Process the CVE data. This will handle processing the CPE match string into a
    # list of CPE objects and then insert the CVE data into elastic search.
    handle_cve_data(cve_json_obj)

    return Response(content="Uploaded!", media_type="text/plain")


@router.get("/upload")
def upload_cve_json() -> HTMLResponse:
    """
    A basic webpage to upload a JSON file of NIST NVD CVEs.

    :return: HTMLResponse - Basic HTML webpage to upload the JSON file.
    """
    content: str = """
    <body>
    <form action="/api/nvd/upload" enctype="multipart/form-data" method="post">
    <input name="json_file" type="file">
    <input type="submit">
    </form>
    </body>
    """
    return HTMLResponse(content=content)


@router.get("/cve/exists")
def cve_query(cve_id: str) -> Response:
    """
    Perform a basic query to check if our elasticsearch index contains a specific CVE.

    :param cve_id: str - The CVE ID to query in our elasticsearch index.
    :return: Response - A text response showing if the CVE exists or not (true / false)
    """
    cve_exists_in_index: bool = cve_exists_query(cve_id=cve_id)
    return Response(content=str(cve_exists_in_index), media_type="text/plain")
