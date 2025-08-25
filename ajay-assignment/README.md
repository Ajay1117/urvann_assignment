# Urvann – Mini Plant Store

Full-stack assignment implementing a mini plant store with React + Vite + Tailwind (frontend) and Node.js + Express + MongoDB + Mongoose (backend).

Spec: https://docs.google.com/document/u/0/d/1GhOKBWIRv0FKBq_OkOKEe0_CBxn7V0q7KktgR7-Kn2s/mobilebasic

## Tech Stack
- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript, Mongoose, Zod
- DB: MongoDB

## Features
- Plant catalog grid with name, price, categories, and stock availability
- Search by name or category keyword (case-insensitive)
- Filter by category and stock availability
- Admin: Add Plant form with validation
- Loading and error states
- Responsive UI

## Local Setup

### 1) Backend
```bash
cd server
cp .env .env.local 2>/dev/null || true
# Ensure MONGODB_URI is correct in .env (defaults to mongodb://localhost:27017/urvann_plants)

npm run build
npm run dev
```
- Health check: GET http://localhost:4000/health
- APIs:
  - GET http://localhost:4000/api/plants?q=...&category=...&available=true|false&page=1&limit=20
  - POST http://localhost:4000/api/plants
    - body: { name: string, price: number, categories: string[], available: boolean }

### 2) Seed Database
```bash
cd server
npm run seed
```
This loads ~60 plants with realistic categories.

If you don't have MongoDB locally, install quickly:
- macOS (Homebrew): `brew install mongodb-community@7.0` and start: `mongod --config /opt/homebrew/etc/mongod.conf` (or `brew services start mongodb-community@7.0` if services is available)
- Or use MongoDB Atlas and update `MONGODB_URI` in `server/.env`.

### 3) Frontend
```bash
cd client
# set API base if backend is not on localhost:4000
# echo "VITE_API_BASE=http://localhost:4000" > .env.local
npm run dev
```
Open http://localhost:5173

## Deployment
- Backend: Render/Fly.io/railway.app with MongoDB (Atlas)
- Frontend: Vercel/Netlify
- Set env var `MONGODB_URI` on backend and `VITE_API_BASE` on frontend

## Notes
- Code is modular with models, controllers, and routes.
- Validation via Zod; Mongoose schema enforces constraints.
- Tailwind for a clean, responsive UI.
