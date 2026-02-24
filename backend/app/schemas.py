from datetime import datetime
from pydantic import BaseModel, EmailStr


# ── Auth ──────────────────────────────────────────────
class UserCreate(BaseModel):
    email: str
    name: str
    password: str


class UserOut(BaseModel):
    id: str
    email: str
    name: str
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: str
    password: str


# ── Teams ─────────────────────────────────────────────
class TeamCreate(BaseModel):
    name: str
    description: str = ""


class TeamOut(BaseModel):
    id: str
    name: str
    description: str
    owner_id: str
    created_at: datetime
    members: list[UserOut] = []

    class Config:
        from_attributes = True


class TeamMemberAdd(BaseModel):
    email: str
    role: str = "member"


# ── Shared Emails ─────────────────────────────────────
class SharedEmailCreate(BaseModel):
    subject: str
    sender: str
    body: str
    tag: str = "general"
    team_id: str


class SharedEmailOut(BaseModel):
    id: str
    subject: str
    sender: str
    body: str
    tag: str
    shared_by: str
    team_id: str
    created_at: datetime
    shared_by_user: UserOut | None = None

    class Config:
        from_attributes = True
