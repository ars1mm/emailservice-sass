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
    
    # Generate Paddle Checkout URL for sandbox
    checkout_url = f"https://sandbox-buy.paddle.com/checkout/custom/{request.price_id}?guest_email={request.customer_email}"
    
    return {"checkout_url": checkout_url}
