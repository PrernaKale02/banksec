from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class EmployeeOut(BaseModel):
    """Schema for employee list responses."""
    id: str
    name: str
    role: str
    department: str
    last_login: Optional[datetime] = None
    risk_score: int = 0
    risk_level: str = "Low"
    status: str = "Active"

    class Config:
        from_attributes = True


class EmployeeDetail(EmployeeOut):
    """Extended schema with behavioral profile for the detail panel."""
    typical_hours_start: str = "09:00"
    typical_hours_end: str = "17:00"
    most_accessed_resource: str = "General Portal"
    avg_downloads_per_day: int = 5

    class Config:
        from_attributes = True
