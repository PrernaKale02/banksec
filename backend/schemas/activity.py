from pydantic import BaseModel
from typing import Optional


class ActivityLogInput(BaseModel):
    """
    Schema for activity logs sent from the Bank Portal.
    This is the contract between the Bank Portal and the Backend.
    """
    employee_id: str                        # e.g., "EMP-023"
    action: str                             # LOGIN / PAGE_ACCESS / VIEW_RECORD / BULK_DATA_EXPORT / LOGOUT
    details: str                            # "Exported 15,000 customer records"
    resource: str                           # "Customer Records" / "Auth System" / etc.
    data_volume_mb: float = 0.0
    ip_address: Optional[str] = "192.168.1.50"
