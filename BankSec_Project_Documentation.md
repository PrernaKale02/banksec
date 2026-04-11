# BankSec AI — Insider Threat Detection System

## 1. Project Overview
**BankSec AI** is an advanced, AI-powered insider threat detection system tailored specifically for banking and financial institutions. By continuously monitoring internal employee activities, the system identifies anomalous behaviors, data exfiltration attempts, and unauthorized access. It utilizes unsupervised Machine Learning models to score risk in real-time, instantly notifying corporate security teams if abnormal operations occur.

## 2. Multi-Tiered System Architecture

The project is structured into three main interoperating applications:

### A. API Server & AI Engine (Backend)
- **Role:** Central point of ingestion for event logs and data served to the Dashboard. It contains the logic for anomaly detection, real-time risk scoring, and email notifications.
- **Port:** `8000`

### B. Security Admin Dashboard (Frontend)
- **Role:** The command center for security personnel to monitor network activity, triage active threat cases, analyze employee risk profiles, and investigate audit logs.
- **Port:** `5173`

### C. Bank Internal Portal (Live Simulation)
- **Role:** A simulated bank intranet used by employees to access payroll, HR files, or customer data. During demos, this acts as the "source of truth", generating real-time activity logs.
- **Port:** `5174` (or sometimes simulated on `3000`)

---

## 3. Comprehensive Technology Stack

The project relies on a modern, high-performance tech suite suitable for data-intensive anomaly detection pipelines:

### Frontend Technologies (Admin Dashboard & Simulation Portal)
- **React 18:** Core UI library leveraging concurrent mode.
- **Vite:** High-speed development server and bundler.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI styling, enabling the signature dark data-center aesthetics.
- **Framer Motion:** High-fidelity animation library, responsible for critical threat alert pulse effects and smooth page transitions.
- **Recharts:** Composable charting library handling real-time data viz, department risk heatmaps, and anomaly timeline spikes.
- **Lucide React & Heroicons:** Scalable vector icon systems.

### Backend & Core Services
- **FastAPI (Python):** Asynchronous ASGI framework for building high-concurrency API architectures.
- **SQLAlchemy:** Python SQL toolkit and Object Relational Mapper (ORM), used alongside a relational database (SQLite for local testing/development) for persistent storage of logs, alerts, users, and cases.
- **Pydantic:** Data validation and settings management via Python type annotations.
- **Uvicorn:** Lightning-fast ASGI server serving the FastAPI backend.
- **FastAPI-Mail / SMTPlib:** Integrated backend service for firing real-world email alerts to admins immediately upon extreme risk detection.

### Machine Learning Engine
- **Scikit-learn:** Core machine learning hub. The system primarily relies on the **Isolation Forest** algorithmic model, ideal for unsupervised anomaly detection without requiring purely labeled "fraud/not-fraud" datasets.
- **Pandas:** Used for shaping logged behavioral data into measurable dimension spaces (like standard deviation arrays, scaling data volumes).
- **NumPy:** Handling high-speed numerical array manipulations, underlying the ML detection process.

---

## 4. Key Workflows & Real-Time Concepts

The application's core feature set relies heavily on a real-time event ingestion and detection loop. 

### I. The Activity Logging Pipeline
Every user interaction on the Bank Internal Portal silently sends an event to the API:
```json
POST /api/activity/log
{
    "employee_id": "EMP-023",
    "action": "BULK_DATA_EXPORT",
    "details": "Exported 15,000 customer records",
    "timestamp": "2026-04-10T02:13:00Z",
    "ip_address": "192.168.1.50",
    "data_volume_mb": 1200
}
```

### II. The AI Anomaly Detection Core
Once a request drops into `POST /api/activity/log`:
1. **Ingestion:** Raw log is securely etched to the `SystemLogs` relational database table.
2. **Analysis:** The ML Pipeline examines the payload. It analyzes standard deviation behavior for this exact user. For example: *"Is it normal for a data analyst to export 1.2 GB of data at 2:13 AM outside standard IP scopes?"*
3. **Evaluation:** The Isolation Forest evaluates the data point's isolation from typical network clusters.
4. **Scoring:** If classified as anomalous, the backend formulates a `risk_score` (e.g. 92/100).
5. **Mitigation Trigger:** The system commits the "Critical Alert" state to the DB and fires SMTP alerts to security personnel.

### III. Dynamic Polling & Live UI Updates
To ensure the Security Dashboard maintains live accuracy, it is engineered to use persistent **interval polling** (refresh checks every ~3 seconds on `/api/dashboard/*` routes).
When an anomaly clears the backend evaluation pipeline, the UI immediately shifts state:
- Anomaly Timeline Charts spike.
- Active "Red Alerts" counters jump and begin pulse animations via Framer Motion.
- Toast UI notifications slide in with employee details over-riding the screen context.
- The IT Department heatmap turns severe red, indicating high aggregated department risk.

## 5. Team Delegation & Branches
The project embodies clear git separation protocols to prevent conflicts across teams:
- `main`: Aggregated release / Foundation
- `feature/member-b`: Handles Dashboard statistics & Employee data endpoints.
- `feature/member-c`: Oversees Alert cases & System Log APIs.
- `feature/member-d`: Integrates Machine Learning models, Settings, & Analytical computations.
- `feature/bank-portal`: Dedicated solely to the bank-simulation frontend.
