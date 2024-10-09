"""Views for the Topology service."""
import json

from fastapi import APIRouter, Request, Response

from grideye.services.topology.service import check_and_insert_topology_json

router = APIRouter()


@router.post("/upload")
async def upload_topology_info(request: Request) -> Response:
    """
    API endpoint to upload topology data. The data will be inbound from an edge device.

    :param request: The request object which contains the JSON payload.
    :return: Response - A JSON response showing the topology upload status.
    """
    # Get the topology JSON from the request and insert it into the elasticsearch index.
    topology_json = await request.json()
    return_info: dict[str, str] = check_and_insert_topology_json(topology_json)
    # Return JSON response with the status of the topology upload (success / failure).
    return Response(json.dumps(return_info), media_type="application/json")
