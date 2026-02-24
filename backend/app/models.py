import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    Text,
    Table,
)
from sqlalchemy.orm import relationship

from app.database import Base


def generate_uuid() -> str:
    return str(uuid.uuid4())


# Association table: team <-> user (many-to-many)
team_members = Table(
    "team_members",
    Base.metadata,
    Column("user_id", String, ForeignKey("users.id"), primary_key=True),
    Column("team_id", String, ForeignKey("teams.id"), primary_key=True),
    Column("role", String, default="member"),  # owner | admin | member
    Column("joined_at", DateTime, default=datetime.utcnow),
)


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    teams = relationship("Team", secondary=team_members, back_populates="members")
    shared_emails = relationship("SharedEmail", back_populates="shared_by_user")


class Team(Base):
    __tablename__ = "teams"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    description = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(String, ForeignKey("users.id"), nullable=False)

    members = relationship("User", secondary=team_members, back_populates="teams")
    shared_emails = relationship("SharedEmail", back_populates="team")


class SharedEmail(Base):
    __tablename__ = "shared_emails"

    id = Column(String, primary_key=True, default=generate_uuid)
    subject = Column(String, nullable=False)
    sender = Column(String, nullable=False)
    body = Column(Text, nullable=False)
    tag = Column(String, default="general")  # e.g. urgent, fyi, action-required
    shared_by = Column(String, ForeignKey("users.id"), nullable=False)
    team_id = Column(String, ForeignKey("teams.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    shared_by_user = relationship("User", back_populates="shared_emails")
    team = relationship("Team", back_populates="shared_emails")
