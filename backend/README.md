# Coach Nati — Backend API

Express API for the Coach Nati coaching platform.

## Setup

```bash
npm install
npm run dev
```

Server runs on `http://localhost:4000` by default.

## Structure

- `src/server.js` — entry point
- `src/routes/` — API route groups (auth, clients, programs, payments, content)
- `src/data/` — JSON file persistence layer (replaceable with a real DB later)

## Environment

Copy `.env.example` to `.env`:

```
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```
