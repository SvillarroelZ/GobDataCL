"""
Database seeding script.

Run this script to populate the database with initial data:
    python -m app.seed.run_seed

This will:
1. Create all database tables if they don't exist
2. Clear existing data (optional)
3. Insert governments, indicators, and indicator values
"""

import json
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from sqlalchemy.orm import Session

from app.core.database import engine, Base, SessionLocal
from app.models.government import Government
from app.models.indicator import Indicator
from app.models.indicator_value import IndicatorValue
from app.seed.governments import GOVERNMENTS_DATA
from app.seed.indicators import INDICATORS_DATA
from app.seed.indicator_values import INDICATOR_VALUES_DATA


def clear_database(db: Session) -> None:
    """Remove all existing data from tables."""
    print("Clearing existing data...")
    db.query(IndicatorValue).delete()
    db.query(Indicator).delete()
    db.query(Government).delete()
    db.commit()
    print("  - All tables cleared")


def seed_governments(db: Session) -> dict[str, int]:
    """Insert government data and return slug -> id mapping."""
    print("Seeding governments...")
    slug_to_id = {}
    
    for gov_data in GOVERNMENTS_DATA:
        government = Government(
            name=gov_data["name"],
            slug=gov_data["slug"],
            start_date=gov_data["start_date"],
            end_date=gov_data["end_date"],
            coalition=gov_data["coalition"],
            short_bio=gov_data["short_bio"],
            image_url=gov_data["image_url"],
            political_party_history=json.dumps(gov_data["political_party_history"]),
            documented_controversies=json.dumps(gov_data["documented_controversies"]),
        )
        db.add(government)
        db.flush()  # Get the ID without committing
        slug_to_id[gov_data["slug"]] = government.id
        print(f"  - {gov_data['name']} ({gov_data['start_date'].year}-{gov_data['end_date'].year})")
    
    db.commit()
    print(f"  Total: {len(GOVERNMENTS_DATA)} governments")
    return slug_to_id


def seed_indicators(db: Session) -> dict[str, int]:
    """Insert indicator data and return code -> id mapping."""
    print("Seeding indicators...")
    code_to_id = {}
    
    for ind_data in INDICATORS_DATA:
        indicator = Indicator(
            code=ind_data["code"],
            name=ind_data["name"],
            description=ind_data["description"],
            unit=ind_data["unit"],
            source_name=ind_data["source_name"],
            source_url=ind_data["source_url"],
            frequency=ind_data["frequency"],
            category=ind_data["category"],
        )
        db.add(indicator)
        db.flush()
        code_to_id[ind_data["code"]] = indicator.id
        print(f"  - {ind_data['code']}: {ind_data['name']}")
    
    db.commit()
    print(f"  Total: {len(INDICATORS_DATA)} indicators")
    return code_to_id


def seed_indicator_values(
    db: Session,
    code_to_id: dict[str, int],
    slug_to_id: dict[str, int],
) -> None:
    """Insert indicator values linking indicators to governments."""
    print("Seeding indicator values...")
    count = 0
    skipped = 0
    
    for indicator_code, gov_slug, date_val, value, status in INDICATOR_VALUES_DATA:
        indicator_id = code_to_id.get(indicator_code)
        government_id = slug_to_id.get(gov_slug)
        
        if not indicator_id:
            print(f"  Warning: Unknown indicator code '{indicator_code}', skipping")
            skipped += 1
            continue
        
        if not government_id:
            print(f"  Warning: Unknown government slug '{gov_slug}', skipping")
            skipped += 1
            continue
        
        indicator_value = IndicatorValue(
            indicator_id=indicator_id,
            government_id=government_id,
            date=date_val,
            value=value,
            status=status,
        )
        db.add(indicator_value)
        count += 1
    
    db.commit()
    print(f"  Total: {count} values inserted, {skipped} skipped")


def run_seed(clear_existing: bool = True) -> None:
    """
    Main seeding function.
    
    Args:
        clear_existing: If True, clear all existing data before seeding.
    """
    print("=" * 60)
    print("GobData CL - Database Seeding")
    print("=" * 60)
    
    # Create tables
    print("\nCreating database tables...")
    Base.metadata.create_all(bind=engine)
    print("  - Tables created")
    
    # Get database session
    db = SessionLocal()
    
    try:
        if clear_existing:
            clear_database(db)
        
        print()
        slug_to_id = seed_governments(db)
        
        print()
        code_to_id = seed_indicators(db)
        
        print()
        seed_indicator_values(db, code_to_id, slug_to_id)
        
        print()
        print("=" * 60)
        print("Seeding completed successfully")
        print("=" * 60)
        
    except Exception as e:
        print(f"\nError during seeding: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    run_seed()
