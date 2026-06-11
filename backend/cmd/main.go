package main

import (
	"geofencing/internal/database"
	"geofencing/internal/handlers"
	"geofencing/internal/models"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	database.Connect()

	database.DB.AutoMigrate(
		&models.Vehicle{},
		&models.Geofence{},
		&models.Location{},
		&models.Violation{},
		&models.GeofenceState{},
	)

	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Geofencing Alert System Backend Running",
		})
	})

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Backend Running",
		})
	})

	// Vehicle APIs
	router.POST("/vehicles", handlers.CreateVehicle)
	router.GET("/vehicles", handlers.GetVehicles)
	router.POST("/geofences", handlers.CreateGeofence)
	router.GET("/geofences", handlers.GetGeofences)
	router.POST("/vehicles/location", handlers.UpdateVehicleLocation)
	router.GET("/test-geofence", handlers.TestGeofence)
	router.GET("/violations", handlers.GetViolations)
	router.GET("/states", handlers.GetStates)
	router.GET("/ws/alerts", handlers.AlertWebSocket)
	router.GET("/locations", handlers.GetLocations)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router.Run(":" + port)
}
