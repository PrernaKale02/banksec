from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class AlertOut(BaseModel):
    """Schema for alert list responses."""
    id: str
    employee_id: str
    action: str
    time: str
    risk_score: int = 0
    reasons: List[str] = []
    status: str = "Open"
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class AlertStatusUpdate(BaseModel):
    """Schema for updating alert status."""
    status: str  # "Investigating" / "Resolved"
