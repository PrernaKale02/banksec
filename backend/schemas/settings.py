from pydantic import BaseModel
from typing import Optional


class SettingsOut(BaseModel):
    """Schema for reading current settings."""
    high_risk_threshold: int = 80
    medium_risk_threshold: int = 40
    behavioral_drift_enabled: bool = True
    peer_outlier_enabled: bool = True
    off_hours_enabled: bool = True

    class Config:
        from_attributes = True


class SettingsUpdate(BaseModel):
    """Schema for updating settings."""
    high_risk_threshold: Optional[int] = None
    medium_risk_threshold: Optional[int] = None
    behavioral_drift_enabled: Optional[bool] = None
    peer_outlier_enabled: Optional[bool] = None
    off_hours_enabled: Optional[bool] = None
