from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import requests

from app.config import settings

router = APIRouter(tags=["checkout"])

PADDLE_API_URL = "https://sandbox-api.paddle.com"


class CheckoutRequest(BaseModel):
    price_id: str
    customer_email: Optional[str] = None
    user_id: Optional[str] = None


@router.post("/api/checkout/create")
async def create_checkout(request: CheckoutRequest):
    """Create a Paddle Billing transaction with custom_data linking the
    purchase to our internal user.  The frontend should call
    Paddle.Checkout.open({ transactionId }) with the returned ID.
    """

    headers = {
        "Authorization": f"Bearer {settings.PADDLE_API_KEY}",
        "Content-Type": "application/json",
    }

    payload: dict = {
        "items": [
            {
                "price_id": request.price_id,
                "quantity": 1,
            }
        ],
    }

    # Attach the user's email so Paddle knows who is paying
    if request.customer_email:
        payload["customer"] = {"email": request.customer_email}

    # custom_data is returned in every webhook so we can always find the user
    if request.user_id or request.customer_email:
        payload["custom_data"] = {
            "user_id": request.user_id or "",
            "email": request.customer_email or "",
        }

    response = requests.post(
        f"{PADDLE_API_URL}/transactions",
        json=payload,
        headers=headers,
    )

    data = response.json()

    if response.status_code in (200, 201):
        transaction_id = data["data"]["id"]
        return {"transaction_id": transaction_id}
    else:
        raise HTTPException(
            status_code=response.status_code,
            detail=data.get("error", {}).get("detail", "Failed to create transaction"),
        )
