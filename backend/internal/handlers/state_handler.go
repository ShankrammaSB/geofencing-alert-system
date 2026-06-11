package handlers

import (
	"geofencing/internal/database"
	"geofencing/internal/models"

	"github.com/gin-gonic/gin"
)

func GetStates(c *gin.Context) {

	var states []models.GeofenceState

	database.DB.Find(&states)

	c.JSON(200, gin.H{
		"states": states,
	})
}
