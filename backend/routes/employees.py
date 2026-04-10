from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.employee import Employee
from models.alert import Alert

router = APIRouter(prefix="/api/employees", tags=["Employees"])

# ──────────────────────────────────────────────
# ENDPOINTS
# ──────────────────────────────────────────────

@router.get("")
def list_employees(db: Session = Depends(get_db)):
    """List all employees and sync their risk scores from generated alerts."""
    employees = db.query(Employee).all()
    
    # Optional logic for the demo: Sync risk score based on alerts
    for emp in employees:
        highest_alert = db.query(Alert).filter(Alert.employee_id == emp.id).order_by(Alert.risk_score.desc()).first()
        if highest_alert and highest_alert.risk_score > emp.risk_score:
            emp.risk_score = highest_alert.risk_score
            emp.risk_level = "High" if emp.risk_score > 80 else "Medium" if emp.risk_score > 40 else "Low"
            emp.status = "Investigating" if highest_alert.status == "Open" else "Active"
    
    db.commit()

    return [
        {
            "id": emp.id,
            "name": emp.name,
            "role": emp.role,
            "department": emp.department,
            "lastLogin": emp.last_login.isoformat() if emp.last_login else None,
            "riskScore": emp.risk_score,
            "riskLevel": emp.risk_level,
            "status": emp.status,
            "typicalHours": f"{emp.typical_hours_start} - {emp.typical_hours_end}",
            "mostAccessed": emp.most_accessed_resource,
            "avgDownloads": emp.avg_downloads_per_day
        }
        for emp in employees
    ]

@router.get("/{id}")
def get_employee(id: str, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.id == id).first()
    if not emp:
        return {"error": "Employee not found"}
    return {
        "id": emp.id,
        "name": emp.name,
        "role": emp.role,
        "department": emp.department,
        "lastLogin": emp.last_login.isoformat() if emp.last_login else None,
        "riskScore": emp.risk_score,
        "riskLevel": emp.risk_level,
        "status": emp.status,
        "typicalHours": f"{emp.typical_hours_start} - {emp.typical_hours_end}",
        "mostAccessed": emp.most_accessed_resource,
        "avgDownloads": emp.avg_downloads_per_day
    }
