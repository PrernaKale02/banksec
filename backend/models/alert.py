from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey
from database import Base
from datetime import datetime
import json


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, index=True)           # e.g., "ALT-1001"
    employee_id = Column(String, ForeignKey("employees.id"), nullable=False)
    action = Column(String, nullable=False)                     # e.g., "Bulk Data Export"
    time = Column(String, nullable=False)                       # display time string
    risk_score = Column(Integer, default=0)
    reasons = Column(Text, default="[]")                        # JSON string of reasons list
    status = Column(String, default="Open")                     # Open / Investigating / Resolved
    created_at = Column(DateTime, default=datetime.utcnow)

    def get_reasons(self):
        """Parse the JSON reasons string into a Python list."""
        return json.loads(self.reasons) if self.reasons else []

    def set_reasons(self, reasons_list):
        """Serialize a Python list into a JSON string."""
        self.reasons = json.dumps(reasons_list)

    def __repr__(self):
        return f"<Alert {self.id} - {self.action}>"
