# Development Guidelines

## Code Quality Standards

### Python Backend Standards

**Import Organization**
- Standard library imports first
- Third-party imports second (FastAPI, SQLAlchemy, Pydantic, etc.)
- Local application imports last
- Alphabetical ordering within each group
- Example:
```python
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import get_db
from app.models import Team, User
```

**Naming Conventions**
- Snake_case for functions, variables, and module names: `get_current_user`, `create_access_token`, `team_members`
- PascalCase for classes: `User`, `Team`, `SharedEmail`, `UserCreate`, `TeamOut`
- UPPER_CASE for constants: `API_BASE`, `PADDLE_API_KEY`, `PADDLE_API_URL`
- Descriptive names that convey purpose: `hash_password`, `verify_password`, `get_bearer_token`

**Type Annotations**
- Always include type hints for function parameters and return values
- Use modern Python typing syntax (e.g., `list[TeamOut]` instead of `List[TeamOut]`)
- Example:
```python
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    # implementation
```

**Docstrings**
- Use triple-quoted strings for docstrings
- Keep them concise and descriptive
- Focus on what the function does, not how
- Example:
```python
async def create_checkout(request: CheckoutRequest):
    """Create a Paddle checkout session and return the URL"""
```

**Code Formatting**
- Use 4 spaces for indentation (no tabs)
- Maximum line length: flexible, but keep readable
- Blank lines: 2 between top-level definitions, 1 between methods
- Windows-style line endings (CRLF) for consistency with project

### TypeScript Frontend Standards

**Import Organization**
- React imports first
- Third-party library imports second
- Local imports last (components, config, lib)
- Use `@/` path alias for src directory
- Example:
```typescript
import React, { createContext, useContext, useEffect, useState } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { api } from './api'
import { AuthProvider } from '@/lib/auth'
import Navbar from '@/components/Navbar'
```

**Naming Conventions**
- camelCase for variables and functions: `user`, `loading`, `testCheckout`, `getTeams`
- PascalCase for components, interfaces, and types: `AuthProvider`, `User`, `AuthContextType`
- UPPER_CASE for constants: `API_BASE`
- Descriptive names: `useAuth`, `createTeam`, `shareEmail`

**Type Safety**
- Define interfaces for all data structures
- Use TypeScript's type system extensively
- Avoid `any` type when possible (use sparingly for API responses during development)
- Example:
```typescript
interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
}
```

**Component Structure**
- Use functional components with hooks
- Client components marked with `'use client'` directive at the top
- Props destructuring in function parameters
- Example:
```typescript
'use client'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  )
}
```

## Architectural Patterns

### Backend Patterns

**Router-Based Architecture**
- Organize endpoints into separate router modules by resource
- Use APIRouter with prefix and tags for organization
- Example:
```python
router = APIRouter(prefix="/api/auth", tags=["auth"])
router = APIRouter(prefix="/api/teams", tags=["teams"])
```

**Dependency Injection**
- Use FastAPI's Depends for database sessions and authentication
- Consistent pattern across all endpoints:
```python
def create_team(
    payload: TeamCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
```

**Pydantic Schema Pattern**
- Separate schemas for input (Create) and output (Out)
- Use `from_attributes = True` in Config for ORM compatibility
- Example:
```python
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
```

**Database Session Management**
- Generator pattern for database sessions
- Always close sessions in finally block:
```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

**UUID Generation**
- Use string-based UUIDs for all primary keys
- Consistent helper function:
```python
def generate_uuid() -> str:
    return str(uuid.uuid4())
```

**Error Handling**
- Use HTTPException for all API errors
- Include appropriate status codes and detail messages
- Example:
```python
if not team:
    raise HTTPException(status_code=404, detail="Team not found")
if team.owner_id != current_user.id:
    raise HTTPException(status_code=403, detail="Only the owner can delete the team")
```

**Authentication Pattern**
- JWT tokens with Bearer scheme
- OAuth2PasswordBearer for token extraction
- Centralized authentication dependency:
```python
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    # Validate token and return user
```

**SQLAlchemy ORM Patterns**
- Use declarative_base for model definitions
- Relationships defined with `relationship()` and `back_populates`
- Association tables for many-to-many relationships
- Default values using callables: `default=generate_uuid`, `default=datetime.utcnow`
- Example:
```python
class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    teams = relationship("Team", secondary=team_members, back_populates="members")
```

### Frontend Patterns

**Context API for State Management**
- Use React Context for global state (authentication)
- Custom hooks for context consumption
- Example:
```typescript
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  // ...
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

**API Client Pattern**
- Centralized API client with reusable request function
- Automatic token injection from localStorage
- Consistent error handling
- Example:
```typescript
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || res.statusText)
  }
  
  if (res.status === 204) return undefined as T
  return res.json()
}
```

**Next.js App Router Structure**
- File-based routing in `src/app/`
- Shared layout in `layout.tsx`
- Providers wrapper for global context
- Server and client component separation

**Chakra UI Theme Configuration**
- Extended theme with custom colors and fonts
- Dark mode by default
- Consistent color palette using brand colors
- Example:
```typescript
const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  styles: {
    global: {
      body: {
        bg: '#09090b',
        color: '#ededed',
      },
    },
  },
  fonts: {
    heading: `'var(--font-outfit)', sans-serif`,
    body: `'var(--font-outfit)', sans-serif`,
  },
})
```

## Common Code Idioms

