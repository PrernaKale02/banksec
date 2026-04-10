from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models.alert import Alert

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

# ──────────────────────────────────────────────
# ENDPOINTS
# ──────────────────────────────────────────────

@router.get("/top-risky")
def top_risky(db: Session = Depends(get_db)):
    """Groups alerts by employee_id and sums their risk scores."""
    results = (
        db.query(Alert.employee_id, func.sum(Alert.risk_score).label("total_score"))
        .group_by(Alert.employee_id)
        .order_by(func.sum(Alert.risk_score).desc())
        .limit(5)
        .all()
    )
    
    if not results:
        return [
            {"name": "EMP-023", "score": 10},
            {"name": "EMP-112", "score": 8},
        ]

    return [{"name": row.employee_id, "score": row.total_score} for row in results]

@router.get("/anomaly-distribution")
def anomaly_distribution(db: Session = Depends(get_db)):
    """Groups alerts by action type."""
    results = (
        db.query(Alert.action, func.count(Alert.id).label("count"))
        .group_by(Alert.action)
        .order_by(func.count(Alert.id).desc())
        .limit(5)
        .all()
    )
    
    if not results:
        return [
            {"name": "Off-hours access", "count": 2},
            {"name": "System checks", "count": 1},
        ]
        
    return [{"name": row.action, "count": row.count} for row in results]
