# BankSec AI — Live Demo Simulation Plan

## The Demo Idea

> On **one laptop**, two browser tabs are open side by side:
> - **Left tab**: A bank employee (the insider) is using the bank's internal portal
> - **Right tab**: The BankSec AI admin dashboard is monitoring everything
>
> The employee starts downloading massive amounts of customer data. **Within seconds**, the admin dashboard lights up with a red alert, risk score spikes, and an email notification arrives on the admin's phone.

This creates a **"wow" moment** for the audience — they see the fraud happening on one side and the AI catching it on the other side, live.

---

## Architecture for the Demo

```
┌──────────────────────────┐         ┌──────────────────────────┐
│   TAB 1 (Left Side)      │         │   TAB 2 (Right Side)     │
│                          │         │                          │
│   Bank Internal Portal   │         │   BankSec AI Dashboard   │
│   (Simulated Bank App)   │         │   (Admin Monitoring)     │
│                          │         │                          │
│   Employee logs in →     │         │   ← Live alert appears   │
│   Views customer data →  │         │   ← Risk score spikes    │
│   Downloads bulk data →  │         │   ← Email sent to admin  │
│                          │         │                          │
└──────────┬───────────────┘         └──────────┬───────────────┘
           │                                    │
           │  POST /api/activity/log            │  GET /api/dashboard/* 
           │  (every action sends a log)        │  (polls every 3 seconds)
           │                                    │
           ▼                                    ▼
┌────────────────────────────────────────────────────────────────┐
│                   SHARED BACKEND (FastAPI)                      │
│                                                                │
│   ┌─────────────────┐    ┌─────────────────┐    ┌───────────┐  │
│   │ Activity Logger  │───▶│ ML Anomaly      │───▶│ Alert     │  │
│   │ (receives logs)  │    │ Detector        │    │ Generator │  │
│   └─────────────────┘    └─────────────────┘    └─────┬─────┘  │
│                                                       │        │
│                                              ┌────────▼──────┐ │
│                                              │ Email Service │ │
│                                              │ (SMTP / Gmail)│ │
│                                              └───────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

---

## Component 1: Simulated Bank Internal Portal

### What is it?
A **simple, realistic-looking web app** that pretends to be a bank's internal employee system. It doesn't need to be complex — just enough screens to tell a story.

### Pages needed:

#### Login Page
- Employee enters their Employee ID (e.g., `EMP-023`) and password
- Looks like a real corporate bank login (bank logo, dark professional theme)
- On login → sends a log to backend: *"EMP-023 logged in at 2:13 AM"*

#### Dashboard / Home
- Shows a welcome screen: *"Welcome, Bob Johnson — Data Analyst, IT Department"*
- Shows quick links: "Customer Records", "Financial Reports", "HR Files"
- Simple, looks like an intranet
- On page load → sends a log: *"EMP-023 accessed employee dashboard"*

#### Customer Records Page
- A table showing fake customer data (names, account numbers, balances)
- Has buttons: "View Details", "Export Selected", **"Export All Records"**
- Browsing is normal → sends low-priority logs
- Clicking **"Export All Records"** → sends a critical log: *"EMP-023 initiated bulk export of 15,000 customer records"*

#### Download Progress (the dramatic moment)
- When "Export All Records" is clicked, show a progress bar: *"Downloading 15,000 records... 23%... 67%... 100%"*
- During this, send **multiple activity logs** in rapid succession to the backend
- This is what triggers the anomaly detection on the admin side

### Key design decisions:
- This portal runs on a **different port** (e.g., `localhost:3000`) from the main dashboard (`localhost:5173`)
- It can be a very simple standalone HTML/React app — doesn't need to be complex
- It shares the **same backend** as the admin dashboard
- **Every action** the user takes silently sends a log entry to the backend via API

---

## Component 2: Activity Logging Pipeline

### How the Bank Portal talks to BankSec AI

Every action on the Bank Portal sends a **POST request** to the backend:

```
POST /api/activity/log
{
    "employee_id": "EMP-023",
    "action": "BULK_DATA_EXPORT",
    "details": "Exported 15,000 customer records",
    "timestamp": "2026-04-10T02:13:00Z",
    "ip_address": "192.168.1.50",
    "resource": "Customer Database",
    "data_volume_mb": 1200
}
```

### What the backend does when it receives this log:

```
Step 1: Save the raw log to SystemLogs table
              ↓
