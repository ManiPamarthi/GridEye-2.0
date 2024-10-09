"""Service module for the topology management."""
from typing import Any, Dict

from elasticsearch import Elasticsearch

from grideye.services.elasticsearch.service import (
    create_index,
    elasticsearch_get_document,
    elasticsearch_insert_document,
    get_elastic_client,
    get_elastic_db_connection_status,
)
from settings import ConfigJsonFileSettings, settings


def check_and_insert_topology_json(topology_json: Dict[str, str]) -> Dict[str, str]:
    """
    Checks if the given topology info (JSON) exists in the elasticsearch index.

    If topology info exists, it performs an update().
    If topology info does not exist, it performs an index().

    :param topology_json: The topology info (JSON) to check and insert. The JSON will
        contain the EdgeServerIdentity (IP Address) and the TopologyJSON.
    :return: A JSON response showing the status of the topology info upload.
    """
    # Invalid argument (topology_json is None).
    if topology_json is None:
        return _upload_failure_response("No topology JSON was received. [json: None]")

    # Get the elasticsearch client.
    elastic_client: Elasticsearch = get_elastic_client()
    # Check the status of elasticsearch db.
    if not get_elastic_db_connection_status(elastic_client):
        return {
            "status": "Failure",
            "reason": "Failed to connect to Elasticsearch DB.",
        }
    # Get topology index name
    config_file_settings: ConfigJsonFileSettings = settings.get_config_file_settings()
    topo_index: str = config_file_settings.TOPOLOGY_INDEX

    # Create the topology index if it doesn't exist.
    create_index(elastic_client, topo_index)

    # Get the edge server ID (IP address) from the topology JSON to query the index.
    document_id: str | None = topology_json.get("edge_server")
    if document_id is None:
        return _upload_failure_response(
            "Invalid topology. Unable to get edge server ID. [document_id: None]",
        )

    # Get the topology document from the index if it exists.
    document: dict[str, Any] | None = elasticsearch_get_document(
        index=topo_index,
        document_id=document_id,
    )

    # Topology does not exist for the given edge server.
    if document is None:
        elasticsearch_insert_document(
            index=topo_index,
            document=topology_json,
            document_id=document_id,
        )
    else:
        # Topology exists for the given edge server, update the document.
        elastic_client.update(index=topo_index, id=document_id, doc=topology_json)

    # Create a basic success response JSON for the API.
    return {"status": "Success"}


def _upload_failure_response(reason: str) -> Dict[str, str]:
    """Just returns a simple JSON response for a topology upload failure.

    :param reason: The reason for the failure which will be returned in the JSON.
    :return: A JSON response showing the failure status of the topology info upload.
    """
    return {"status": "Failure", "reason": reason}
