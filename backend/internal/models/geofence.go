package models

import "time"

type Geofence struct {
	ID          string    `gorm:"primaryKey" json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Coordinates string    `json:"coordinates"`
	Category    string    `json:"category"`
	CreatedAt   time.Time `json:"created_at"`
}
