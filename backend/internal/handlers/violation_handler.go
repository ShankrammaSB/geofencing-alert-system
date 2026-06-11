package handlers

import (
	"geofencing/internal/database"
	"geofencing/internal/models"

	"github.com/gin-gonic/gin"
)

func GetViolations(c *gin.Context) {

	var violations []models.Violation

	database.DB.Find(&violations)

	c.JSON(200, gin.H{
		"violations": violations,
	})
}
