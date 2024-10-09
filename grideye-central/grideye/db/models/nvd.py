"""Basic model (msgspec) for our python objects. Uses msgspec and pydantic."""
from datetime import datetime
from enum import StrEnum
from typing import Optional

import msgspec


class CpeCriteria(msgspec.Struct):
    """Object representing the CPE criteria string."""

    cpeSpecVersion: str
    part: str
    vendor: str
    product: str
    version: str
    update: str
    edition: str
    language: str
    swEdition: str
    targetSw: str
    targetHw: str
    other: str


class CpeMatchItem(msgspec.Struct):
    """
    JSON node representing a CPE match item.

    Parent node:  ConfigurationNode
    """

    vulnerable: bool
    criteria: str
    matchCriteriaId: str
    versionEndIncluding: Optional[str] | None = None
    criteria_object: CpeCriteria | None = None


class ConfigurationNode(msgspec.Struct):
    """JSON node representing a configuration node.

    Parent node:  Configuration
    """

    operator: str
    negate: bool
    cpeMatch: list[CpeMatchItem]


class Description(msgspec.Struct):
    """JSON node representing a CVE description.

    Parent node:  Cve
    """

    lang: str
    # WARNING - this 'value' field name can be confusing with python dict key/value.
    value: str


class Weakness(msgspec.Struct):
    """
    JSON node representing a CVE weakness.

    Parent node:  Cve
    """

    source: str
    type: str
    description: list[Description]


class Reference(msgspec.Struct):
    """JSON node representing a CVE reference.

    Parent node:  Cve
    """

    url: str
    source: str


class Configuration(msgspec.Struct):
    """JSON node representing a configuration.

    Parent node:  Cve
    """

    nodes: list[ConfigurationNode]


class Cve(msgspec.Struct, dict=True):
    """JSON node representing a CVE.

    Parent node:  Vulnerability
    """

    id: str
    sourceIdentifier: str
    published: str
    lastModified: str
    vulnStatus: str
    descriptions: list[Description]
    # NOTE - there is a field 'metrics' which we are excluding for now.
    # If we need 'metrics' in the future, we can add it.
    weaknesses: list[Weakness] | None = None
    configurations: list[Configuration] | None = None
    references: list[Reference] | None = None


class Vulnerability(msgspec.Struct):
    """JSON node representing a CVE vulnerability.

    Parent node:  CveJsonResponse
    """

    cve: Cve


class CveJsonResponse(msgspec.Struct, dict=True):
    """A structure representing the JSON response from the NVD CVE API."""

    resultsPerPage: int
    startIndex: int
    totalResults: int
    format: str
    version: str
    timestamp: str
    vulnerabilities: list[Vulnerability] | None = None


class NvdUpdateMode(StrEnum):
    """Enumeration of the different modes of updating the NVD data."""

    AUTO = "AUTO"
    CLI = "CLI"
    WEB = "WEB"


class NvdAuditLog(msgspec.Struct, dict=True):
    """A record of each update to the CVE data will be stored in this structure."""

    # NOTE - this should probably be a type of 'datetime' instead of string.
    time_of_update: datetime
    updated_by: str
    mode_of_update: str
    nvd_filename: str | None = None
