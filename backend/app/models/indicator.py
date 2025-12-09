from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base


class Indicator(Base):
    """Indicator model for economic, social, and demographic metrics.
    
    Stores metadata about indicators: name, unit, source, category.
    Time series values are stored in IndicatorValue table.
    """

    __tablename__ = "indicators"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, nullable=False, index=True)  # e.g., "UNEMPLOYMENT_RATE"
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    unit = Column(String, nullable=False)  # e.g., "%", "USD", "per 100k inhabitants"
    source_name = Column(String, nullable=False)  # e.g., "INE", "Central Bank of Chile"
    source_url = Column(String, nullable=False)  # Official source link for transparency
    frequency = Column(String, nullable=False)  # "annual", "quarterly", "monthly"
    category = Column(String, nullable=False, index=True)  # "economy", "demography", "health", etc.
    
    # Relationships for ORM access.
    indicator_values = relationship(
        "IndicatorValue",
        back_populates="indicator",
        cascade="all, delete-orphan"
    )
