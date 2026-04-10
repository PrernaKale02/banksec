from pydantic import BaseModel
from typing import List, Optional, Dict


class AnomalyInput(BaseModel):
    """Input for the anomaly detection endpoint."""
    employee_id: str
    login_hour: int                # 0-23
    session_duration_min: float
    download_count: int
    data_volume_mb: float
    failed_logins: int
    accessed_restricted: bool


class AnomalyResult(BaseModel):
    """Result from the anomaly detection engine."""
    is_anomaly: bool
    confidence: float              # 0.0 to 1.0
    risk_score: int                # 0-100
    reasons: List[str]             # Explainable AI reasons


class RiskScoreResult(BaseModel):
    """Breakdown of the dynamic risk score calculation."""
    employee_id: str
    total_score: int               # 0-100
    risk_level: str                # Low / Medium / High
    breakdown: Dict[str, float]    # {"anomaly_score": 40, "off_hours": 20, ...}
    reasons: List[str]
