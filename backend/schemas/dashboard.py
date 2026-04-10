from pydantic import BaseModel
from typing import List


class DashboardStats(BaseModel):
    """Aggregate KPI stats for the dashboard."""
    total_monitored: int = 0
    active_alerts: int = 0
    high_risk_users: int = 0
    suspicious_activities: int = 0


class TimelinePoint(BaseModel):
    """Single point on the anomaly timeline chart."""
    time: str
    anomalies: int


class DepartmentRisk(BaseModel):
    """Department-level risk score."""
    name: str
    risk_score: int
