# Project Structure

## Overview
EmailShare follows a monorepo structure with separate frontend and backend applications, along with deployment scripts and configuration files.

## Directory Structure

```
email-share/
├── backend/              # Python FastAPI backend application
│   ├── app/             # Main application package
│   │   ├── routers/     # API route handlers
│   │   ├── __init__.py  # Package initialization
│   │   ├── auth.py      # Authentication utilities (JWT, password hashing)
│   │   ├── config.py    # Configuration management
│   │   ├── database.py  # Database connection and session management
│   │   ├── main.py      # FastAPI application entry point
│   │   ├── models.py    # SQLAlchemy ORM models
│   │   ├── schemas.py   # Pydantic schemas for request/response validation
│   │   └── subscription.py # Subscription/payment logic
│   ├── Dockerfile       # Docker container configuration
│   ├── render.yaml      # Render.com deployment config
│   ├── requirements.txt # Python dependencies
│   └── runtime.txt      # Python runtime version
│
├── frontend/            # Next.js 14 frontend application
│   ├── src/            # Source code
│   │   ├── app/        # Next.js App Router pages and layouts
│   │   ├── components/ # React components
│   │   ├── config/     # Frontend configuration
│   │   └── lib/        # Utility libraries and helpers
│   ├── .next/          # Next.js build output (generated)
│   ├── next.config.js  # Next.js configuration (API proxy setup)
│   ├── next-env.d.ts   # Next.js TypeScript declarations
│   ├── package.json    # Node.js dependencies and scripts
│   ├── pnpm-lock.yaml  # Package manager lock file
│   └── tsconfig.json   # TypeScript configuration
│
├── scripts/            # Deployment and setup automation
│   ├── .env.example    # Environment variables template
│   ├── create-paddle-products.js    # Paddle payment setup
│   ├── create-render-services.js    # Render.com service creation
│   ├── render-deploy.js             # Deployment automation
│   └── setup-paddle-webhook.js      # Webhook configuration
│
├── .amazonq/           # Amazon Q AI assistant rules
│   └── rules/
│       └── memory-bank/ # Project documentation for AI context
│
├── .env                # Environment variables (local)
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore patterns
├── README.md           # Project documentation
├── RENDER_DEPLOYMENT.md # Deployment guide
└── render.yaml         # Root-level Render.com config
```

## Core Components

### Backend Architecture

**FastAPI Application (app/main.py)**
- Entry point for the backend API
- Configures CORS middleware for frontend communication
- Registers API routers for different resource endpoints
- Serves OpenAPI documentation at `/docs`

**Database Layer (app/database.py)**
- SQLAlchemy engine and session management
- Database connection pooling
- Session dependency injection for routes
- Supports SQLite (development) and PostgreSQL (production)

**Models (app/models.py)**
- SQLAlchemy ORM models for database tables
- User, Team, TeamMember, SharedEmail entities
- Relationships and foreign key constraints
- Database schema definitions

**Schemas (app/schemas.py)**
- Pydantic models for request validation
- Response serialization schemas
- Type safety and data validation
- API contract definitions

**Authentication (app/auth.py)**
- JWT token generation and validation
- Password hashing with bcrypt
- Bearer token authentication
- User authorization utilities

**Routers (app/routers/)**
- Modular API endpoint handlers
- Separate routers for auth, teams, emails, checkout
- RESTful API design patterns
- Request/response handling

### Frontend Architecture

**Next.js App Router (src/app/)**
- File-based routing system
- Server and client components
- Layout components for consistent UI
- Page components for different routes

**React Components (src/components/)**
- Reusable UI components
- Chakra UI integration
- Form components and validation
- Navigation and layout components

**Configuration (src/config/)**
- API endpoint configuration
- Environment-specific settings
- Feature flags and constants

**Utilities (src/lib/)**
- Helper functions and utilities
- API client functions
- Data transformation logic
- Shared business logic

## Architectural Patterns

### Backend Patterns
- **Layered Architecture**: Separation of concerns (routes → business logic → data access)
- **Dependency Injection**: Database sessions injected into route handlers
- **Repository Pattern**: Models encapsulate data access logic
- **DTO Pattern**: Pydantic schemas for data transfer between layers
- **Middleware Pattern**: CORS and authentication middleware

### Frontend Patterns
- **Component-Based Architecture**: Reusable React components
- **Server-Side Rendering**: Next.js SSR for improved performance
- **API Proxy Pattern**: Next.js rewrites proxy API calls to backend
- **Atomic Design**: Components organized by complexity level
- **State Management**: React hooks for local state

### Communication
- **RESTful API**: Standard HTTP methods and status codes
- **JSON Serialization**: All data exchanged in JSON format
- **JWT Authentication**: Stateless authentication with Bearer tokens
- **CORS**: Cross-origin resource sharing for frontend-backend communication

## Data Flow
1. User interacts with React components in the frontend
2. Frontend makes HTTP requests to Next.js API routes
3. Next.js proxies requests to FastAPI backend
4. FastAPI validates requests using Pydantic schemas
5. Route handlers process business logic
6. SQLAlchemy models interact with the database
7. Responses serialized using Pydantic schemas
8. JSON responses sent back through the chain
9. Frontend updates UI based on response data
