from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class IndicatorValue(Base):
    """Time series values for indicators across government periods.
    
    Stores actual data points: date, value, and data quality status.
    Values may be null if official data is not available (documented as "missing").
    """

    __tablename__ = "indicator_values"

    id = Column(Integer, primary_key=True, index=True)
    indicator_id = Column(Integer, ForeignKey("indicators.id"), nullable=False)
    government_id = Column(Integer, ForeignKey("governments.id"), nullable=False)
    date = Column(Date, nullable=False, index=True)  # Year/month/day of measurement
    value = Column(Float, nullable=True)  # Null means no official data available
    # Status distinguishes between verified official data, missing data, or not applicable periods.
    # Values: "official" (verified from official source), "missing" (no data available),
    # "not_applicable" (indicator didn't exist or wasn't measured in that period).
    status = Column(String, default="official", nullable=False)
    
    # Relationships for ORM access (bidirectional).
    indicator = relationship("Indicator", back_populates="indicator_values")
    government = relationship("Government", back_populates="indicator_values")