Step 2: Feed the activity data into the ML Anomaly Detector
              ↓
Step 3: Is it an anomaly?
         ├── NO  → Do nothing, log is stored for history
         └── YES → Continue to Step 4
              ↓
Step 4: Calculate dynamic risk score for this employee
              ↓
Step 5: Create a new Alert in the database
         - action: "Bulk Data Export"
         - risk_score: 92
         - reasons: ["Off-hours login at 02:13 AM", 
                      "Data volume 1200MB (avg is 15MB)",
                      "Accessing customer database outside role scope"]
              ↓
Step 6: Update the employee's risk_score and risk_level in the DB
              ↓
Step 7: Send email notification to admin
              ↓
Step 8: Store a "notification" record for the dashboard to pick up
```

---

## Component 3: Real-Time Dashboard Updates

### How does the admin dashboard know something happened?

Two options (from simplest to most impressive):

### Option A: Polling (Simple, Reliable) ✅ Recommended for Demo
- The admin dashboard makes API calls **every 3 seconds** to check for new data
- When a new alert appears in the database, the next poll picks it up
- Dashboard smoothly updates with a **red flash animation** when a new alert arrives
- Simple to implement, no extra technology needed

### Option B: WebSocket (More Impressive, More Complex)
- Backend opens a WebSocket connection with the dashboard
- When a new alert is created, backend **instantly pushes** it to the dashboard
- Dashboard updates in real-time (sub-second)
- More impressive but requires WebSocket setup

### Recommendation:
**Use Polling (Option A)** — it's reliable, easy to implement, and for a 3-second interval the difference from WebSocket is negligible during a demo. The visual effect is the same.

### What changes on the dashboard when an anomaly is detected:

| Dashboard Element | What Happens |
|---|---|
| **"Active Alerts" counter** | Jumps from 14 → 15 with a pulse animation |
| **"High Risk Users" counter** | Jumps if a new user crosses the threshold |
| **Anomaly Timeline chart** | New spike appears at current hour |
| **Department Risk heatmap** | IT department bar extends further |
| **Alert notification bell** | Shows a red badge with count |
| **Toast popup** | Slides in: "🚨 CRITICAL: Bulk Data Export detected — EMP-023" |

---

## Component 4: Email Notifications

### How to send real emails during the demo:

**Simplest approach: Gmail SMTP**
- Use a Gmail account with an "App Password" (not the real password)
- Backend sends email using Python's `smtplib` or `fastapi-mail`
- Email goes to the admin's real email (can show it on phone during demo)

**Email content example:**
```
Subject: 🚨 [BankSec AI] CRITICAL ALERT — Insider Threat Detected

Employee: Bob Johnson (EMP-023)
Department: IT — Data Analyst
Time: 02:13 AM (Off-hours)

Suspicious Activity:
  • Bulk export of 15,000 customer records (1.2 GB)
  • Login from unusual IP: 192.168.1.50
  • Activity outside defined work hours

Risk Score: 92/100 (HIGH)
AI Detection Reasons:
  • Data volume is 80x above daily average
  • Off-hours access — employee typically works 09:00-17:00
  • Customer database is outside standard role access

