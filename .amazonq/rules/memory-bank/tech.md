# Technology Stack

## Programming Languages

### Backend
- **Python 3.x**: Primary backend language
- **SQL**: Database queries via SQLAlchemy ORM

### Frontend
- **TypeScript 5.3.3**: Type-safe JavaScript for frontend development
- **JavaScript**: Configuration files and scripts
- **JSX/TSX**: React component syntax

## Backend Stack

### Core Framework
- **FastAPI 0.109.0**: Modern, fast web framework for building APIs
  - Automatic OpenAPI documentation
  - Built-in request validation
  - Async support
  - High performance

### Web Server
- **Uvicorn 0.27.0**: ASGI server for running FastAPI applications
  - Hot reload during development
  - Production-ready performance

### Database
- **SQLAlchemy 2.0.25**: SQL toolkit and ORM
  - Database abstraction layer
  - ORM for object-relational mapping
  - Migration support via Alembic
- **Alembic 1.13.1**: Database migration tool
- **SQLite**: Development database (default)
- **PostgreSQL**: Production database (configurable)

### Authentication & Security
- **python-jose[cryptography] 3.3.0**: JWT token generation and validation
- **passlib[bcrypt] 1.7.4**: Password hashing with bcrypt algorithm
- **python-multipart 0.0.6**: Form data and file upload handling

### Data Validation
- **Pydantic 2.5.3**: Data validation using Python type annotations
- **pydantic-settings 2.1.0**: Settings management from environment variables

### HTTP Client
- **requests 2.31.0**: HTTP library for external API calls (Paddle integration)

## Frontend Stack

### Core Framework
- **Next.js 16.1.5**: React framework with server-side rendering
  - App Router for file-based routing
  - API routes and rewrites
  - Server and client components
  - Built-in optimization

### UI Framework
- **React 18.2.0**: Component-based UI library
- **React DOM 18.2.0**: React rendering for web

### UI Component Library
- **Chakra UI 2.8.2**: Accessible component library
  - @chakra-ui/react: Core components
  - @chakra-ui/icons 2.1.1: Icon components
  - @emotion/react 11.11.0: CSS-in-JS styling
  - @emotion/styled 11.11.0: Styled components
  - framer-motion 11.0.3: Animation library

### Additional UI Libraries
- **react-icons 5.0.1**: Popular icon library
- **react-fast-marquee 1.6.5**: Scrolling text component
- **recharts 3.7.0**: Charting library for data visualization

### Development Tools
- **TypeScript 5.3.3**: Static type checking
- **ESLint 8.56.0**: Code linting
- **eslint-config-next 14.1.0**: Next.js ESLint configuration

### Type Definitions
- **@types/node 20.11.10**: Node.js type definitions
- **@types/react 18.2.48**: React type definitions
- **@types/react-dom 18.2.18**: React DOM type definitions

## Build Systems & Package Managers

### Backend
- **pip**: Python package installer
- **venv**: Python virtual environment
- **requirements.txt**: Dependency specification

### Frontend
- **pnpm**: Fast, disk space efficient package manager
- **npm**: Alternative package manager (also supported)
- **Next.js Build System**: Webpack-based bundler with optimizations

## Development Commands

### Backend Development
```bash
# Setup virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Activate virtual environment (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run development server with hot reload
uvicorn app.main:app --reload

# Run production server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend Development
```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev

# Build for production
npm run build
# or
pnpm build

# Start production server
npm start
# or
pnpm start

# Run linter
npm run lint
# or
pnpm lint
```

## API Documentation
- **OpenAPI/Swagger**: Automatic API documentation at `/docs`
- **ReDoc**: Alternative API documentation at `/redoc`

## Deployment

### Containerization
- **Docker**: Container platform for backend deployment
- **Dockerfile**: Backend container configuration

### Cloud Platform
- **Render.com**: Cloud hosting platform
  - Web services for backend and frontend
  - PostgreSQL database hosting
  - Automatic deployments from Git
  - Environment variable management

### Configuration Files
- **render.yaml**: Service definitions for Render.com
- **.env**: Environment variables (local development)
- **.env.example**: Environment variable template

## Payment Integration
- **Paddle**: Payment processing platform
  - Sandbox environment for testing
  - Checkout API integration
  - Webhook support for subscription events

## Environment Variables

### Backend
- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: JWT signing secret
- `PADDLE_API_KEY`: Paddle API authentication
- `PADDLE_WEBHOOK_SECRET`: Webhook signature verification

### Frontend
- `NEXT_PUBLIC_API_URL`: Backend API base URL
- API proxy configured in next.config.js for development

## Version Control
- **Git**: Source control
- **.gitignore**: Excludes build artifacts, dependencies, environment files
