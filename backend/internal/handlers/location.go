package handlers

import (
	"geofencing/internal/database"
	"geofencing/internal/models"

	"github.com/gin-gonic/gin"
)

func GetLocations(c *gin.Context) {

	var locations []models.Location

	database.DB.
		Order("timestamp desc").
		Find(&locations)

	c.JSON(200, gin.H{
		"locations": locations,
	})
}
