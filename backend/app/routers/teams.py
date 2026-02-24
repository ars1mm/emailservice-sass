from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import insert

from app.auth import get_current_user
from app.database import get_db
from app.models import Team, User, team_members
from app.schemas import TeamCreate, TeamOut, TeamMemberAdd, UserOut

router = APIRouter(prefix="/api/teams", tags=["teams"])


@router.post("/", response_model=TeamOut, status_code=status.HTTP_201_CREATED)
def create_team(
    payload: TeamCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    team = Team(
        name=payload.name,
        description=payload.description,
        owner_id=current_user.id,
    )
    db.add(team)
    db.flush()
    # Add creator as owner member
    db.execute(
        insert(team_members).values(
            user_id=current_user.id, team_id=team.id, role="owner"
        )
    )
    db.commit()
    db.refresh(team)
    return team


@router.get("/", response_model=list[TeamOut])
def list_teams(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return current_user.teams


@router.get("/{team_id}", response_model=TeamOut)
def get_team(
    team_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if current_user not in team.members:
        raise HTTPException(status_code=403, detail="Not a member of this team")
    return team


@router.post("/{team_id}/members", response_model=TeamOut)
def add_member(
    team_id: str,
    payload: TeamMemberAdd,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if team.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the owner can add members")

    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user in team.members:
        raise HTTPException(status_code=400, detail="User already in team")

    db.execute(
        insert(team_members).values(
            user_id=user.id, team_id=team.id, role=payload.role
        )
    )
    db.commit()
    db.refresh(team)
    return team


@router.delete("/{team_id}/members/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_member(
    team_id: str,
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if team.owner_id != current_user.id and current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    db.execute(
        team_members.delete().where(
            (team_members.c.user_id == user_id) & (team_members.c.team_id == team_id)
        )
    )
    db.commit()


@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team(
    team_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if team.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the owner can delete the team")
    db.delete(team)
    db.commit()
