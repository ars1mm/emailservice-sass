from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "EmailShare"
    DATABASE_URL: str = "sqlite:///./emailshare.db"
    SECRET_KEY: str = "change-me-in-production-use-a-real-secret"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    TEST_MODE: bool = False

    # Paddle
    PADDLE_API_KEY: str = ""
    PADDLE_API_URL: str = "https://sandbox-api.paddle.com"
    PADDLE_WEBHOOK_SECRET: str = ""
    PADDLE_STARTER_PRICE_ID: str = ""
    PADDLE_PRO_PRICE_ID: str = ""
    PADDLE_ENTERPRISE_PRICE_ID: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
