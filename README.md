# NetPulse — Network Uptime & Latency Monitor
> A lightweight network monitoring tool inspired by Cisco ThousandEyes.
---

## The Problem
Cisco ThousandEyes is the industry gold standard for enterprise network observability. To truly understand how such powerful platforms work under the hood, we built NetPulse—a micro-observability tool for local environments. It serves as a hands-on engineering project to master the core mechanics of multi-layer network probing, automated telemetry, and time-series latency tracking.
--

## What NetPulse Does
- 🟢 **Endpoint Monitoring** — Tracks status and health of various protocol-based URLs
- 📉 **Latency Logging** — Stores every response time in MySQL as time-series data
- 🔴 **Visual Alerts** — Real-time UI state changes (green/red) to signal server health instantly
- 📊 **Interactive Dashboard** — Visualizes current health status and latency trends
---
## Tech Stack
**Backend — Node.js + Express**
Non-blocking I/O makes it ideal for scheduling concurrent pings without
the server choking under load.
**Database — MySQL**
Structured time-series logging with relational integrity. Every ping
result is stored with a timestamp so we can reconstruct exactly when
and how long a server was down.
**Frontend — Vanilla JavaScript, HTML, CSS**
No framework overhead. We built DOM manipulation and state management
from scratch to actually understand how it works.
---
## Architecture Overview
User clicks Ping on Dashboard
        |
        v
Frontend (HTML + Vanilla JS)
        |
        | HTTP POST /api/heartbeat
        v
Node.js + Express Backend
        |
        | Parses request, measures response time
        v
Pinger Logic (http module)
        |
        | Sends request to target URL
        v
Target Server (google.com / cisco.com / any URL)
        |
        | Returns response or times out
        v
MySQL Logger
        |
        | Saves status + latency + timestamp to DB
        v
REST API GET /api/monitors
        |
        | Sends updated data back to frontend
        v
Dashboard updates in real time
---
## What We Learned
- How HTTP health checks behave at the socket and protocol level
- Designing a time-series database schema — fundamentally different from standard CRUD
- Running background schedulers in Node.js without blocking the main thread
- Why response time variance matters more than just UP/DOWN status
- Collaborating on a shared codebase using Git branches and pull requests
---
## Run It Locally
**Requirements:** Node.js + MySQL (XAMPP works fine)
```bash
# Step 1 — Database setup
# Open phpMyAdmin
# Create database: network_observability
# Run the schema file at /backend/database.sql
# Step 2 — Start the backend
cd backend
npm install
node src/server.js
```
**Step 3 — Open the dashboard**
Open `frontend/index.html` in your browser.
Click the "Ping" button on any card to simulate a network check
and watch the latency graph update in real time.
---
## Known Limitations
- No user authentication — anyone with the URL can add monitors
- Health checks are manually triggered — architecture is designed to
  support automated cron-job polling as a next step
- Visual alerts only — no email or Slack notifications yet
- Monitors are seeded directly in the database, no UI form to add
  new URLs yet
---
## Inspiration
This project was directly inspired by reading about Cisco's $1 billion
acquisition of ThousandEyes — a platform that monitors network paths
and application performance at a global scale. NetPulse is our ground-up
attempt to understand the core problem ThousandEyes solves.
