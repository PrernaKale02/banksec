"""
BankSec AI — Demo Data Seeder

Populates the database with realistic demo data for presentations.
Run with: python seed_data.py
"""

import json
import random
from datetime import datetime, timedelta, timezone
from database import engine, SessionLocal, Base
from models.employee import Employee
from models.alert import Alert
from models.case import InvestigationCase
from models.log import SystemLog
from models.settings import PlatformSettings
from models.activity import ActivityLog


def seed():
    """Drop and recreate all tables, then populate with demo data."""

    # Recreate all tables
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        # ── EMPLOYEES ──────────────────────────────────────────
        employees_data = [
            {"id": "EMP-001", "name": "Alice Smith", "role": "Loan Officer", "department": "Retail Banking", "risk_score": 12, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Loan Portal", "avg_downloads_per_day": 8},
            {"id": "EMP-007", "name": "Rajesh Kumar", "role": "Compliance Officer", "department": "Compliance", "risk_score": 5, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Compliance Dashboard", "avg_downloads_per_day": 3},
            {"id": "EMP-012", "name": "Neha Gupta", "role": "Relationship Manager", "department": "Retail Banking", "risk_score": 18, "risk_level": "Low", "status": "Active", "most_accessed_resource": "CRM System", "avg_downloads_per_day": 6},
            {"id": "EMP-023", "name": "Bob Johnson", "role": "Data Analyst", "department": "IT", "risk_score": 92, "risk_level": "High", "status": "Investigating", "most_accessed_resource": "Customer DB", "avg_downloads_per_day": 12, "typical_hours_start": "09:00", "typical_hours_end": "18:00"},
            {"id": "EMP-031", "name": "Sneha Patil", "role": "Teller", "department": "Retail Banking", "risk_score": 7, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Transaction Terminal", "avg_downloads_per_day": 2},
            {"id": "EMP-045", "name": "Charlie Davis", "role": "Branch Manager", "department": "Retail Banking", "risk_score": 45, "risk_level": "Medium", "status": "Active", "most_accessed_resource": "Management Portal", "avg_downloads_per_day": 15},
            {"id": "EMP-052", "name": "Priya Sharma", "role": "HR Analyst", "department": "HR", "risk_score": 10, "risk_level": "Low", "status": "Active", "most_accessed_resource": "HR Portal", "avg_downloads_per_day": 4},
            {"id": "EMP-067", "name": "Amit Desai", "role": "Credit Analyst", "department": "Corporate", "risk_score": 22, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Credit System", "avg_downloads_per_day": 9},
            {"id": "EMP-078", "name": "Sarah Williams", "role": "Treasury Manager", "department": "Finance", "risk_score": 38, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Treasury System", "avg_downloads_per_day": 7},
            {"id": "EMP-088", "name": "Diana Prince", "role": "Investment Banker", "department": "Corporate", "risk_score": 8, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Investment Portal", "avg_downloads_per_day": 5},
            {"id": "EMP-095", "name": "Vikram Singh", "role": "Network Admin", "department": "IT", "risk_score": 55, "risk_level": "Medium", "status": "Active", "most_accessed_resource": "Server Room Logs", "avg_downloads_per_day": 10},
            {"id": "EMP-101", "name": "Kavita Joshi", "role": "Auditor", "department": "Finance", "risk_score": 15, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Audit System", "avg_downloads_per_day": 20},
            {"id": "EMP-112", "name": "Evan Wright", "role": "System Admin", "department": "IT", "risk_score": 78, "risk_level": "High", "status": "Active", "most_accessed_resource": "Admin Console", "avg_downloads_per_day": 8, "typical_hours_start": "09:00", "typical_hours_end": "17:00"},
            {"id": "EMP-118", "name": "Ananya Rao", "role": "Customer Service Rep", "department": "Retail Banking", "risk_score": 3, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Helpdesk Portal", "avg_downloads_per_day": 1},
            {"id": "EMP-125", "name": "Michael Chen", "role": "Risk Manager", "department": "Finance", "risk_score": 28, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Risk Dashboard", "avg_downloads_per_day": 11},
            {"id": "EMP-134", "name": "Ravi Patel", "role": "Database Admin", "department": "IT", "risk_score": 32, "risk_level": "Low", "status": "Active", "most_accessed_resource": "DB Admin Console", "avg_downloads_per_day": 6},
            {"id": "EMP-142", "name": "Lisa Anderson", "role": "Marketing Analyst", "department": "Corporate", "risk_score": 9, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Marketing Tools", "avg_downloads_per_day": 4},
            {"id": "EMP-156", "name": "Deepak Nair", "role": "Software Developer", "department": "IT", "risk_score": 42, "risk_level": "Medium", "status": "Active", "most_accessed_resource": "Code Repository", "avg_downloads_per_day": 14},
            {"id": "EMP-163", "name": "Meera Iyer", "role": "Legal Counsel", "department": "Compliance", "risk_score": 6, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Legal Database", "avg_downloads_per_day": 3},
            {"id": "EMP-178", "name": "James Wilson", "role": "Operations Manager", "department": "Retail Banking", "risk_score": 20, "risk_level": "Low", "status": "Active", "most_accessed_resource": "Ops Dashboard", "avg_downloads_per_day": 7},
        ]

        now = datetime.now(timezone.utc)
        for emp_data in employees_data:
            hours_ago = random.randint(1, 72)
            emp = Employee(
                id=emp_data["id"],
                name=emp_data["name"],
                role=emp_data["role"],
                department=emp_data["department"],
                last_login=now - timedelta(hours=hours_ago),
                risk_score=emp_data["risk_score"],
                risk_level=emp_data["risk_level"],
                status=emp_data["status"],
                typical_hours_start=emp_data.get("typical_hours_start", "09:00"),
                typical_hours_end=emp_data.get("typical_hours_end", "17:00"),
                most_accessed_resource=emp_data.get("most_accessed_resource", "General Portal"),
                avg_downloads_per_day=emp_data.get("avg_downloads_per_day", 5),
            )
            db.add(emp)

        # ── ALERTS ─────────────────────────────────────────────
        alerts_data = [
            {"id": "ALT-1001", "employee_id": "EMP-023", "action": "Bulk Data Export", "time": "02:13 AM", "risk_score": 92, "reasons": ["Off-hours login at 02:13 AM", "Downloaded 500+ records in 10 minutes", "Data volume 80x above daily average"], "status": "Open"},
            {"id": "ALT-1002", "employee_id": "EMP-112", "action": "Multiple Failed Logins", "time": "01:45 AM", "risk_score": 78, "reasons": ["5 failed login attempts in 3 minutes", "Accessed from unknown device", "Unusual server access pattern"], "status": "Investigating"},
            {"id": "ALT-1003", "employee_id": "EMP-045", "action": "Accessing Unauthorized Records", "time": "05:30 PM", "risk_score": 45, "reasons": ["Attempted access to restricted HR folder", "Outside standard role permissions"], "status": "Resolved"},
            {"id": "ALT-1004", "employee_id": "EMP-095", "action": "Privilege Escalation Attempt", "time": "11:22 PM", "risk_score": 68, "reasons": ["Attempted to modify admin privileges", "Off-hours activity detected"], "status": "Open"},
            {"id": "ALT-1005", "employee_id": "EMP-023", "action": "Suspicious File Access", "time": "02:30 AM", "risk_score": 85, "reasons": ["Accessed restricted financial records", "Same session as bulk export", "Pattern matches data exfiltration"], "status": "Open"},
            {"id": "ALT-1006", "employee_id": "EMP-156", "action": "Unusual API Calls", "time": "03:15 PM", "risk_score": 42, "reasons": ["API call volume 3x above normal", "Accessing endpoints outside role scope"], "status": "Investigating"},
            {"id": "ALT-1007", "employee_id": "EMP-112", "action": "Unknown Device Login", "time": "01:50 AM", "risk_score": 72, "reasons": ["Login from unregistered device", "Geo-location mismatch with usual IP"], "status": "Open"},
            {"id": "ALT-1008", "employee_id": "EMP-078", "action": "Large Fund Transfer Query", "time": "04:45 PM", "risk_score": 38, "reasons": ["Queried transfers above ₹50L threshold", "Unusual for role profile"], "status": "Resolved"},
        ]

        for a in alerts_data:
            alert = Alert(
                id=a["id"],
                employee_id=a["employee_id"],
                action=a["action"],
                time=a["time"],
                risk_score=a["risk_score"],
                reasons=json.dumps(a["reasons"]),
                status=a["status"],
                created_at=now - timedelta(hours=random.randint(1, 24)),
            )
            db.add(alert)

        # ── INVESTIGATION CASES ────────────────────────────────
        cases_data = [
            {"id": "CASE-2024-A01", "employee": "EMP-023 (Bob Johnson)", "alert_type": "Bulk Data Export", "risk_score": 92, "status": "Open", "investigator": "Unassigned", "date": now.strftime("%Y-%m-%d")},
            {"id": "CASE-2024-B14", "employee": "EMP-112 (Evan Wright)", "alert_type": "Multiple Failed Logins", "risk_score": 78, "status": "In Progress", "investigator": "Sarah Connor", "date": now.strftime("%Y-%m-%d")},
            {"id": "CASE-2024-C45", "employee": "EMP-045 (Charlie Davis)", "alert_type": "Unauthorized Access", "risk_score": 45, "status": "Closed", "investigator": "Mike Stone", "date": (now - timedelta(days=1)).strftime("%Y-%m-%d")},
            {"id": "CASE-2024-D08", "employee": "EMP-095 (Vikram Singh)", "alert_type": "Privilege Escalation", "risk_score": 68, "status": "Open", "investigator": "Sarah Connor", "date": now.strftime("%Y-%m-%d")},
        ]

        for c in cases_data:
            case = InvestigationCase(
                id=c["id"],
                employee=c["employee"],
                alert_type=c["alert_type"],
                risk_score=c["risk_score"],
                status=c["status"],
                investigator=c["investigator"],
                date=c["date"],
                created_at=now - timedelta(hours=random.randint(1, 48)),
            )
            db.add(case)

        # ── SYSTEM LOGS ────────────────────────────────────────
        logs_data = [
            {"id": "LOG-9001", "timestamp": (now - timedelta(minutes=5)).strftime("%Y-%m-%d %H:%M:%S"), "level": "CRITICAL", "source": "Auth Service", "message": "Multiple failed login attempts detected for EMP-112 from IP 192.168.1.50"},
            {"id": "LOG-9002", "timestamp": (now - timedelta(minutes=8)).strftime("%Y-%m-%d %H:%M:%S"), "level": "WARNING", "source": "Data Export API", "message": "Large volume data export initiated by EMP-023. Size: 1.2GB"},
            {"id": "LOG-9003", "timestamp": (now - timedelta(minutes=12)).strftime("%Y-%m-%d %H:%M:%S"), "level": "INFO", "source": "Session Manager", "message": "Session generated for EMP-023"},
            {"id": "LOG-9004", "timestamp": (now - timedelta(minutes=20)).strftime("%Y-%m-%d %H:%M:%S"), "level": "INFO", "source": "System", "message": "Scheduled risk model retrain completed successfully in 45s"},
            {"id": "LOG-9005", "timestamp": (now - timedelta(minutes=30)).strftime("%Y-%m-%d %H:%M:%S"), "level": "ERROR", "source": "Database Access", "message": "Connection timeout while querying legacy HR archive"},
            {"id": "LOG-9006", "timestamp": (now - timedelta(minutes=35)).strftime("%Y-%m-%d %H:%M:%S"), "level": "CRITICAL", "source": "Auth Service", "message": "Unknown device login for EMP-112"},
            {"id": "LOG-9007", "timestamp": (now - timedelta(minutes=45)).strftime("%Y-%m-%d %H:%M:%S"), "level": "INFO", "source": "System Backup", "message": "Incremental backup encrypted and stored"},
            {"id": "LOG-9008", "timestamp": (now - timedelta(minutes=55)).strftime("%Y-%m-%d %H:%M:%S"), "level": "WARNING", "source": "File System", "message": "Unusual access pattern detected on '/restricted/q3_financials'"},
            {"id": "LOG-9009", "timestamp": (now - timedelta(hours=1)).strftime("%Y-%m-%d %H:%M:%S"), "level": "INFO", "source": "Auth Service", "message": "Employee EMP-088 logged in from registered device"},
            {"id": "LOG-9010", "timestamp": (now - timedelta(hours=1, minutes=10)).strftime("%Y-%m-%d %H:%M:%S"), "level": "WARNING", "source": "Anomaly Engine", "message": "Behavioral drift detected for EMP-095 — access pattern deviation 3.2x"},
            {"id": "LOG-9011", "timestamp": (now - timedelta(hours=1, minutes=20)).strftime("%Y-%m-%d %H:%M:%S"), "level": "INFO", "source": "Auth Service", "message": "Employee EMP-001 logged in from branch office"},
            {"id": "LOG-9012", "timestamp": (now - timedelta(hours=1, minutes=30)).strftime("%Y-%m-%d %H:%M:%S"), "level": "CRITICAL", "source": "Data Export API", "message": "EMP-023 attempted second bulk export — blocked by rate limiter"},
            {"id": "LOG-9013", "timestamp": (now - timedelta(hours=2)).strftime("%Y-%m-%d %H:%M:%S"), "level": "INFO", "source": "System", "message": "Daily risk report generated and emailed to compliance team"},
            {"id": "LOG-9014", "timestamp": (now - timedelta(hours=2, minutes=15)).strftime("%Y-%m-%d %H:%M:%S"), "level": "ERROR", "source": "Email Service", "message": "Failed to send alert notification — SMTP connection refused"},
            {"id": "LOG-9015", "timestamp": (now - timedelta(hours=3)).strftime("%Y-%m-%d %H:%M:%S"), "level": "INFO", "source": "ML Pipeline", "message": "Anomaly detection model v2.3 loaded successfully — 98.2% accuracy on test set"},
        ]

        for l in logs_data:
            log = SystemLog(
                id=l["id"],
                timestamp=l["timestamp"],
                level=l["level"],
                source=l["source"],
                message=l["message"],
                created_at=now,
            )
            db.add(log)

        # ── PLATFORM SETTINGS ──────────────────────────────────
        settings = PlatformSettings(
            id=1,
            high_risk_threshold=80,
            medium_risk_threshold=40,
            behavioral_drift_enabled=True,
            peer_outlier_enabled=True,
            off_hours_enabled=True,
        )
        db.add(settings)

        # ── COMMIT ─────────────────────────────────────────────
        db.commit()

        print("[OK] Database seeded successfully!")
        print(f"   - {len(employees_data)} employees")
        print(f"   - {len(alerts_data)} alerts")
        print(f"   - {len(cases_data)} investigation cases")
        print(f"   - {len(logs_data)} system logs")
        print(f"   - Platform settings initialized")
        print(f"\nDatabase file: banksec.db")

    except Exception as e:
        db.rollback()
        print(f"[ERROR] Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
