from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime
import hmac
import hashlib

from app.database import get_db
from app.models import User

router = APIRouter()

PADDLE_WEBHOOK_SECRET = "your_paddle_webhook_secret"


def verify_paddle_webhook(request_body: bytes, signature: str) -> bool:
    h = hmac.new(PADDLE_WEBHOOK_SECRET.encode(), request_body, hashlib.sha256)
    return hmac.compare_digest(h.hexdigest(), signature)


@router.post("/paddle/webhook")
async def paddle_webhook(request: Request, db: Session = Depends(get_db)):
    body = await request.body()
    signature = request.headers.get("paddle-signature")
    
    if not verify_paddle_webhook(body, signature):
        raise HTTPException(status_code=401, detail="Invalid signature")
    
    event = await request.json()
    event_type = event.get("event_type")
    data = event.get("data", {})
    
    if event_type == "subscription.created":
        customer_email = data.get("customer", {}).get("email")
        subscription_id = data.get("id")
        customer_id = data.get("customer_id")
        
        items = data.get("items", [])
        plan = "starter"
        if items:
            price_id = items[0].get("price", {}).get("id")
            if "pro" in price_id.lower():
                plan = "pro"
            elif "enterprise" in price_id.lower():
                plan = "enterprise"
        
        user = db.query(User).filter(User.email == customer_email).first()
        if user:
            user.paddle_customer_id = customer_id
            user.paddle_subscription_id = subscription_id
            user.subscription_status = "active"
            user.subscription_plan = plan
            db.commit()
    
    elif event_type == "subscription.updated":
        subscription_id = data.get("id")
        status = data.get("status")
        
        user = db.query(User).filter(User.paddle_subscription_id == subscription_id).first()
        if user:
            user.subscription_status = status
            db.commit()
    
    elif event_type == "subscription.canceled":
        subscription_id = data.get("id")
        
        user = db.query(User).filter(User.paddle_subscription_id == subscription_id).first()
        if user:
            user.subscription_status = "canceled"
            db.commit()
    
    return {"status": "success"}
