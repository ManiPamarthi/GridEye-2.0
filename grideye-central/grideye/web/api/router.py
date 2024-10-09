from fastapi.routing import APIRouter

from grideye.web.api import echo, monitoring, nvd, topology

api_router = APIRouter()
api_router.include_router(monitoring.router)
api_router.include_router(echo.router, prefix="/echo", tags=["echo"])

api_router.include_router(nvd.router, prefix="/nvd", tags=["nvd"])
api_router.include_router(topology.router, prefix="/topology", tags=["topology"])
