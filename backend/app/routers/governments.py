"""Government API endpoints."""

import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.government import Government
from app.models.indicator import Indicator
from app.models.indicator_value import IndicatorValue
from app.schemas.government import GovernmentDetail, GovernmentList

router = APIRouter(prefix="/governments", tags=["governments"])


@router.get("", response_model=list[GovernmentList])
async def list_governments(db: Session = Depends(get_db)) -> list[GovernmentList]:
    """
    List all governments ordered by start date descending.
    
    Returns basic info for listing/cards.
    """
    governments = (
        db.query(Government)
        .order_by(Government.start_date.desc())
        .all()
    )
    return governments


@router.get("/{government_id}", response_model=GovernmentDetail)
async def get_government(
    government_id: int,
    db: Session = Depends(get_db),
) -> GovernmentDetail:
    """
    Get detailed information about a specific government.
    
    Includes political party history and documented controversies.
    """
    government = db.query(Government).filter(Government.id == government_id).first()
    
    if not government:
        raise HTTPException(status_code=404, detail="Gobierno no encontrado")
    
    return government


@router.get("/{government_id}/summary")
async def get_government_summary(
    government_id: int,
    db: Session = Depends(get_db),
) -> dict:
    """
    Get a comprehensive summary of a government period.
    
    Includes key indicators, political context, and documented events.
    Designed to give users a complete overview without technical jargon.
    """
    government = db.query(Government).filter(Government.id == government_id).first()
    
    if not government:
        raise HTTPException(status_code=404, detail="Gobierno no encontrado")
    
    # Get all indicator values for this government
    values = (
        db.query(IndicatorValue, Indicator)
        .join(Indicator)
        .filter(IndicatorValue.government_id == government_id)
        .order_by(Indicator.category, IndicatorValue.date)
        .all()
    )
    
    # Group by category
    indicators_by_category = {}
    for value, indicator in values:
        cat = indicator.category
        if cat not in indicators_by_category:
            indicators_by_category[cat] = {}
        
        if indicator.code not in indicators_by_category[cat]:
            indicators_by_category[cat][indicator.code] = {
                "name": indicator.name,
                "unit": indicator.unit,
                "values": [],
            }
        
        indicators_by_category[cat][indicator.code]["values"].append({
            "year": value.date.year,
            "value": value.value,
            "status": value.status,
        })
    
    # Calculate key metrics for easy understanding
    key_metrics = []
    
    # Find GDP growth if available
    if "economia" in indicators_by_category and "PIB_CRECIMIENTO" in indicators_by_category["economia"]:
        pib_values = [v["value"] for v in indicators_by_category["economia"]["PIB_CRECIMIENTO"]["values"] if v["value"] is not None]
        if pib_values:
            avg_growth = round(sum(pib_values) / len(pib_values), 1)
            key_metrics.append({
                "label": "Crecimiento economico promedio",
                "value": f"{avg_growth}%",
                "explanation": "Variacion promedio anual del PIB durante este gobierno",
            })
    
    # Find unemployment if available
    if "empleo" in indicators_by_category and "DESEMPLEO" in indicators_by_category["empleo"]:
        desemp_values = [v["value"] for v in indicators_by_category["empleo"]["DESEMPLEO"]["values"] if v["value"] is not None]
        if desemp_values:
            avg_unemployment = round(sum(desemp_values) / len(desemp_values), 1)
            key_metrics.append({
                "label": "Desempleo promedio",
                "value": f"{avg_unemployment}%",
                "explanation": "Porcentaje promedio de personas sin empleo",
            })
    
    # Find inflation if available
    if "economia" in indicators_by_category and "INFLACION_ANUAL" in indicators_by_category["economia"]:
        infl_values = [v["value"] for v in indicators_by_category["economia"]["INFLACION_ANUAL"]["values"] if v["value"] is not None]
        if infl_values:
            avg_inflation = round(sum(infl_values) / len(infl_values), 1)
            key_metrics.append({
                "label": "Inflacion promedio",
                "value": f"{avg_inflation}%",
                "explanation": "Aumento promedio anual de los precios",
            })
    
    # Find poverty if available
    if "social" in indicators_by_category and "POBREZA_INGRESOS" in indicators_by_category["social"]:
        pob_values = indicators_by_category["social"]["POBREZA_INGRESOS"]["values"]
        if len(pob_values) >= 1:
            last_poverty = pob_values[-1]["value"]
            if last_poverty is not None:
                key_metrics.append({
                    "label": "Pobreza al final del periodo",
                    "value": f"{last_poverty}%",
                    "explanation": "Porcentaje de la poblacion bajo la linea de pobreza",
                })
    
    # Parse political party history
    political_history = []
    if government.political_party_history:
        try:
            political_history = json.loads(government.political_party_history)
        except json.JSONDecodeError:
            political_history = []
    
    # Parse controversies
    controversies = []
    if government.documented_controversies:
        try:
            controversies = json.loads(government.documented_controversies)
        except json.JSONDecodeError:
            controversies = []
    
    # Calculate duration
    duration_years = government.end_date.year - government.start_date.year
    
    return {
        "government": {
            "id": government.id,
            "name": government.name,
            "slug": government.slug,
            "period": f"{government.start_date.year} - {government.end_date.year}",
            "duration_years": duration_years,
            "coalition": government.coalition,
            "short_bio": government.short_bio,
            "image_url": government.image_url,
        },
        "introduction": f"{government.name} goberno Chile entre {government.start_date.year} y {government.end_date.year} "
                        f"({duration_years} anos) bajo la coalicion {government.coalition}. "
                        f"{government.short_bio}",
        "key_metrics": key_metrics,
        "political_history": political_history,
        "documented_events": controversies,
        "indicators_by_category": indicators_by_category,
        "data_disclaimer": "Todos los datos provienen de fuentes oficiales. Esta plataforma no emite juicios "
                          "sobre los gobiernos, solo presenta informacion verificable.",
    }


