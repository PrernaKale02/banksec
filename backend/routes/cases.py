from fastapi import APIRouter

router = APIRouter(prefix="/api/cases", tags=["Investigation Cases"])

# ──────────────────────────────────────────────
# ENDPOINTS TO IMPLEMENT (Member C)
# ──────────────────────────────────────────────
# GET   /api/cases               → List all cases (search)
# POST  /api/cases               → Create new case
# PATCH /api/cases/{id}          → Update case status / investigator
# ──────────────────────────────────────────────
