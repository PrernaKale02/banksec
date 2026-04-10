from sqlalchemy import Column, Integer, Boolean
from database import Base


class PlatformSettings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, default=1)
    high_risk_threshold = Column(Integer, default=80)
    medium_risk_threshold = Column(Integer, default=40)
    behavioral_drift_enabled = Column(Boolean, default=True)
    peer_outlier_enabled = Column(Boolean, default=True)
    off_hours_enabled = Column(Boolean, default=True)

    def __repr__(self):
        return f"<Settings high={self.high_risk_threshold} med={self.medium_risk_threshold}>"
