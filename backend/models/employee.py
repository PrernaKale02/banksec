from sqlalchemy import Column, String, Integer, DateTime, Float
from database import Base
from datetime import datetime


class Employee(Base):
    __tablename__ = "employees"

    id = Column(String, primary_key=True, index=True)           # e.g., "EMP-001"
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    department = Column(String, nullable=False)
    last_login = Column(DateTime, default=datetime.utcnow)
    risk_score = Column(Integer, default=0)                     # 0-100
    risk_level = Column(String, default="Low")                  # Low / Medium / High
    status = Column(String, default="Active")                   # Active / Investigating / Suspended

    # Behavioral profile fields
    typical_hours_start = Column(String, default="09:00")
    typical_hours_end = Column(String, default="17:00")
    most_accessed_resource = Column(String, default="General Portal")
    avg_downloads_per_day = Column(Integer, default=5)

    def __repr__(self):
        return f"<Employee {self.id} - {self.name}>"
