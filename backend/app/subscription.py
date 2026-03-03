from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import User


def require_subscription(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Check if user has active subscription"""
    if current_user.subscription_status not in ["active", "trialing"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Active subscription required"
        )
    return current_user


def require_plan(min_plan: str):
    """Check if user has specific plan or higher"""
    plan_hierarchy = {"starter": 1, "pro": 2, "enterprise": 3}
    
    def check_plan(current_user: User = Depends(get_current_user)):
        user_plan_level = plan_hierarchy.get(current_user.subscription_plan, 0)
        required_level = plan_hierarchy.get(min_plan, 999)
        
        if user_plan_level < required_level:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"{min_plan.capitalize()} plan or higher required"
            )
        return current_user
    
    return check_plan
