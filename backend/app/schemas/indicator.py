from pydantic import BaseModel
from typing import Optional


class IndicatorBase(BaseModel):
    """Base schema for indicator metadata."""
    code: str
    name: str
    description: str
    unit: str
    source_name: str
    source_url: str
    frequency: str
    category: str


class IndicatorList(IndicatorBase):
    """Indicator response for list and detail endpoints."""
    id: int

    class Config:
        from_attributes = True
