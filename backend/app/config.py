from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "EmailShare"
    DATABASE_URL: str = "sqlite:///./emailshare.db"
    SECRET_KEY: str = "change-me-in-production-use-a-real-secret"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    class Config:
        env_file = ".env"


settings = Settings()
