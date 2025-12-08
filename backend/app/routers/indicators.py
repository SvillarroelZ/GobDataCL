"""Indicator API endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
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
