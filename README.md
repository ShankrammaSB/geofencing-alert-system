# 🚀 Geofencing Alert System

A real-time geofencing and vehicle monitoring platform built using Go, PostgreSQL, Next.js, WebSockets, and Docker.

## 📌 Overview

This system tracks vehicle locations, detects geofence entry and exit events, stores violations, and provides real-time alerts through WebSockets.

Users can monitor vehicles, geofences, violations, and live tracking activity through a responsive dashboard.

---

## ✨ Features

### Backend

- Vehicle Management APIs
- Geofence Management APIs
- Vehicle Location Tracking
- Geofence Entry/Exit Detection
- Violation Logging
- Real-Time WebSocket Alerts
- PostgreSQL Integration
- Docker Support

### Frontend

- Dashboard Overview
- Vehicle Monitoring
- Geofence Monitoring
- Violation History
- Live Alert Notifications
- Interactive Map Visualization
- Responsive UI

---

## 🛠 Tech Stack

### Backend

- Go
- Gin
- GORM
- PostgreSQL
- Gorilla WebSocket
- Docker

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- React Leaflet

---

## 📂 Project Structure

```text
geofencing-alert-system/
│
├── backend/
│   ├── cmd/
│   ├── internal/
│   └── README.md
│
├── frontend/
│   ├── src/
│   └── README.md
│
├── screenshots/
│
└── README.md
```

---

## 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Vehicles

![Vehicles](screenshots/vehicles.png)

### Geofences

![Geofences](screenshots/geofences.png)

### Violations

![Violations](screenshots/violations.png)

### Live Alerts

![Live Alerts](screenshots/live-alerts.png)

### Map

![Map](screenshots/map.png)

---

## ⚙️ Backend Setup

```bash
cd backend

go mod tidy

docker compose up -d postgres

go run ./cmd
```

Backend:

```text
http://localhost:8080
```

---

## ⚙️ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## 🔌 WebSocket

Connect:

```text
ws://localhost:8080/ws/alerts
```

Events:

- entry
- exit

---

## API Endpoints

### Vehicles

```http
GET /vehicles
POST /vehicles
```

### Geofences

```http
GET /geofences
POST /geofences
```

### Locations

```http
GET /locations
POST /vehicles/location
```

### Violations

```http
GET /violations
```

### Alerts

```http
GET /ws/alerts
```

### Health

```http
GET /health
```

---

## 👨‍💻 Author

**Shankramma Bhagashetti**

MCA Graduate | Python Developer | AI/ML Enthusiast