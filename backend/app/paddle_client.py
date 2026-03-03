import requests
from app.config import settings


def check_paddle_subscription(email: str) -> dict:
    """Check if email has active subscription via Paddle API"""
    if not settings.PADDLE_API_KEY:
        return {"status": "inactive", "plan": "free"}
    
    headers = {"Authorization": f"Bearer {settings.PADDLE_API_KEY}"}
    
    # Search for customer by email
    try:
        response = requests.get(
            f"{settings.PADDLE_API_URL}/customers",
            headers=headers,
            params={"email": email}
        )
        response.raise_for_status()
        customers = response.json().get("data", [])
        
        if not customers:
            return {"status": "inactive", "plan": "free"}
        
        customer_id = customers[0]["id"]
        
        # Get active subscriptions
        sub_response = requests.get(
            f"{settings.PADDLE_API_URL}/subscriptions",
            headers=headers,
            params={"customer_id": customer_id, "status": "active"}
        )
        sub_response.raise_for_status()
        subscriptions = sub_response.json().get("data", [])
        
        if subscriptions:
            sub = subscriptions[0]
            return {
                "status": sub.get("status", "active"),
                "plan": _extract_plan(sub),
                "subscription_id": sub.get("id")
            }
        
        return {"status": "inactive", "plan": "free"}
    
    except Exception:
        return {"status": "inactive", "plan": "free"}


def _extract_plan(subscription: dict) -> str:
    """Extract plan name from subscription items"""
    items = subscription.get("items", [])
    price_to_plan = {
        settings.PADDLE_STARTER_PRICE_ID: "starter",
        settings.PADDLE_PRO_PRICE_ID: "pro",
        settings.PADDLE_ENTERPRISE_PRICE_ID: "enterprise"
    }
    
    for item in items:
        price_id = item.get("price", {}).get("id", "")
        if price_id in price_to_plan:
            return price_to_plan[price_id]
    
    return "starter"
