import time
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import get_db
from models.admin import AdminUser

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    username: str
    password: str
    token: str = None  # Mock 2FA token parameter

@router.post("/login")
def login(creds: LoginRequest, db: Session = Depends(get_db)):
    # Add a slight delay to simulate complex cryptographic hashing/verification
    time.sleep(0.5)
    
    admin = db.query(AdminUser).filter(AdminUser.username == creds.username).first()
    
    if not admin or admin.password != creds.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials or unauthorized access.",
        )
        
    return {
        "status": "success",
        "message": "Authentication verified",
        "admin": {
            "username": admin.username,
            "role": admin.role
        }
    }
