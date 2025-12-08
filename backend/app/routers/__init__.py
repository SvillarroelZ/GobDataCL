"""API routers."""

from app.routers.health import router as health_router
from app.routers.governments import router as governments_router
from app.routers.indicators import router as indicators_router

__all__ = ["health_router", "governments_router", "indicators_router"]
