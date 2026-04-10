# 🛡️ BankSec AI — Insider Threat Detection System

> **AI-Powered Early Warning System for Banking Cybersecurity**
>
> BankSec AI is an intelligent insider threat detection platform designed for banking institutions. It continuously monitors employee activity logs, identifies abnormal behavior patterns using machine learning, and generates real-time, explainable alerts for security teams — enabling early detection of insider fraud before major damage occurs.

---

## 📌 Problem Statement

Insider fraud and privileged-access misuse are among the most difficult cybersecurity threats to detect in banking environments. Employees already hold legitimate access to internal systems, making malicious actions nearly indistinguishable from normal activity. Traditional monitoring generates excessive false positives, manual investigations are slow, and legacy systems lack advanced behavioral analytics.

**BankSec AI solves this** by providing an intelligent, automated monitoring layer that learns normal behavior, flags deviations, and equips investigators with actionable, explainable alerts.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Security Dashboard** | Real-time overview with KPIs — total monitored users, active alerts, high-risk users, and suspicious activity counts with interactive timeline charts. |
| **Employee Monitoring** | Searchable employee table with risk scores, status badges, and a slide-out behavioral profile panel showing login patterns, access history, and anomalies. |
| **AI Risk Alerts** | Alert cards with color-coded severity, AI-generated detection reasons (explainable AI), filterable by status (Open / Investigating / Resolved). |
| **Behavior Analytics** | Visual dashboards with top risky employees bar chart, anomaly type distribution, and AI-generated heatmap insights. |
| **Investigation Cases** | Case management table for tracking fraud investigations with case IDs, assigned investigators, risk scores, and status tracking. |
| **System Logs** | Terminal-style raw audit log viewer with severity-colored log entries (CRITICAL / WARNING / ERROR / INFO), search, and export. |
| **Settings Console** | Configurable risk thresholds (High / Medium sliders), toggleable anomaly detection models (Behavioral Drift, Peer Outlier, Off-Hours Heuristics). |
| **Dynamic Risk Scoring** | Every user and alert is assigned a 0–100 risk score driving color coding and priority throughout the UI. |

---

## 🏗️ Architecture Overview

```
┌────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                      │
│  Dashboard │ Employees │ Alerts │ Analytics │ Cases │ Logs     │
└────────────────────────┬───────────────────────────────────────┘
                         │  REST API (JSON)
                         ▼
┌────────────────────────────────────────────────────────────────┐
│                     BACKEND (Python FastAPI)                    │
│                                                                │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │ Auth Module  │  │ CRUD Routes  │  │ AI / ML Engine        │  │
│  │ (JWT)        │  │ (Employees,  │  │ (Anomaly Detection,   │  │
│  │              │  │  Alerts,     │  │  Risk Scoring,        │  │
│  │              │  │  Cases, Logs)│  │  Behavioral Profiling)│  │
│  └─────────────┘  └──────────────┘  └───────────────────────┘  │
│                         │                                      │
│                    ┌────▼────┐                                  │
│                    │ SQLite  │  (demo) / PostgreSQL (prod)      │
│                    │   DB    │                                  │
│                    └─────────┘                                  │
└────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — Component-based UI
- **Vite 5** — Lightning-fast dev server and bundler
- **Tailwind CSS 3** — Utility-first styling with custom cybersecurity-themed design tokens
- **Framer Motion** — Smooth animations and transitions
- **Recharts** — Interactive data visualization (line charts, bar charts)
- **Lucide React** — Icon library
- **clsx + tailwind-merge** — Conditional class management

### Backend
- **Python 3.10+**
- **FastAPI** — High-performance async REST API framework
- **SQLAlchemy** — ORM for database operations
- **SQLite** — Lightweight database for demonstration (swappable to PostgreSQL)
- **Scikit-learn** — Machine learning for anomaly detection (Isolation Forest)
- **NumPy / Pandas** — Data manipulation for behavioral analytics
- **JWT (python-jose)** — Authentication tokens
- **Uvicorn** — ASGI server
- **Faker** — Realistic demo data seeding

---

## 📂 Project Structure

```
BANKSEC AI/
├── README.md                         # Project documentation
├── .gitignore
├── start_demo.bat                    # One-click demo launcher (Windows)
│
├── frontend/                         # React Frontend Application
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx                  # App entry point
│       ├── App.jsx                   # Root component with tab navigation
│       ├── index.css                 # Global styles + Tailwind directives
│       ├── api/                      # API client layer (connects to backend)
│       │   ├── apiClient.js
│       │   ├── dashboard.js
│       │   ├── employees.js
│       │   ├── alerts.js
│       │   ├── analytics.js
│       │   ├── cases.js
│       │   ├── logs.js
│       │   └── settings.js
│       ├── components/
│       │   └── layout/
│       │       ├── Layout.jsx
│       │       └── Sidebar.jsx
│       └── pages/
│           ├── DashboardOverview.jsx
│           ├── EmployeeMonitoring.jsx
│           ├── RiskAlerts.jsx
│           ├── BehaviorAnalytics.jsx
│           ├── InvestigationCases.jsx
│           ├── SystemLogs.jsx
│           └── Settings.jsx
│
└── backend/                          # Python FastAPI Backend
    ├── main.py                       # FastAPI application entry
    ├── requirements.txt              # Python dependencies
    ├── config.py                     # App configuration
    ├── database.py                   # SQLAlchemy engine & session
    ├── seed_data.py                  # Demo data seeder script
    ├── banksec.db                    # SQLite database (auto-generated)
    ├── models/                       # SQLAlchemy ORM models
    │   ├── __init__.py
    │   ├── employee.py
    │   ├── alert.py
    │   ├── case.py
    │   ├── log.py
    │   └── settings.py
    ├── schemas/                      # Pydantic request/response schemas
    │   ├── __init__.py
    │   ├── employee.py
    │   ├── alert.py
    │   ├── case.py
    │   ├── log.py
    │   └── settings.py
    ├── routes/                       # API route handlers
    │   ├── __init__.py
    │   ├── dashboard.py
    │   ├── employees.py
    │   ├── alerts.py
    │   ├── analytics.py
    │   ├── cases.py
    │   ├── logs.py
    │   └── settings.py
    └── ml/                           # Machine Learning engine
        ├── __init__.py
        ├── anomaly_detector.py
        └── risk_scorer.py
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **npm**
- **Python** 3.10+

