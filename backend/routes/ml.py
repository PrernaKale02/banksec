from fastapi import APIRouter

router = APIRouter(prefix="/api/ml", tags=["ML Engine"])

# ──────────────────────────────────────────────
# ENDPOINTS TO IMPLEMENT (Member D)
# ──────────────────────────────────────────────
# POST /api/ml/detect-anomalies          → Run anomaly detection
# GET  /api/ml/risk-score/{employee_id}  → Calculate risk score
# ──────────────────────────────────────────────
