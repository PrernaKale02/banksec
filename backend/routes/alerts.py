from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.alert import Alert

router = APIRouter(prefix="/api/alerts", tags=["Alerts"])

# ──────────────────────────────────────────────
# ENDPOINTS
# ──────────────────────────────────────────────

@router.get("")
def get_recent_alerts(limit: int = 20, db: Session = Depends(get_db)):
    """Returns recent internal threat alerts dynamically from the DB."""
    alerts = (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .limit(limit)
        .all()
    )
    return [
        {
            "id": a.id,
            "employeeId": a.employee_id,
            "action": a.action,
            "time": a.time,
            "riskScore": a.risk_score,
            "reasons": a.get_reasons(),
            "status": a.status
        }
        for a in alerts
    ]

@router.post("/{id}/investigate")
def investigate_alert(id: str, db: Session = Depends(get_db)):
    """Mock endpoint to update an alert status."""
    return {"status": "success", "message": f"Alert {id} marked as Investigating"}
