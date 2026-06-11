package handlers

import (
	"encoding/json"
	"net/http"

	"geofencing/internal/database"
	"geofencing/internal/models"
	"geofencing/internal/utils"

	"github.com/gin-gonic/gin"
)

func TestGeofence(c *gin.Context) {

	var geofence models.Geofence

	if err := database.DB.First(&geofence).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "No geofence found",
		})
		return
	}

	var polygon [][]float64

	json.Unmarshal([]byte(geofence.Coordinates), &polygon)

	inside := utils.IsPointInsidePolygon(
		37.7799,
		-122.4144,
		polygon,
	)

	c.JSON(http.StatusOK, gin.H{
		"inside": inside,
	})
}