### Option 1: One-Click Launch (Windows)
```bash
# Double-click or run from terminal:
start_demo.bat
```

### Option 2: Manual Launch

#### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```
Frontend available at `http://localhost:5173`

#### Backend
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Seed the database with demo data
python seed_data.py

# Start the API server
uvicorn main:app --reload --port 8000
```
API available at `http://localhost:8000`
Swagger docs at `http://localhost:8000/docs`

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard/stats` | Dashboard KPI statistics |
| `GET` | `/api/dashboard/timeline` | Anomaly timeline data |
| `GET` | `/api/dashboard/department-risk` | Department-wise risk scores |
| `GET` | `/api/employees` | List all employees (with search & filter) |
| `GET` | `/api/employees/{id}` | Get single employee profile + behavior data |
| `GET` | `/api/alerts` | List all alerts (filterable by status) |
| `POST` | `/api/alerts/{id}/investigate` | Move alert to "Investigating" status |
| `GET` | `/api/analytics/top-risky` | Top risky employees ranked by score |
| `GET` | `/api/analytics/anomaly-distribution` | Anomaly type distribution |
| `GET` | `/api/analytics/insights` | AI-generated behavioral insights |
| `GET` | `/api/cases` | List all investigation cases |
| `POST` | `/api/cases` | Create a new investigation case |
| `PATCH` | `/api/cases/{id}` | Update case status / assign investigator |
| `GET` | `/api/logs` | Get system logs (with search & level filter) |
| `GET` | `/api/settings` | Get current platform settings |
| `PUT` | `/api/settings` | Update risk thresholds & model toggles |
| `POST` | `/api/ml/detect-anomalies` | Run anomaly detection on recent activities |
| `GET` | `/api/ml/risk-score/{employee_id}` | Calculate real-time risk score for employee |

---

## 🤖 AI/ML Components

### Anomaly Detection
- **Algorithm**: Isolation Forest (scikit-learn)
- **Features analyzed**: Login hour, session duration, data download volume, access frequency, failed login count
- **Training**: Pre-fitted on historical "normal" behavior data at server startup
- **Output**: Anomaly flag (-1 = anomaly, 1 = normal) with confidence score

### Dynamic Risk Scoring
- **Multi-factor formula** combining:
  - Anomaly detection score (weight: 40%)
  - Off-hours activity flag (weight: 20%)
  - Data volume deviation from peer average (weight: 20%)
  - Failed login frequency (weight: 10%)
  - Access to restricted resources (weight: 10%)
- **Score range**: 0–100 (Low: 0–39, Medium: 40–79, High: 80–100)

### Explainable AI Alerts
- Each alert includes human-readable **detection reasons** explaining why the activity was flagged
- Example: `["Off-hours login at 02:13 AM", "Downloaded 500+ records in 10 minutes"]`

---

## 🎯 Use Cases for Demonstration

1. **Dashboard Overview** → Show real-time security posture of the bank
2. **Flag an Insider** → Open Employee Monitoring, click on a high-risk user, view anomalies
3. **AI Alert Investigation** → View Risk Alerts, read AI-generated reasons, click "Investigate"
4. **Open a Case** → Escalate an alert to a formal investigation case
5. **Review Audit Trail** → Check System Logs for raw evidence supporting alerts
6. **Tune the AI** → Adjust risk thresholds and toggle detection models in Settings

---

## 👥 Team

- **Project**: BankSec AI — Insider Threat Detection System
- **Domain**: Banking Cybersecurity & Fraud Prevention
- **Category**: AI/ML + Full-Stack Web Application

---

## 📄 License

This project is developed for academic/demonstration purposes.
