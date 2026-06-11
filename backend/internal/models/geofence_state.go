package models

type GeofenceState struct {
	ID         string `gorm:"primaryKey" json:"id"`
	VehicleID  string `json:"vehicle_id"`
	GeofenceID string `json:"geofence_id"`
	IsInside   bool   `json:"is_inside"`
}