### Backend Idioms

**Database Query Pattern**
```python
# Single record with error handling
team = db.query(Team).filter(Team.id == team_id).first()
if not team:
    raise HTTPException(status_code=404, detail="Team not found")

# List of records
teams = db.query(Team).filter(Team.owner_id == user_id).all()

# Using relationships
return current_user.teams  # Access related data through ORM relationships
```

**Database Insert Pattern**
```python
# Create and add
team = Team(name=payload.name, description=payload.description, owner_id=current_user.id)
db.add(team)
db.flush()  # Get ID before commit if needed

# Association table insert
db.execute(
    insert(team_members).values(
        user_id=current_user.id, team_id=team.id, role="owner"
    )
)

db.commit()
db.refresh(team)  # Reload from database
return team
```

**Authorization Pattern**
```python
# Check membership
if current_user not in team.members:
    raise HTTPException(status_code=403, detail="Not a member of this team")

# Check ownership
if team.owner_id != current_user.id:
    raise HTTPException(status_code=403, detail="Only the owner can add members")

# Multiple conditions
if team.owner_id != current_user.id and current_user.id != user_id:
    raise HTTPException(status_code=403, detail="Not authorized")
```

**JWT Token Creation**
```python
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
```

**Password Hashing**
```python
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)
```

### Frontend Idioms

**Token Storage and Retrieval**
```typescript
// Store token after login
localStorage.setItem('token', access_token)

// Retrieve token for API calls
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

// Clear token on logout
localStorage.removeItem('token')
```

**useEffect for Initial Data Loading**
```typescript
useEffect(() => {
  const token = localStorage.getItem('token')
  if (token) {
    api
      .me()
      .then(setUser)
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false))
  } else {
    setLoading(false)
  }
}, [])
```

**Async/Await Pattern**
```typescript
const login = async (email: string, password: string) => {
  const { access_token } = await api.login({ email, password })
  localStorage.setItem('token', access_token)
  const me = await api.me()
  setUser(me)
}
```

**Query String Building**
```typescript
const params = new URLSearchParams()
if (tag) params.set('tag', tag)
if (search) params.set('search', search)
const qs = params.toString()
return request<any[]>(`/emails/team/${teamId}${qs ? `?${qs}` : ''}`)
```

## Configuration Management

### Backend Configuration
- Use pydantic-settings for environment variable management
- Centralized config in `app/config.py`
- Settings accessed via `settings` object
- Example pattern:
```python
from app.config import settings

engine = create_engine(settings.DATABASE_URL, connect_args=connect_args)
jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
```

### Frontend Configuration
- Environment variables prefixed with `NEXT_PUBLIC_` for client-side access
- API proxy configured in `next.config.js` using rewrites
- Site configuration in `src/config/site.ts`
- Example:
```javascript
async rewrites() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  return [
    {
      source: "/api/:path*",
      destination: `${apiUrl}/api/:path*`,
    },
  ];
}
```

## Database Patterns

**SQLite Development Configuration**
```python
connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False

engine = create_engine(settings.DATABASE_URL, connect_args=connect_args)
```

**Session Configuration**
```python
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

**Many-to-Many Relationships**
```python
# Association table
team_members = Table(
    "team_members",
    Base.metadata,
    Column("user_id", String, ForeignKey("users.id"), primary_key=True),
    Column("team_id", String, ForeignKey("teams.id"), primary_key=True),
    Column("role", String, default="member"),
    Column("joined_at", DateTime, default=datetime.utcnow),
)

# Model relationships
teams = relationship("Team", secondary=team_members, back_populates="members")
members = relationship("User", secondary=team_members, back_populates="teams")
```

## Testing and Development

**Test Mode Pattern**
- Stateless test mode for development without database
- JWT tokens with embedded user data
- Example:
```python
if not settings.TEST_MODE:
    raise HTTPException(status_code=403, detail="Test mode is not enabled")

token = _create_token({
    "sub": f"test-user-{uuid.uuid4().hex[:8]}",
    "email": "test@emailshare.dev",
    "name": "Test User",
    "subscription_status": "active",
    "subscription_plan": plan,
})
```

## API Design Principles

**RESTful Conventions**
- Use appropriate HTTP methods: GET, POST, DELETE
- Resource-based URLs: `/api/teams/`, `/api/teams/{id}`
- Nested resources: `/api/teams/{id}/members`
- Status codes: 200 (OK), 201 (Created), 204 (No Content), 404 (Not Found), 403 (Forbidden)

**Response Models**
- Always specify response_model in route decorators
- Use status_code parameter for non-200 responses
- Example:
```python
@router.post("/", response_model=TeamOut, status_code=status.HTTP_201_CREATED)
@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
```

**Endpoint Organization**
- Group related endpoints in router modules
- Use consistent naming: `create_`, `get_`, `list_`, `delete_`, `update_`
- Include current_user dependency for protected routes

## Security Practices

**Password Security**
- Always hash passwords with bcrypt
- Never store plain text passwords
- Use passlib's CryptContext

**JWT Security**
- Include expiration time in tokens
- Store secret key in environment variables
- Validate tokens on every protected request

**Authorization Checks**
- Verify user membership before allowing access
- Check ownership for destructive operations
- Return 403 for authorization failures, 404 for not found

**CORS Configuration**
- Explicitly list allowed origins
- Enable credentials for cookie/token support
- Example:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://emailservice-sass.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
