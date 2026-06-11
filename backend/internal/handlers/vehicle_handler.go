package handlers

import (
	"net/http"
	"time"

	"geofencing/internal/database"
	"geofencing/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateVehicleRequest struct {
	VehicleNumber string `json:"vehicle_number" binding:"required"`
	DriverName    string `json:"driver_name" binding:"required"`
	VehicleType   string `json:"vehicle_type" binding:"required"`
	Phone         string `json:"phone" binding:"required"`
}

// POST /vehicles
func CreateVehicle(c *gin.Context) {

	start := time.Now()

	var req CreateVehicleRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   err.Error(),
			"time_ns": time.Since(start).Nanoseconds(),
		})
		return
	}

	vehicle := models.Vehicle{
		ID:            "veh_" + uuid.New().String()[:8],
		VehicleNumber: req.VehicleNumber,
		DriverName:    req.DriverName,
		VehicleType:   req.VehicleType,
		Phone:         req.Phone,
		Status:        "active",
		CreatedAt:     time.Now(),
	}

	if err := database.DB.Create(&vehicle).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to create vehicle",
			"time_ns": time.Since(start).Nanoseconds(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"id":             vehicle.ID,
		"vehicle_number": vehicle.VehicleNumber,
		"status":         vehicle.Status,
		"time_ns":        time.Since(start).Nanoseconds(),
	})
}

// GET /vehicles
func GetVehicles(c *gin.Context) {

	start := time.Now()

	var vehicles []models.Vehicle

	if err := database.DB.Find(&vehicles).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch vehicles",
			"time_ns": time.Since(start).Nanoseconds(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"vehicles": vehicles,
		"time_ns":  time.Since(start).Nanoseconds(),
	})
}
