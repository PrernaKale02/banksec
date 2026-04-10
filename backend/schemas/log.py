from pydantic import BaseModel
from typing import Optional


class LogOut(BaseModel):
    """Schema for system log responses."""
    id: str
    timestamp: str
    level: str
    source: str
    message: str

    class Config:
        from_attributes = True
