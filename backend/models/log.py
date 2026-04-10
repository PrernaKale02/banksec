from sqlalchemy import Column, String, Integer, DateTime
from database import Base
from datetime import datetime


class SystemLog(Base):
    __tablename__ = "system_logs"

    id = Column(String, primary_key=True, index=True)           # e.g., "LOG-8910"
    timestamp = Column(String, nullable=False)                  # e.g., "2024-04-10 02:14:05"
    level = Column(String, nullable=False)                      # CRITICAL / WARNING / ERROR / INFO
    source = Column(String, nullable=False)                     # e.g., "Auth Service"
    message = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Log {self.id} [{self.level}]>"
