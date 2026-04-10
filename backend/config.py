import os
from dotenv import load_dotenv

load_dotenv()

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./banksec.db")

# CORS — allowed frontend origins
CORS_ORIGINS = [
    "http://localhost:5173",   # Admin Dashboard (frontend/)
    "http://localhost:5174",   # Bank Portal (bank-portal/)
    "http://localhost:3000",   # Fallback dev port
]

# JWT Authentication
SECRET_KEY = os.getenv("SECRET_KEY", "banksec-ai-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Email (Gmail SMTP for demo)
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
ALERT_RECIPIENT = os.getenv("ALERT_RECIPIENT", "admin@securebank.com")

# ML Model
ANOMALY_CONTAMINATION = 0.1  # Expected proportion of anomalies
HIGH_RISK_THRESHOLD = 80
MEDIUM_RISK_THRESHOLD = 40
