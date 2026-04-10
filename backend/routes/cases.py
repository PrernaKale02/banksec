from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.case import InvestigationCase

router = APIRouter(prefix="/api/cases", tags=["Investigation Cases"])

# ──────────────────────────────────────────────
# ENDPOINTS
# ──────────────────────────────────────────────

@router.get("")
def list_cases(db: Session = Depends(get_db)):
    """List investigation cases."""
    cases = db.query(InvestigationCase).all()
    # If empty, return a default mock case to prevent UI from being totally blank
    if not cases:
        return [{
            "id": "CASE-SYSTEM-01",
            "employee": "SYSTEM",
            "alertType": "Background check",
            "riskScore": 0,
            "status": "Closed",
            "investigator": "System",
            "date": "2024-01-01"
        }]

    return [
        {
            "id": c.id,
            "employee": c.employee,
            "alertType": c.alert_type,
            "riskScore": c.risk_score,
            "status": c.status,
            "investigator": c.investigator,
            "date": c.date
        }
        for c in cases
    ]

# ──────────────────────────────────────────────
# ENDPOINTS TO IMPLEMENT (Member C)
# ──────────────────────────────────────────────
# POST  /api/cases               → Create new case
# PATCH /api/cases/{id}          → Update case status / investigator
# ──────────────────────────────────────────────
