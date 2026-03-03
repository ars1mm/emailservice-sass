from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime
import hmac
import hashlib
import json
import logging

from app.config import settings
from app.database import get_db
from app.models import User

logger = logging.getLogger(__name__)

router = APIRouter(tags=["paddle"])

# Map Paddle price IDs → internal plan names (populated from env vars)
PRICE_TO_PLAN: dict[str, str] = {}


def _build_price_map() -> None:
    """Lazily build the map once settings are loaded."""
    if PRICE_TO_PLAN:
        return
    if settings.PADDLE_STARTER_PRICE_ID:
        PRICE_TO_PLAN[settings.PADDLE_STARTER_PRICE_ID] = "starter"
    if settings.PADDLE_PRO_PRICE_ID:
        PRICE_TO_PLAN[settings.PADDLE_PRO_PRICE_ID] = "pro"
    if settings.PADDLE_ENTERPRISE_PRICE_ID:
        PRICE_TO_PLAN[settings.PADDLE_ENTERPRISE_PRICE_ID] = "enterprise"


def _plan_from_items(items: list[dict]) -> str:
    """Resolve the plan name from the subscription items using price IDs."""
    _build_price_map()
    for item in items:
        price_id = item.get("price", {}).get("id", "")
        if price_id in PRICE_TO_PLAN:
            return PRICE_TO_PLAN[price_id]
    return "starter"  # fallback


def _find_user(db: Session, data: dict) -> User | None:
    """Find our internal User from webhook data.

    Strategy (in priority order):
    1. custom_data.user_id  – most reliable, set during checkout
    2. custom_data.email    – fallback if user_id was missing
    3. customer.email       – final fallback from Paddle customer record
    """
    custom = data.get("custom_data") or {}

    user_id = custom.get("user_id")
    if user_id:
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            return user

    email = custom.get("email") or data.get("customer", {}).get("email")
    if email:
        return db.query(User).filter(User.email == email).first()

    return None


def verify_paddle_webhook(request_body: bytes, signature: str) -> bool:
    """Verify the Paddle webhook signature (ts + h1 scheme)."""
    if not signature:
        return False
    # Paddle v2 signature format: ts=<timestamp>;h1=<hash>
    parts = dict(p.split("=", 1) for p in signature.split(";") if "=" in p)
    ts = parts.get("ts", "")
    h1 = parts.get("h1", "")
    if not ts or not h1:
        return False
    signed_payload = f"{ts}:{request_body.decode()}"
    expected = hmac.new(
        settings.PADDLE_WEBHOOK_SECRET.encode(),
        signed_payload.encode(),
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, h1)


@router.post("/paddle/webhook")
async def paddle_webhook(request: Request, db: Session = Depends(get_db)):
    body = await request.body()
    signature = request.headers.get("paddle-signature", "")

    if settings.PADDLE_WEBHOOK_SECRET and not verify_paddle_webhook(body, signature):
        raise HTTPException(status_code=401, detail="Invalid webhook signature")

    event = json.loads(body)
    event_type = event.get("event_type", "")
    data = event.get("data", {})

    logger.info("Paddle webhook: %s", event_type)

    # ── transaction.completed (one-time payments & first subscription charge)
    if event_type == "transaction.completed":
        user = _find_user(db, data)
        if user:
            user.paddle_customer_id = data.get("customer_id", user.paddle_customer_id)
            # If this transaction is part of a subscription, that event will
            # also fire; but capture the payment right away so the user isn't
            # blocked.
            if user.subscription_status not in ("active", "trialing"):
                plan = _plan_from_items(data.get("items", []))
                user.subscription_status = "active"
                user.subscription_plan = plan
            db.commit()

    # ── subscription.created
    elif event_type == "subscription.created":
        user = _find_user(db, data)
        if user:
            user.paddle_customer_id = data.get("customer_id", user.paddle_customer_id)
            user.paddle_subscription_id = data.get("id")
            user.subscription_status = data.get("status", "active")
            user.subscription_plan = _plan_from_items(data.get("items", []))
            db.commit()
        else:
            logger.warning("subscription.created – could not find user: %s", data)

    # ── subscription.updated (plan change, renewal, pause, etc.)
    elif event_type == "subscription.updated":
        subscription_id = data.get("id")
        user = (
            db.query(User)
            .filter(User.paddle_subscription_id == subscription_id)
            .first()
        ) or _find_user(db, data)

        if user:
            user.subscription_status = data.get("status", user.subscription_status)
            user.subscription_plan = _plan_from_items(data.get("items", []))
            if not user.paddle_subscription_id:
                user.paddle_subscription_id = subscription_id
            db.commit()

    # ── subscription.canceled
    elif event_type == "subscription.canceled":
        subscription_id = data.get("id")
        user = (
            db.query(User)
            .filter(User.paddle_subscription_id == subscription_id)
            .first()
        ) or _find_user(db, data)

        if user:
            user.subscription_status = "canceled"
            db.commit()

    # ── subscription.past_due (payment failed but retrying)
    elif event_type == "subscription.past_due":
        subscription_id = data.get("id")
        user = (
            db.query(User)
            .filter(User.paddle_subscription_id == subscription_id)
            .first()
        )
        if user:
            user.subscription_status = "past_due"
            db.commit()

    return {"status": "success"}
