from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import requests

router = APIRouter()

PADDLE_API_KEY = os.getenv("PADDLE_API_KEY")
PADDLE_API_URL = "https://sandbox-api.paddle.com"


class CheckoutRequest(BaseModel):
    price_id: str
    customer_email: str = "test@example.com"


@router.post("/api/checkout/create")
async def create_checkout(request: CheckoutRequest):
    """Create a Paddle checkout session and return the URL"""
    
    headers = {
        "Authorization": f"Bearer {PADDLE_API_KEY}",
        "Content-Type": "application/json",
        "Paddle-Version": "1"
    }
    
    payload = {
        "items": [
            {
                "price_id": request.price_id,
                "quantity": 1
            }
        ],
        "customer": {
            "email": request.customer_email
        }
    }
    
    response = requests.post(
        f"{PADDLE_API_URL}/transactions",
        headers=headers,
        json=payload
    )
    
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.json()
        )
    
    data = response.json()
    checkout_url = data.get("data", {}).get("checkout", {}).get("url")
    
    if not checkout_url:
        raise HTTPException(status_code=500, detail="Failed to get checkout URL")
    
    return {"checkout_url": checkout_url}
