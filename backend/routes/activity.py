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

from models.alert import Alert
import json
import uuid

@router.post("/log")
def log_activity(payload: ActivityLogInput, db: Session = Depends(get_db)):
    """
    Receives an activity event from the Bank Portal and saves it.
    Also acts as a lightweight Anomaly Detector (Component 2) for the demo.
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

    # Step 2 & 3: Lightweight Anomaly Detector (Mocking Component 2)
    is_anomaly = False
    reasons = []
    risk_score = 0

    if payload.action == "BULK_DATA_EXPORT":
        is_anomaly = True
        risk_score = 92
        reasons.append(f"Massive data export detected ({payload.data_volume_mb} MB)")
        reasons.append("Action outside normal operating hours")

    if payload.data_volume_mb and payload.data_volume_mb > 500 and not is_anomaly:
        is_anomaly = True
        risk_score = 85
        reasons.append(f"Unusually large data transfer ({payload.data_volume_mb} MB)")

    if is_anomaly:
        alert_id = f"ALT-{uuid.uuid4().hex[:6].upper()}"
        new_alert = Alert(
            id=alert_id,
            employee_id=payload.employee_id,
            action=payload.action,
            time=datetime.now(timezone.utc).strftime("%I:%M %p"),
            risk_score=risk_score,
            reasons=json.dumps(reasons),
            status="Open"
        )
        db.add(new_alert)
        db.commit()
        print(f"🚨 [ALERT GENERATED] {alert_id} for {payload.employee_id} (Score: {risk_score})")

    return {
        "status": "logged",
        "id": activity.id,
        "employee_id": activity.employee_id,
        "action": activity.action,
        "timestamp": activity.timestamp.isoformat(),
        "anomaly_detected": is_anomaly
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
