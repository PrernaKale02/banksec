from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from database import get_db
from models.activity import ActivityLog
from schemas.activity import ActivityLogInput

router = APIRouter(prefix="/api/activity", tags=["Activity Logging"])


# ──────────────────────────────────────────────
# ENDPOINT — Bank Portal sends activity logs here
# ──────────────────────────────────────────────
# POST /api/activity/log         → Receive activity, run ML, create alerts
# ──────────────────────────────────────────────

@router.post("/log")
def log_activity(payload: ActivityLogInput, db: Session = Depends(get_db)):
    """
    Receives an activity event from the Bank Portal and saves it.
    In the future, Component 2 (ML Anomaly Detector) will hook in here 
    to analyze the activity and generate alerts.
    """

    # Step 1: Save raw log to ActivityLog table
    activity = ActivityLog(
        employee_id=payload.employee_id,
        action=payload.action,
        details=payload.details,
        resource=payload.resource,
        data_volume_mb=payload.data_volume_mb,
        ip_address=payload.ip_address or "192.168.1.50",
        timestamp=datetime.now(timezone.utc),
    )
    db.add(activity)
    db.commit()
    db.refresh(activity)

    print(f"[ACTIVITY] {payload.employee_id} → {payload.action}: {payload.details}")

    # Step 2: TODO (Component 2) — Feed into ML Anomaly Detector
    # Step 3: TODO (Component 2) — Create Alert if anomaly detected
    # Step 4: TODO (Component 4) — Send email if critical

    return {
        "status": "logged",
        "id": activity.id,
        "employee_id": activity.employee_id,
        "action": activity.action,
        "timestamp": activity.timestamp.isoformat(),
    }


@router.get("/recent")
def get_recent_activity(limit: int = 50, db: Session = Depends(get_db)):
    """Returns the most recent activity logs (useful for debugging and Component 2)."""
    activities = (
        db.query(ActivityLog)
        .order_by(ActivityLog.timestamp.desc())
        .limit(limit)
        .all()
    )
    return [
        {
            "id": a.id,
            "employee_id": a.employee_id,
            "action": a.action,
            "details": a.details,
            "resource": a.resource,
            "data_volume_mb": a.data_volume_mb,
            "ip_address": a.ip_address,
            "timestamp": a.timestamp.isoformat() if a.timestamp else None,
        }
        for a in activities
    ]
