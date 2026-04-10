from fastapi import APIRouter

router = APIRouter(prefix="/api/activity", tags=["Activity Logging"])

# ──────────────────────────────────────────────
# ENDPOINT — Bank Portal sends activity logs here
# ──────────────────────────────────────────────
# POST /api/activity/log         → Receive activity, run ML, create alerts
# ──────────────────────────────────────────────
