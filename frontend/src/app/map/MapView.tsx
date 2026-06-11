"use client";

import { useEffect, useState } from "react";
import * as L from "leaflet";

import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const vehicleIcon = L.icon({
  iconUrl: "/vehicle.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function MapView() {
  const [geofences, setGeofences] = useState<any[]>([]);
  const [vehicleLocation, setVehicleLocation] =
    useState<any>(null);

  const loadData = async () => {
    try {
      const geofenceRes = await fetch(
        "http://localhost:8080/geofences"
      );

      const locationRes = await fetch(
        "http://localhost:8080/locations"
      );

      const geofenceData = await geofenceRes.json();
      const locationData = await locationRes.json();

      setGeofences(geofenceData.geofences || []);

      if (locationData.locations?.length > 0) {
        const latest =
          locationData.locations[0];

        setVehicleLocation({
          latitude: Number(
            latest.latitude
          ),
          longitude: Number(
            latest.longitude
          ),
          vehicle_id:
            latest.vehicle_id,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(
      loadData,
      5000
    );

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg">
            Geofences
          </h3>
          <p className="text-4xl font-bold mt-2">
            {geofences.length}
          </p>
        </div>

        <div className="bg-green-500 text-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg">
            Vehicles
          </h3>
          <p className="text-4xl font-bold mt-2">
            {vehicleLocation ? 1 : 0}
          </p>
        </div>

        <div className="bg-purple-500 text-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg">
            Tracking Status
          </h3>
          <p className="text-xl font-bold mt-3">
            Live
          </p>
        </div>
      </div>

      {/* Vehicle Info */}
      {vehicleLocation && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            🚚 Vehicle Details
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500">
                Vehicle ID
              </p>
              <p className="font-semibold">
                {vehicleLocation.vehicle_id}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Latitude
              </p>
              <p className="font-semibold">
                {vehicleLocation.latitude}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Longitude
              </p>
              <p className="font-semibold">
                {vehicleLocation.longitude}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <MapContainer
          center={[37.7799, -122.4144]}
          zoom={15}
          style={{
            height: "700px",
            width: "100%",
            borderRadius: "16px",
          }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {geofences.map((geofence) => (
            <Polygon
              key={geofence.id}
              positions={JSON.parse(
                geofence.coordinates
              )}
              pathOptions={{
                color: "#2563eb",
                weight: 3,
                fillOpacity: 0.2,
              }}
            />
          ))}

          {vehicleLocation && (
            <Marker
              icon={vehicleIcon}
              position={[
                vehicleLocation.latitude,
                vehicleLocation.longitude,
              ]}
            >
              <Popup>
                <div>
                  <strong>
                    🚚 Vehicle
                  </strong>
                  <br />
                  {
                    vehicleLocation.vehicle_id
                  }
                  <br />
                  Lat:{" "}
                  {
                    vehicleLocation.latitude
                  }
                  <br />
                  Lng:{" "}
                  {
                    vehicleLocation.longitude
                  }
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}