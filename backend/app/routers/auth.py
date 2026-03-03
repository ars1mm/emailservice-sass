from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import hash_password, verify_password, create_access_token, get_current_user
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserOut, Token, LoginRequest
from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(
        email=payload.email,
        name=payload.name,
        hashed_password=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.id})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user


# ── Test Mode: Instant checkout (no real payment) ──────────────
from pydantic import BaseModel

class TestCheckoutRequest(BaseModel):
    plan: str = "starter"  # starter | pro | enterprise


@router.post("/test-checkout", response_model=Token)
def test_checkout(payload: TestCheckoutRequest, db: Session = Depends(get_db)):
    """
    TEST MODE ONLY: Creates a test user with an active subscription.
    Skips registration forms and payment — useful for testing the full flow.
    """
    if not settings.TEST_MODE:
        raise HTTPException(status_code=403, detail="Test mode is not enabled")

    valid_plans = ["starter", "pro", "enterprise"]
    plan = payload.plan.lower()
    if plan not in valid_plans:
        raise HTTPException(status_code=400, detail=f"Invalid plan. Choose from: {valid_plans}")

    # Re-use or create the test user
    test_email = "test@emailshare.dev"
    user = db.query(User).filter(User.email == test_email).first()

    if not user:
        user = User(
            email=test_email,
            name="Test User",
            hashed_password=hash_password("testpassword123"),
            subscription_status="active",
            subscription_plan=plan,
            paddle_customer_id="test_ctm_001",
            paddle_subscription_id="test_sub_001",
        )
        db.add(user)
    else:
        # Update existing test user's plan
        user.subscription_status = "active"
        user.subscription_plan = plan

    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.id})
    return {"access_token": token, "token_type": "bearer"}
