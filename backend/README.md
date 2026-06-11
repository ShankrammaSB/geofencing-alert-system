# Geofencing Alert System - Backend

## Overview

The backend service is built using Go, Gin, GORM, and PostgreSQL. It provides REST APIs for vehicle management, geofence management, location tracking, violation detection, and real-time WebSocket alerts.

## Features

* Vehicle Management APIs
* Geofence Management APIs
* Vehicle Location Tracking
* Geofence Entry/Exit Detection
* Violation Logging
* Real-Time WebSocket Alerts
* PostgreSQL Database Integration
* Docker Support

## Tech Stack

* Go
* Gin Framework
* GORM
* PostgreSQL
* Gorilla WebSocket
* Docker

## Project Structure

cmd/
internal/
├── database/
├── handlers/
├── models/
├── services/
├── utils/
└── websocket/

## Setup

### Install Dependencies

go mod tidy

### Configure Environment

Create a `.env` file:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=geofence_db

### Run PostgreSQL

docker compose up -d postgres

### Start Backend

go run ./cmd

Backend runs on:

http://localhost:8080

## API Endpoints

### Vehicles

GET /vehicles

POST /vehicles

### Geofences

GET /geofences

POST /geofences

### Locations

POST /vehicles/location

GET /locations

### Violations

GET /violations

### States

GET /states

### Alerts

GET /ws/alerts

### Health Check

GET /health

## WebSocket Alerts

Connect:

ws://localhost:8080/ws/alerts

Events:

* entry
* exit

## Docker

Build and Run:

docker compose up --build

## Author

Shankramma Bhagashetti
