from sqlalchemy import Column, Integer, String, Date, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


class Government(Base):
    """Government model representing a presidential period in Chile.
    
    Stores comprehensive profile: name, dates, political affiliations, bio,
    and documented controversies/allegations for neutral reference.
    """

    __tablename__ = "governments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)  # President name
    slug = Column(String, unique=True, nullable=False, index=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    coalition = Column(String, nullable=True)  # Political coalition name
    short_bio = Column(String, nullable=False)  # Neutral, factual summary
    image_url = Column(String, nullable=True)  # President portrait URL
    
    # Political party history: JSON string for structured data.
    # Format: [{\"party\": \"name\", \"start_year\": 2000, \"end_year\": 2006, \"role\": \"member\"}]
    political_party_history = Column(Text, nullable=True)
    
    # Documented controversies/allegations: neutral, fact-based, with sources.
    # Format: [{\"title\": \"allegation\", \"year\": 2010, \"source_url\": \"...\", \"status\": \"investigated|convicted|dismissed\"}]
    documented_controversies = Column(Text, nullable=True)
    
    # Relationships for ORM access.
    indicator_values = relationship(
        "IndicatorValue",
        back_populates="government",
        cascade="all, delete-orphan"
    )
