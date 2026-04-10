from sqlalchemy import Column, String, Integer, DateTime
from database import Base
from datetime import datetime


class InvestigationCase(Base):
    __tablename__ = "cases"

    id = Column(String, primary_key=True, index=True)           # e.g., "CASE-2024-A01"
    employee = Column(String, nullable=False)                   # "EMP-023 (Bob Johnson)"
    alert_type = Column(String, nullable=False)                 # e.g., "Bulk Data Export"
    risk_score = Column(Integer, default=0)
    status = Column(String, default="Open")                     # Open / In Progress / Closed
    investigator = Column(String, default="Unassigned")
    date = Column(String, nullable=False)                       # e.g., "2024-04-10"
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Case {self.id} - {self.status}>"
