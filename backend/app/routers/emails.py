from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import get_db
from app.models import SharedEmail, Team, User
from app.schemas import SharedEmailCreate, SharedEmailOut

router = APIRouter(prefix="/api/emails", tags=["emails"])


@router.post("/", response_model=SharedEmailOut, status_code=status.HTTP_201_CREATED)
def share_email(
    payload: SharedEmailCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    team = db.query(Team).filter(Team.id == payload.team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if current_user not in team.members:
        raise HTTPException(status_code=403, detail="Not a member of this team")

    email = SharedEmail(
        subject=payload.subject,
        sender=payload.sender,
        body=payload.body,
        tag=payload.tag,
        shared_by=current_user.id,
        team_id=payload.team_id,
    )
    db.add(email)
    db.commit()
    db.refresh(email)
    return email


@router.get("/team/{team_id}", response_model=list[SharedEmailOut])
def list_team_emails(
    team_id: str,
    tag: str | None = Query(None),
    search: str | None = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if current_user not in team.members:
        raise HTTPException(status_code=403, detail="Not a member of this team")

    query = db.query(SharedEmail).filter(SharedEmail.team_id == team_id)
    if tag:
        query = query.filter(SharedEmail.tag == tag)
    if search:
        query = query.filter(
            SharedEmail.subject.ilike(f"%{search}%")
            | SharedEmail.body.ilike(f"%{search}%")
            | SharedEmail.sender.ilike(f"%{search}%")
        )
    return query.order_by(SharedEmail.created_at.desc()).all()


@router.get("/{email_id}", response_model=SharedEmailOut)
def get_email(
    email_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    email = db.query(SharedEmail).filter(SharedEmail.id == email_id).first()
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    team = db.query(Team).filter(Team.id == email.team_id).first()
    if current_user not in team.members:
        raise HTTPException(status_code=403, detail="Not a member of this team")
    return email


@router.delete("/{email_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_email(
    email_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    email = db.query(SharedEmail).filter(SharedEmail.id == email_id).first()
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    if email.shared_by != current_user.id:
        raise HTTPException(status_code=403, detail="Only the sharer can delete")
    db.delete(email)
    db.commit()
