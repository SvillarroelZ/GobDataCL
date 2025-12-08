from datetime import date
from pydantic import BaseModel
from typing import Optional


class IndicatorValueBase(BaseModel):
    """Base schema for indicator value (time series point)."""
    date: date
    value: Optional[float] = None
    status: str = "official"  # official, missing, not_applicable


class IndicatorValueResponse(IndicatorValueBase):
    """Indicator value response."""
    id: int
    indicator_id: int
    government_id: int

    class Config:
        from_attributes = True
