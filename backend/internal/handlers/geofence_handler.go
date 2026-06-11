package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"geofencing/internal/database"
	"geofencing/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type GeofenceRequest struct {
	Name        string      `json:"name"`
	Description string      `json:"description"`
	Coordinates [][]float64 `json:"coordinates"`
	Category    string      `json:"category"`
}

func CreateGeofence(c *gin.Context) {

	start := time.Now()

	var req GeofenceRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   err.Error(),
			"time_ns": time.Since(start).Nanoseconds(),
		})
		return
	}

	validCategories := map[string]bool{
		"delivery_zone":   true,
		"restricted_zone": true,
		"toll_zone":       true,
		"customer_area":   true,
	}

	if !validCategories[req.Category] {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "invalid category",
			"time_ns": time.Since(start).Nanoseconds(),
		})
		return
	}

	coordinatesJSON, _ := json.Marshal(req.Coordinates)

	geofence := models.Geofence{
		ID:          "geo_" + uuid.New().String()[:8],
		Name:        req.Name,
		Description: req.Description,
		Coordinates: string(coordinatesJSON),
		Category:    req.Category,
		CreatedAt:   time.Now(),
	}

	database.DB.Create(&geofence)

	c.JSON(http.StatusCreated, gin.H{
		"id":      geofence.ID,
		"name":    geofence.Name,
		"status":  "active",
		"time_ns": time.Since(start).Nanoseconds(),
	})
}

func GetGeofences(c *gin.Context) {

	start := time.Now()

	var geofences []models.Geofence

	database.DB.Find(&geofences)

	c.JSON(http.StatusOK, gin.H{
		"geofences": geofences,
		"time_ns":   time.Since(start).Nanoseconds(),
	})
}
