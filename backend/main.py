"""
BankSec AI — Backend API Server

FastAPI application with all route registrations and CORS configuration.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import CORS_ORIGINS
from database import engine, Base

# Import all models so SQLAlchemy creates the tables
from models import Employee, Alert, InvestigationCase, SystemLog, PlatformSettings, ActivityLog

# Import all routers
from routes.dashboard import router as dashboard_router
from routes.employees import router as employees_router
from routes.alerts import router as alerts_router
from routes.analytics import router as analytics_router
from routes.cases import router as cases_router
from routes.logs import router as logs_router
from routes.settings import router as settings_router
from routes.ml import router as ml_router
from routes.activity import router as activity_router


# ──────────────────────────────────────────────
# Create FastAPI App
# ──────────────────────────────────────────────

app = FastAPI(
    title="BankSec AI — Insider Threat Detection API",
    description="AI-powered early warning system for detecting insider fraud in banking institutions.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)


# ──────────────────────────────────────────────
# CORS Middleware (allows both frontends to call the API)
# ──────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ──────────────────────────────────────────────
# Register All Routers
# ──────────────────────────────────────────────

app.include_router(dashboard_router)
app.include_router(employees_router)
app.include_router(alerts_router)
app.include_router(analytics_router)
app.include_router(cases_router)
app.include_router(logs_router)
app.include_router(settings_router)
app.include_router(ml_router)
app.include_router(activity_router)


from database import SessionLocal

# ──────────────────────────────────────────────
# Startup Event — Create tables & initialize ML model
# ──────────────────────────────────────────────

def seed_database():
    """Seeds the database with foundational mock employees if empty."""
    db = SessionLocal()
    try:
        if db.query(Employee).count() == 0:
            initial_employees = [
                Employee(id="EMP-001", name="Alice Smith", role="Loan Officer", department="Retail Banking", risk_score=12, risk_level="Low", status="Active"),
                Employee(id="EMP-023", name="Bob Johnson", role="Data Analyst", department="IT", risk_score=5, risk_level="Low", status="Active"),
                Employee(id="EMP-045", name="Charlie Davis", role="Branch Manager", department="Retail Banking", risk_score=45, risk_level="Medium", status="Active"),
                Employee(id="EMP-088", name="Diana Prince", role="Investment Banker", department="Corporate", risk_score=8, risk_level="Low", status="Active"),
                Employee(id="EMP-112", name="Evan Wright", role="System Admin", department="IT", risk_score=15, risk_level="Low", status="Active")
            ]
            db.add_all(initial_employees)
            db.commit()
            print("[OK] Database seeded with base employees.")
    except Exception as e:
        print(f"[ERROR] Failed to seed database: {e}")
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    """Create database tables on first run."""
    Base.metadata.create_all(bind=engine)
    seed_database()
    print("[OK] Database tables created.")
    print("[OK] BankSec AI API is running.")
    print("Swagger docs: http://localhost:8000/docs")


# ──────────────────────────────────────────────
# Health Check
# ──────────────────────────────────────────────

@app.get("/", tags=["Health"])
def health_check():
    return {
        "status": "online",
        "service": "BankSec AI — Insider Threat Detection API",
        "version": "1.0.0"
    }
