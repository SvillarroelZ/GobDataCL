"""Government API endpoints."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.government import Government
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
