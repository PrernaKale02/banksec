# BankSec AI — Insider Threat Detection System

AI-powered insider threat detection for banking institutions. Monitors employee activity, detects anomalies using ML, and alerts security teams in real time.

## Project Structure

```
BANKSEC AI/
├── frontend/         → Admin Dashboard (React + Vite)      → port 5173
├── backend/          → API Server (Python FastAPI)          → port 8000
└── bank-portal/      → Simulated Bank Employee Portal       → port 5174
```

All three talk to the **same backend**. The bank portal sends activity logs, the admin dashboard reads them.

---

## How to Run

### 1. Backend (FastAPI — Port 8000)

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
python seed_data.py          # Seed the database (run once)
uvicorn main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### 2. Frontend — Admin Dashboard (Port 5173)

```bash
cd frontend
npm install
npm run dev
```

Opens at: http://localhost:5173

### 3. Bank Portal — Employee Simulation (Port 5174)

```bash
cd bank-portal
npm install
npm run dev
```

Opens at: http://localhost:5174

---

## Git Branches

| Branch | Owner | What |
|--------|-------|------|
| `main` | Leader | Foundation + merged code |
| `feature/member-b` | Member B | Dashboard + Employee APIs & pages |
| `feature/member-c` | Member C | Alerts + Cases + Logs APIs & pages |
| `feature/member-d` | Member D | Analytics + Settings + ML engine |
| `feature/bank-portal` | Portal member | Bank employee portal website |

**Rule:** Each member works only in their assigned files. Check the team plan for your file list.

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Recharts, Framer Motion
- **Backend:** Python, FastAPI, SQLAlchemy, SQLite
- **ML:** Scikit-learn (Isolation Forest), NumPy, Pandas
