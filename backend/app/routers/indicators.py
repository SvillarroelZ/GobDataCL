"""Indicator API endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.government import Government
from app.models.indicator import Indicator
from app.models.indicator_value import IndicatorValue
from app.schemas.indicator import IndicatorList
from app.schemas.indicator_value import IndicatorValueResponse

router = APIRouter(prefix="/indicators", tags=["indicators"])


@router.get("", response_model=list[IndicatorList])
async def list_indicators(
    category: str | None = Query(None, description="Filter by category"),
    db: Session = Depends(get_db),
) -> list[IndicatorList]:
    """
    List all available indicators.
    
    Optionally filter by category.
    """
    query = db.query(Indicator)
    
    if category:
        query = query.filter(Indicator.category == category)
    
    indicators = query.order_by(Indicator.name).all()
    return indicators


@router.get("/{code}", response_model=IndicatorList)
async def get_indicator(
    code: str,
    db: Session = Depends(get_db),
) -> IndicatorList:
    """
    Get indicator metadata by code.
    """
    indicator = db.query(Indicator).filter(Indicator.code == code).first()
    
    if not indicator:
        raise HTTPException(status_code=404, detail="Indicador no encontrado")
    
    return indicator


@router.get("/{code}/values", response_model=list[IndicatorValueResponse])
async def get_indicator_values(
    code: str,
    government_id: int | None = Query(None, description="Filter by government"),
    db: Session = Depends(get_db),
) -> list[IndicatorValueResponse]:
    """
    Get all values for a specific indicator.
    
    Optionally filter by government.
    """
    indicator = db.query(Indicator).filter(Indicator.code == code).first()
    
    if not indicator:
        raise HTTPException(status_code=404, detail="Indicador no encontrado")
    
    query = db.query(IndicatorValue).filter(IndicatorValue.indicator_id == indicator.id)
    
    if government_id:
        query = query.filter(IndicatorValue.government_id == government_id)
    
    values = query.order_by(IndicatorValue.date).all()
    return values


@router.get("/{code}/timeline")
async def get_indicator_timeline(
    code: str,
    db: Session = Depends(get_db),
) -> dict:
    """
    Get indicator data formatted for timeline visualization.
    
    Returns data ready for charting libraries (Recharts, Chart.js, etc.)
    with government context for each data point.
    
    This endpoint is designed for users who want to see how an indicator
    evolved across different government periods.
    """
    indicator = db.query(Indicator).filter(Indicator.code == code).first()
    
    if not indicator:
        raise HTTPException(status_code=404, detail="Indicador no encontrado")
    
    # Get all values with government info
    values = (
        db.query(IndicatorValue)
        .filter(IndicatorValue.indicator_id == indicator.id)
        .order_by(IndicatorValue.date)
        .all()
    )
    
    # Get all governments for context
    governments = db.query(Government).order_by(Government.start_date).all()
    gov_map = {g.id: g for g in governments}
    
    # Build timeline data points
    data_points = []
    for val in values:
        gov = gov_map.get(val.government_id)
        data_points.append({
            "date": val.date.isoformat(),
            "year": val.date.year,
            "value": val.value,
            "status": val.status,
            "government": {
                "id": gov.id if gov else None,
                "name": gov.name if gov else "Desconocido",
                "slug": gov.slug if gov else None,
                "coalition": gov.coalition if gov else None,
            } if gov else None,
        })
    
    # Build government periods for chart background
    government_periods = [
        {
            "id": g.id,
            "name": g.name,
            "slug": g.slug,
            "start_year": g.start_date.year,
            "end_year": g.end_date.year,
            "coalition": g.coalition,
        }
        for g in governments
    ]
    
    return {
        "indicator": {
            "code": indicator.code,
            "name": indicator.name,
            "description": indicator.description,
            "unit": indicator.unit,
            "source_name": indicator.source_name,
            "source_url": indicator.source_url,
        },
        "explanation": f"Este grafico muestra la evolucion de '{indicator.name}' a lo largo del tiempo, "
                       f"indicando que presidente estaba en el poder en cada momento. "
                       f"Los datos provienen de {indicator.source_name}.",
        "data": data_points,
        "government_periods": government_periods,
        "chart_config": {
            "x_axis": "year",
            "y_axis": "value",
            "y_label": indicator.unit,
            "x_label": "Ano",
        },
    }


@router.get("/{code}/compare")
async def compare_indicator_by_governments(
    code: str,
    government_ids: str = Query(..., description="Comma-separated government IDs to compare"),
    db: Session = Depends(get_db),
) -> dict:
    """
    Compare an indicator across selected governments.
    
    Useful for side-by-side comparison of performance between
    different government periods.
    
    Example: /indicators/PIB_CRECIMIENTO/compare?government_ids=1,5,8
    """
    indicator = db.query(Indicator).filter(Indicator.code == code).first()
    
    if not indicator:
        raise HTTPException(status_code=404, detail="Indicador no encontrado")
    
    # Parse government IDs
    try:
        gov_ids = [int(x.strip()) for x in government_ids.split(",")]
    except ValueError:
        raise HTTPException(
            status_code=400, 
            detail="government_ids debe ser una lista de numeros separados por coma"
        )
    
    # Get governments
    governments = (
        db.query(Government)
        .filter(Government.id.in_(gov_ids))
        .order_by(Government.start_date)
        .all()
    )
    
    if not governments:
        raise HTTPException(status_code=404, detail="No se encontraron los gobiernos especificados")
    
    # Build comparison data
    comparison = []
    for gov in governments:
        values = (
            db.query(IndicatorValue)
            .filter(
                IndicatorValue.indicator_id == indicator.id,
                IndicatorValue.government_id == gov.id,
            )
            .order_by(IndicatorValue.date)
            .all()
        )
        
        # Calculate summary statistics
        numeric_values = [v.value for v in values if v.value is not None]
        
        comparison.append({
            "government": {
                "id": gov.id,
                "name": gov.name,
                "slug": gov.slug,
                "period": f"{gov.start_date.year}-{gov.end_date.year}",
                "coalition": gov.coalition,
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
                "count": len(numeric_values),
                "average": round(sum(numeric_values) / len(numeric_values), 2) if numeric_values else None,
                "min": min(numeric_values) if numeric_values else None,
                "max": max(numeric_values) if numeric_values else None,
                "first_value": numeric_values[0] if numeric_values else None,
                "last_value": numeric_values[-1] if numeric_values else None,
                "change": round(numeric_values[-1] - numeric_values[0], 2) if len(numeric_values) >= 2 else None,
            },
        })
    
    return {
        "indicator": {
            "code": indicator.code,
            "name": indicator.name,
            "description": indicator.description,
            "unit": indicator.unit,
            "source_name": indicator.source_name,
        },
        "explanation": f"Comparacion de '{indicator.name}' entre los gobiernos seleccionados. "
                       f"Se muestra el promedio, valor inicial, valor final y cambio durante cada periodo.",
        "comparison": comparison,
    }