@router.get("/{government_id}/indicators/{indicator_code}")
async def get_government_indicator(
    government_id: int,
    indicator_code: str,
    db: Session = Depends(get_db),
) -> dict:
    """
    Get specific indicator values for a government period.
    
    Returns values with context and explanation.
    """
    government = db.query(Government).filter(Government.id == government_id).first()
    if not government:
        raise HTTPException(status_code=404, detail="Gobierno no encontrado")
    
    indicator = db.query(Indicator).filter(Indicator.code == indicator_code).first()
    if not indicator:
        raise HTTPException(status_code=404, detail="Indicador no encontrado")
    
    values = (
        db.query(IndicatorValue)
        .filter(
            IndicatorValue.government_id == government_id,
            IndicatorValue.indicator_id == indicator.id,
        )
        .order_by(IndicatorValue.date)
        .all()
    )
    
    numeric_values = [v.value for v in values if v.value is not None]
    
    return {
        "government": {
            "name": government.name,
            "period": f"{government.start_date.year}-{government.end_date.year}",
        },
        "indicator": {
            "code": indicator.code,
            "name": indicator.name,
            "description": indicator.description,
            "unit": indicator.unit,
            "source_name": indicator.source_name,
            "source_url": indicator.source_url,
        },
        "values": [
            {
                "date": v.date.isoformat(),
                "year": v.date.year,
                "value": v.value,
                "status": v.status,
            }
            for v in values
        ],
        "summary": {
            "data_points": len(numeric_values),
            "average": round(sum(numeric_values) / len(numeric_values), 2) if numeric_values else None,
            "min": min(numeric_values) if numeric_values else None,
            "max": max(numeric_values) if numeric_values else None,
            "start_value": numeric_values[0] if numeric_values else None,
            "end_value": numeric_values[-1] if numeric_values else None,
            "change": round(numeric_values[-1] - numeric_values[0], 2) if len(numeric_values) >= 2 else None,
        },
        "explanation": f"Durante el gobierno de {government.name}, "
                       f"el indicador '{indicator.name}' tuvo un valor promedio de "
                       f"{round(sum(numeric_values) / len(numeric_values), 2) if numeric_values else 'N/A'} {indicator.unit}."
                       if numeric_values else f"No hay datos disponibles para este indicador durante este periodo.",
    }
