from fastapi import APIRouter

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

# ──────────────────────────────────────────────
# ENDPOINTS TO IMPLEMENT (Member D)
# ──────────────────────────────────────────────
# GET /api/analytics/top-risky           → Top risky employees
# GET /api/analytics/anomaly-distribution → Anomaly type distribution
# GET /api/analytics/insights            → AI-generated insights
# ──────────────────────────────────────────────
