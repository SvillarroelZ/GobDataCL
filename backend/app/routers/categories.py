"""Category API endpoints."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import distinct

from app.core.database import get_db
from app.models.indicator import Indicator

router = APIRouter(prefix="/categories", tags=["categories"])

# Category metadata with Spanish labels for frontend display
CATEGORY_METADATA = {
    "economia": {
        "name": "Economia",
        "description": "Indicadores macroeconomicos: PIB, inflacion, tipo de cambio",
        "icon": "trending-up",
    },
    "empleo": {
        "name": "Empleo",
        "description": "Mercado laboral: desempleo, salario minimo, informalidad",
        "icon": "briefcase",
    },
    "social": {
        "name": "Social",
        "description": "Bienestar social: pobreza, desigualdad, Gini",
        "icon": "users",
    },
    "fiscal": {
        "name": "Fiscal",
        "description": "Finanzas publicas: deuda, gasto, balance fiscal",
        "icon": "landmark",
    },
    "salud": {
        "name": "Salud",
        "description": "Indicadores sanitarios: esperanza de vida, mortalidad",
        "icon": "heart-pulse",
    },
    "educacion": {
        "name": "Educacion",
        "description": "Sistema educativo: gasto, resultados PISA",
        "icon": "graduation-cap",
    },
    "seguridad": {
        "name": "Seguridad",
        "description": "Seguridad ciudadana: homicidios, victimizacion",
        "icon": "shield",
    },
}


@router.get("")
async def list_categories(
    db: Session = Depends(get_db),
) -> list[dict]:
    """
    List all available indicator categories.
    
    Returns categories that have at least one indicator,
    with metadata for frontend display.
    """
    # Get distinct categories from database
    categories_in_db = (
        db.query(distinct(Indicator.category))
        .order_by(Indicator.category)
        .all()
    )
    
    result = []
    for (category_code,) in categories_in_db:
        if category_code in CATEGORY_METADATA:
            meta = CATEGORY_METADATA[category_code]
            # Count indicators in this category
            indicator_count = (
                db.query(Indicator)
                .filter(Indicator.category == category_code)
                .count()
            )
            result.append({
                "code": category_code,
                "name": meta["name"],
                "description": meta["description"],
                "icon": meta["icon"],
                "indicator_count": indicator_count,
            })
        else:
            # Category exists in DB but not in metadata
            indicator_count = (
                db.query(Indicator)
                .filter(Indicator.category == category_code)
                .count()
            )
            result.append({
                "code": category_code,
                "name": category_code.capitalize(),
                "description": "",
                "icon": "folder",
                "indicator_count": indicator_count,
            })
    
    return result


@router.get("/{code}")
async def get_category(
    code: str,
    db: Session = Depends(get_db),
) -> dict:
    """
    Get category details with list of indicators.
    """
    # Verify category exists
    exists = (
        db.query(Indicator)
        .filter(Indicator.category == code)
        .first()
    )
    
    if not exists:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Categoria no encontrada")
    
    # Get metadata
    meta = CATEGORY_METADATA.get(code, {
        "name": code.capitalize(),
        "description": "",
        "icon": "folder",
    })
    
    # Get indicators in this category
    indicators = (
        db.query(Indicator)
        .filter(Indicator.category == code)
        .order_by(Indicator.name)
        .all()
    )
    
    return {
        "code": code,
        "name": meta["name"],
        "description": meta["description"],
        "icon": meta["icon"],
        "indicators": [
            {
                "code": ind.code,
                "name": ind.name,
                "unit": ind.unit,
                "source_name": ind.source_name,
            }
            for ind in indicators
        ],
    }
