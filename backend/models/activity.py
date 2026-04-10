from sqlalchemy import Column, String, Integer, Float, DateTime
from database import Base
from datetime import datetime


class ActivityLog(Base):
    """Stores raw activity events received from the Bank Portal."""
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(String, nullable=False)
    action = Column(String, nullable=False)         # LOGIN / PAGE_ACCESS / VIEW_RECORD / BULK_DATA_EXPORT / LOGOUT
    details = Column(String, nullable=False)
    resource = Column(String, nullable=False)        # Auth System / Customer Records / Financial Reports
    data_volume_mb = Column(Float, default=0.0)
    ip_address = Column(String, default="unknown")
    timestamp = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Activity {self.employee_id} - {self.action}>"
