from datetime import date
from pydantic import BaseModel, Field
from typing import Optional, List


class PoliticalAffiliation(BaseModel):
    """Political party affiliation with duration."""
    party: str
    start_year: int
    end_year: int
    role: str = "member"  # member, senator, deputy, etc.


class Controversy(BaseModel):
    """Documented controversy or allegation with source."""
    title: str
    year: int
    source_url: str
    status: str = "investigated"  # investigated, convicted, dismissed, documented


class GovernmentBase(BaseModel):
    """Base schema for government without relationships."""
    name: str
    slug: str
    start_date: date
    end_date: Optional[date] = None
    coalition: Optional[str] = None
    short_bio: str
    image_url: Optional[str] = None


class GovernmentDetail(GovernmentBase):
    """Detailed government response with political history and controversies."""
    id: int
    political_party_history: Optional[List[PoliticalAffiliation]] = None
    documented_controversies: Optional[List[Controversy]] = None

    class Config:
        from_attributes = True


class GovernmentList(GovernmentBase):
    """Minimal government response for list endpoints."""
    id: int

    class Config:
        from_attributes = True
