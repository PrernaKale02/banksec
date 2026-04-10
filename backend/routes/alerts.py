from fastapi import APIRouter

router = APIRouter(prefix="/api/alerts", tags=["Alerts"])

# ──────────────────────────────────────────────
# ENDPOINTS TO IMPLEMENT (Member C)
# ──────────────────────────────────────────────
# GET  /api/alerts               → List alerts (filter by ?status=)
# POST /api/alerts/{id}/investigate → Update alert status
# ──────────────────────────────────────────────
