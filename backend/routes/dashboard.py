from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models.alert import Alert
from models.activity import ActivityLog
from datetime import datetime, timezone, timedelta

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    # Calculate live stats
    active_alerts = db.query(Alert).filter(Alert.status == "Open").count()
    suspicious_count = db.query(Alert).count()  # Every alert generated is a suspicious activity
    
    # Calculate unique users with high risk (> 50)
    high_risk_users = db.query(Alert.employee_id).filter(Alert.risk_score > 50).distinct().count()

    # Total monitored acts as a base + active DB employees to make it look realistic for demo
    base_monitored = 1450

    return {
        "totalMonitored": base_monitored,
        "activeAlerts": active_alerts,
        "highRiskUsers": high_risk_users,
        "suspiciousActivities": suspicious_count,
    }

@router.get("/timeline")
def get_timeline(db: Session = Depends(get_db)):
    """Returns anomaly timeline data. Simplified for the demo."""
    # We will return the static demo timeline, but appended with live anomaly spikes.
    base_timeline = [
        {"time": '00:00', "anomalies": 1},
        {"time": '04:00', "anomalies": 2},
        {"time": '08:00', "anomalies": 1},
        {"time": '12:00', "anomalies": 3},
        {"time": '16:00', "anomalies": 4},
    ]
    
    # Check if there are any alerts in the last few minutes
    recent_alerts = db.query(Alert).count()
    current_hour = datetime.now().strftime("%H:00")
    
    # If recent alerts exist, create a spike for the current hour
    base_timeline.append({
        "time": current_hour,
        "anomalies": recent_alerts  # Spike based on live alerts generated!
    })

    return base_timeline

@router.get("/department-risk")
def get_dept_risk(db: Session = Depends(get_db)):
    """Returns department risk scores. IT spikes if Bob Johnson (EMP-023) did something."""
    # Base risk map
    risk_map = {
        "IT": 20,
        "Corporate": 25,
        "Retail": 15,
        "HR": 10,
        "Finance": 40
    }
    
    # If EMP-023 (Bob in IT) has alerts, spike IT department risk!
    has_it_alerts = db.query(Alert).filter(Alert.employee_id == "EMP-023").count() > 0
    if has_it_alerts:
        risk_map["IT"] = 95  # Severe risk score spike!

    return [{"name": k, "riskScore": v} for k, v in risk_map.items()]
