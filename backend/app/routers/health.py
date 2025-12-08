"""Health and root endpoints."""

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/")
async def root() -> dict:
    """
    Root endpoint with API information.
    
    Provides a friendly welcome message and guide for users
    who access the API directly.
    """
    return {
        "name": "GobData CL API",
        "description": "API publica para explorar indicadores economicos y sociales de los gobiernos de Chile",
        "version": "0.1.0",
        "message": "Bienvenido a GobData CL. Esta API permite consultar datos oficiales sobre los gobiernos de Chile desde 1990.",
        "endpoints": {
            "documentacion": "/docs - Documentacion interactiva de la API",
            "gobiernos": "/governments - Lista de todos los gobiernos",
            "indicadores": "/indicators - Lista de indicadores disponibles",
            "categorias": "/categories - Categorias de indicadores",
            "salud": "/health - Estado del servicio",
        },
        "examples": {
            "ver_gobiernos": "/governments",
            "ver_detalle_gobierno": "/governments/8",
            "ver_resumen_gobierno": "/governments/8/summary",
            "ver_indicadores_economia": "/indicators?category=economia",
            "ver_timeline_pib": "/indicators/PIB_CRECIMIENTO/timeline",
            "comparar_gobiernos": "/indicators/DESEMPLEO/compare?government_ids=4,5,6,7,8",
        },
        "data_sources": "Banco Central, INE, CASEN, DIPRES y otras fuentes oficiales",
        "disclaimer": "Esta plataforma presenta datos oficiales sin emitir juicios sobre los gobiernos.",
    }


@router.get("/health")
async def health_check() -> dict:
    """Return basic health status."""
    return {"status": "ok"}
