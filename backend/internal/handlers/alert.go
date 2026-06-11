package handlers

import (
	"encoding/json"
)

type Alert struct {
	VehicleID  string `json:"vehicle_id"`
	GeofenceID string `json:"geofence_id"`
	EventType  string `json:"event_type"`
}

func BroadcastAlert(alert Alert) {

	message, _ := json.Marshal(alert)

	for client := range Clients {

		err := client.WriteMessage(
			1,
			message,
		)

		if err != nil {
			client.Close()
			delete(Clients, client)
		}
	}
}
