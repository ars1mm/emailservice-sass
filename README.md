# EmailShare

A simple SaaS to share important emails across teams (engineering, product, design, etc.).

## Architecture

| Layer    | Stack                          |
| -------- | ------------------------------ |
| Frontend | Next.js 14 + Chakra UI         |
| Backend  | Python / FastAPI + SQLAlchemy  |
| Database | SQLite (swap to Postgres easily) |
| Auth     | JWT (Bearer tokens)            |

## Quick Start

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows (or `source venv/bin/activate` on Mac/Linux)
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API runs on **http://localhost:8000**. Docs at **/docs**.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on **http://localhost:3000**. API calls are proxied to the backend via `next.config.js` rewrites.

## Features

- **Auth** — register, login, JWT sessions
- **Teams** — create teams, invite members by email, remove members
- **Share Emails** — paste subject/sender/body, tag them (urgent, fyi, action-required, bug, feature)
- **Search & Filter** — full-text search + tag filters on shared emails
- **Clean UI** — Chakra-based responsive design

## API Endpoints

| Method | Path                              | Description            |
| ------ | --------------------------------- | ---------------------- |
| POST   | `/api/auth/register`              | Create account         |
| POST   | `/api/auth/login`                 | Get JWT token          |
| GET    | `/api/auth/me`                    | Current user           |
| GET    | `/api/teams/`                     | List user's teams      |
| POST   | `/api/teams/`                     | Create team            |
| GET    | `/api/teams/:id`                  | Team details           |
| POST   | `/api/teams/:id/members`          | Add member             |
| DELETE | `/api/teams/:id/members/:userId`  | Remove member          |
| DELETE | `/api/teams/:id`                  | Delete team            |
| POST   | `/api/emails/`                    | Share an email         |
| GET    | `/api/emails/team/:teamId`        | List team emails       |
| GET    | `/api/emails/:id`                 | Get single email       |
| DELETE | `/api/emails/:id`                 | Delete shared email    |
