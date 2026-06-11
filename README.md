# Geofencing Real-Time Alert System

## Overview

A real-time geofencing system built using Go, Gin, PostgreSQL, Docker, and GORM.

The system allows:

* Vehicle registration
* Geofence creation
* Vehicle location tracking
* Point-in-polygon detection
* Entry and exit event detection
* Violation history tracking
* Dockerized deployment

---

## Tech Stack

Backend:

* Go
* Gin
* GORM

Database:

* PostgreSQL

Containerization:

* Docker
* Docker Compose

---

## Features

### Vehicle Management

* Create Vehicle
* List Vehicles

### Geofence Management

* Create Geofence
* List Geofences

### Location Tracking

* Update Vehicle Location

### Geofence Detection

* Point-In-Polygon using Ray Casting Algorithm

### Event Detection

* Entry Detection
* Exit Detection

### Violation Tracking

* Entry History
* Exit History

---

## API Endpoints

### Health Check

GET /health

### Vehicles

POST /vehicles

GET /vehicles

### Geofences

POST /geofences

GET /geofences

### Location Updates

POST /vehicles/location

### Violations

GET /violations

### Geofence State

GET /states

---

## Running Locally

```bash
cd backend
go run ./cmd
```

---

## Running with Docker

```bash
docker compose up --build
```

---

## Architecture

Vehicle → Location Update → Geofence Detection → Entry/Exit Event → Violation Storage

---

## Future Improvements

* WebSocket Alerts
* Live Dashboard
* Authentication
* Real-time Vehicle Tracking Map
* Frontend Dashboard
