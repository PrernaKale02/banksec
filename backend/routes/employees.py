from fastapi import APIRouter

router = APIRouter(prefix="/api/employees", tags=["Employees"])

# ──────────────────────────────────────────────
# ENDPOINTS TO IMPLEMENT (Member B)
# ──────────────────────────────────────────────
# GET /api/employees             → List all employees (search & filter)
# GET /api/employees/{id}        → Single employee with behavior profile
# ──────────────────────────────────────────────
