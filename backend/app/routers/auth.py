import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from jose import JWTError, jwt

from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])


# ── Helpers ────────────────────────────────────────────────────
def _create_token(data: dict) -> str:
    from datetime import timedelta
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def _decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")


def _get_bearer_token(request: Request) -> str:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    return auth[7:]


# ── Stub endpoints (no DB yet) ────────────────────────────────
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: str
    email: str
    name: str
    created_at: str
    subscription_status: str = "inactive"
    subscription_plan: str = "free"


@router.post("/register", status_code=status.HTTP_503_SERVICE_UNAVAILABLE)
def register():
    raise HTTPException(
        status_code=503,
        detail="Registration is unavailable — database not connected. Use test mode instead."
    )


@router.post("/login", status_code=status.HTTP_503_SERVICE_UNAVAILABLE)
def login():
    raise HTTPException(
        status_code=503,
        detail="Login is unavailable — database not connected. Use test mode instead."
    )


@router.get("/me", response_model=UserOut)
def me(request: Request):
    """
    Returns user info. In test mode, all data is decoded from the JWT itself.
    """
    token = _get_bearer_token(request)
    payload = _decode_token(token)

    return {
        "id": payload.get("sub", ""),
        "email": payload.get("email", ""),
        "name": payload.get("name", ""),
        "created_at": payload.get("created_at", ""),
        "subscription_status": payload.get("subscription_status", "inactive"),
        "subscription_plan": payload.get("subscription_plan", "free"),
    }


# ── Test Mode: Instant checkout (no DB, no payment) ───────────
class TestCheckoutRequest(BaseModel):
    plan: str = "starter"  # starter | pro | enterprise


@router.post("/test-checkout", response_model=Token)
def test_checkout(payload: TestCheckoutRequest):
    """
    TEST MODE ONLY: Returns a JWT with an active subscription baked in.
    No database, no Paddle — fully stateless.
    """
    if not settings.TEST_MODE:
        raise HTTPException(status_code=403, detail="Test mode is not enabled")

    valid_plans = ["starter", "pro", "enterprise"]
    plan = payload.plan.lower()
    if plan not in valid_plans:
        raise HTTPException(status_code=400, detail=f"Invalid plan. Choose from: {valid_plans}")

    # Embed all user data directly in the JWT (stateless, no DB needed)
    token = _create_token({
        "sub": f"test-user-{uuid.uuid4().hex[:8]}",
        "email": "test@emailshare.dev",
        "name": "Test User",
        "created_at": datetime.utcnow().isoformat(),
        "subscription_status": "active",
        "subscription_plan": plan,
    })

    return {"access_token": token, "token_type": "bearer"}
