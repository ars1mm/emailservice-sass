from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import User
from app.paddle_client import check_paddle_subscription


def sync_subscription_from_paddle(user: User, db: Session) -> None:
    """Sync user subscription status from Paddle API"""
    paddle_data = check_paddle_subscription(user.email)
    
    if paddle_data["status"] != user.subscription_status:
        user.subscription_status = paddle_data["status"]
        user.subscription_plan = paddle_data["plan"]
        if "subscription_id" in paddle_data:
            user.paddle_subscription_id = paddle_data["subscription_id"]
        db.commit()


def require_subscription(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    sync: bool = False
):
    """Check if user has active subscription
    
    Args:
        sync: If True, sync from Paddle API before checking
    """
    if sync:
        sync_subscription_from_paddle(current_user, db)
    
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
