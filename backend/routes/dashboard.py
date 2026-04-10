from fastapi import APIRouter

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

# ──────────────────────────────────────────────
# ENDPOINTS TO IMPLEMENT (Member B)
# ──────────────────────────────────────────────
# GET /api/dashboard/stats       → Dashboard KPI statistics
# GET /api/dashboard/timeline    → Anomaly timeline data
# GET /api/dashboard/department-risk → Department-wise risk scores
# ──────────────────────────────────────────────