Action Required: Login to BankSec AI Dashboard to investigate.
Dashboard: http://localhost:5173
```

### Alternative if Gmail doesn't work:
- Use **Mailtrap** (free tier) — catches emails in a test inbox you can show on screen
- Or just show a **popup/toast on the dashboard** saying "Email sent to admin@securebank.com"

---

## The Demo Script (Step by Step)

> This is the exact script you'd follow during a live presentation.

### Setup (before presentation):
1. Backend running on `localhost:8000`
2. Bank Portal running on `localhost:3000` (left side of screen)
3. BankSec AI Dashboard running on `localhost:5173` (right side of screen)
4. Both browser tabs visible side by side
5. Email app open on phone (to show email arriving)

### Act 1: "Normal Operations" (30 seconds)
1. **Narrator**: *"This is our bank's internal portal. Employees use this daily to access records."*
2. On the **Bank Portal** (left): Log in as `EMP-088 Diana Prince` (low-risk investment banker)
3. Browse customer records, view a few profiles
4. Show the **Admin Dashboard** (right): Everything is green and calm
5. **Narrator**: *"As you can see, normal activity doesn't trigger any alerts."*

### Act 2: "The Insider Threat" (60 seconds)
1. **Narrator**: *"Now let's see what happens when an employee goes rogue."*
2. On the **Bank Portal** (left): Log out. Log back in as `EMP-023 Bob Johnson`
3. **Narrator**: *"Notice — it's 2 AM. Bob is a data analyst logging in at an unusual hour."*
4. On the **Admin Dashboard** (right): A **yellow warning** may appear — off-hours login detected
5. On the **Bank Portal** (left): Navigate to "Customer Records"
6. Click **"Export All Records"** — progress bar starts: *"Downloading 15,000 records..."*
7. **Narrator**: *"Bob is now downloading the entire customer database."*

### Act 3: "AI Detection" (30 seconds)
1. On the **Admin Dashboard** (right): 
   - 🔴 **Alert counter spikes** with pulse animation
   - 🔴 **Toast notification** slides in: *"CRITICAL: Bulk Data Export — EMP-023"*
   - 🔴 **Timeline chart** shows a new spike
   - 🔴 **Department Risk** for IT shoots up
2. **Narrator**: *"Our AI detected the anomaly in real-time. Let me show you why it flagged this."*
3. Click on the alert → show the **AI Detection Reasons**: off-hours, data volume 80x above average, outside role scope
4. **Narrator**: *"These are explainable AI alerts — not a black box."*

### Act 4: "Response" (30 seconds)
1. Show the **email arriving** on phone
2. **Narrator**: *"The security team has already been notified via email."*
3. On the dashboard: Click **"Investigate"** on the alert
4. Open a new **Investigation Case** from the alert
5. **Narrator**: *"The case is now logged for the investigation team to review."*
6. Go to **System Logs** → show the raw audit trail of Bob's activity

---

## What Needs to Change in the Original Plan

### New components to add:

| Component | Description |
|---|---|
| **Bank Portal** (new mini web app) | Simple 3-4 page simulated bank internal portal |
| **Activity Logging API** (new endpoint) | `POST /api/activity/log` — receives and processes employee actions |
| **Anomaly Processing Pipeline** (backend logic) | When log received → run ML → create alert if anomaly → send email |
| **Email Service** (backend module) | Send real email alerts via SMTP/Gmail |
| **Dashboard Polling** (frontend change) | Dashboard auto-refreshes every 3 seconds to show live updates |
| **Alert Animations** (frontend change) | Pulse effects, toasts, badge counters when new alerts arrive |

### What does NOT change:
- All existing pages stay the same
- All existing API routes stay the same
- The team delegation plan stays the same (this demo work is additional polish in Stage 3)

### Suggested assignment:
- **Bank Portal app** → Can be built by the Leader in Stage 3, or delegated to one member as a mini side task
- **Activity pipeline + email** → Part of the backend, Leader builds this
- **Dashboard polling + animations** → Whoever owns the Dashboard page (Member B) adds polling

---

## Summary of Moving Parts

```
During Demo:

BANK PORTAL                  BACKEND                    ADMIN DASHBOARD
(Employee View)              (FastAPI)                  (Security View)
                                                        
Login as EMP-023  ──POST──▶  Log saved                 
                             ML: normal login at 2AM    
                             → Warning alert created  ──▶  ⚠️ Small warning
                                                        
Browse records    ──POST──▶  Log saved                 
                             ML: normal browsing        
                                                        
EXPORT ALL DATA   ──POST──▶  Log saved                 
                             ML: 🚨 ANOMALY!            
                             Risk score: 92             
                             Alert created             ──▶  🔴 CRITICAL ALERT!
                             Email sent                ──▶  📧 Phone notification
                             Employee risk updated     ──▶  📊 Charts update
```
