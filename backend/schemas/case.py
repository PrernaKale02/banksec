from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CaseOut(BaseModel):
    """Schema for case list responses."""
    id: str
    employee: str
    alert_type: str
    risk_score: int = 0
    status: str = "Open"
    investigator: str = "Unassigned"
    date: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class CaseCreate(BaseModel):
    """Schema for creating a new investigation case."""
    employee: str               # e.g., "EMP-023 (Bob Johnson)"
    alert_type: str             # e.g., "Bulk Data Export"
    risk_score: int = 0
    investigator: str = "Unassigned"


class CaseUpdate(BaseModel):
    """Schema for updating case status or investigator."""
    status: Optional[str] = None
    investigator: Optional[str] = None
