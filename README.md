# ⏱️ Time Tracker

A full-stack app for managing tasks and timers: users register, log in, create timers, start/pause them, and see time totals for today, this week and all time.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React (Create React App) |
| Backend | Node.js, Express, JWT auth middleware, bcrypt password hashing |
| Database | PostgreSQL 13 (via Docker Compose), Knex migrations |

## API

| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | `/auth/register` | – | Create an account |
| POST | `/auth/login` | – | Log in |
| POST | `/timers` | ✅ | Create a timer |
| POST | `/timers/:id/start` | ✅ | Start a timer |
| POST | `/timers/:id/pause` | ✅ | Pause a timer |
| GET | `/timers/:id/total` | ✅ | Total tracked time |
| GET | `/timers/:id/today` | ✅ | Time tracked today |
| GET | `/timers/:id/weekly` | ✅ | Time tracked this week |

> Mount prefix for the timer routes is set in `backend/server.js`.

## Getting started

```bash
git clone https://github.com/mani17S/time-tracker.git
cd time-tracker

# 1. configure the database credentials (never commit the real .env)
cp .env.example .env        # then fill in TEST_USER / TEST_PASSWORD / TEST_DB, and set JWT_SECRET to a long random string (e.g. `openssl rand -hex 32`)

# 2. start PostgreSQL
docker compose up -d

# 3. backend
npm install                  # root deps (knex, pg, dotenv)
cd backend && npm install
npx knex migrate:latest --knexfile ../knexfile.js
node server.js              # http://localhost:5000

# 4. frontend (new terminal)
cd frontend && npm install && npm start
```

## Project structure

```
backend/
  api/{routes,controllers,middleware,models}
  db/migrations      # users, timers, sessions tables
  server.js
frontend/src         # React app
docker-compose.yml   # PostgreSQL
```

## Roadmap

- [ ] Backend test coverage (Jest is configured)
- [ ] Containerise backend and frontend
- [ ] CI workflow: lint + tests on every PR
