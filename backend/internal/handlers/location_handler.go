package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"geofencing/internal/database"
	"geofencing/internal/models"
	"geofencing/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type LocationRequest struct {
	VehicleID string  `json:"vehicle_id"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

func UpdateVehicleLocation(c *gin.Context) {

	start := time.Now()

	var req LocationRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   err.Error(),
			"time_ns": time.Since(start).Nanoseconds(),
		})
		return
	}

	// Check vehicle exists
	var vehicle models.Vehicle

	if err := database.DB.First(&vehicle, "id = ?", req.VehicleID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "vehicle not found",
			"time_ns": time.Since(start).Nanoseconds(),
		})
		return
	}

	location := models.Location{
		ID:        "loc_" + uuid.New().String()[:8],
		VehicleID: req.VehicleID,
		Latitude:  req.Latitude,
		Longitude: req.Longitude,
		Timestamp: time.Now(),
	}

	database.DB.Create(&location)

	// Check all geofences
	var geofences []models.Geofence
	database.DB.Find(&geofences)

	for _, geofence := range geofences {

		var polygon [][]float64

		json.Unmarshal(
			[]byte(geofence.Coordinates),
			&polygon,
		)

		isInside := utils.IsPointInsidePolygon(
			req.Latitude,
			req.Longitude,
			polygon,
		)

		var state models.GeofenceState

		err := database.DB.
			Where(
				"vehicle_id = ? AND geofence_id = ?",
				req.VehicleID,
				geofence.ID,
			).
			First(&state).Error

		if err != nil {

			state = models.GeofenceState{
				ID:         uuid.New().String(),
				VehicleID:  req.VehicleID,
				GeofenceID: geofence.ID,
				IsInside:   isInside,
			}

			database.DB.Create(&state)
			continue
		}

		// ENTRY
		if !state.IsInside && isInside {

			violation := models.Violation{
				ID:         uuid.New().String(),
				VehicleID:  req.VehicleID,
				GeofenceID: geofence.ID,
				EventType:  "entry",
				Latitude:   req.Latitude,
				Longitude:  req.Longitude,
				Timestamp:  time.Now(),
			}

			database.DB.Create(&violation)
		}

		// EXIT
		if state.IsInside && !isInside {

			violation := models.Violation{
				ID:         uuid.New().String(),
				VehicleID:  req.VehicleID,
				GeofenceID: geofence.ID,
				EventType:  "exit",
				Latitude:   req.Latitude,
				Longitude:  req.Longitude,
				Timestamp:  time.Now(),
			}

			database.DB.Create(&violation)
		}

		fmt.Println(
			"Vehicle:",
			req.VehicleID,
			"Previous:",
			state.IsInside,
			"Current:",
			isInside,
		)

		state.IsInside = isInside
		database.DB.Save(&state)
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "location updated",
		"location_id": location.ID,
		"time_ns":     time.Since(start).Nanoseconds(),
	})
}
