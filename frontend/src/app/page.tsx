"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default function Home() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [geofences, setGeofences] = useState<any[]>([]);
  const [violations, setViolations] = useState<any[]>([]);

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const vehicleRes = await api.get("/vehicles");
      const geofenceRes = await api.get("/geofences");
      const violationRes = await api.get("/violations");

      setVehicles(vehicleRes.data.vehicles || []);
      setGeofences(geofenceRes.data.geofences || []);
      setViolations(violationRes.data.violations || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-slate-800">
        🚀 Geofencing Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-lg opacity-90">Vehicles</p>
          <h2 className="text-5xl font-bold mt-3">
            {vehicles.length}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-lg opacity-90">Geofences</p>
          <h2 className="text-5xl font-bold mt-3">
            {geofences.length}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg p-6">
          <p className="text-lg opacity-90">Violations</p>
          <h2 className="text-5xl font-bold mt-3">
            {violations.length}
          </h2>
        </div>
      </div>

      {/* Recent Violations */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          Recent Violations
        </h2>

        {violations.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No violations found
          </div>
        ) : (
          <div className="space-y-4">
            {violations.slice(0, 10).map((v: any) => (
              <div
                key={v.id}
                className={`p-4 rounded-xl border-l-4 shadow-sm bg-slate-50 ${
                  v.event_type === "entry"
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <p className="font-bold text-lg">
                      {v.vehicle_id}
                    </p>

                    <p
                      className={`font-semibold ${
                        v.event_type === "entry"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {v.event_type.toUpperCase()}
                    </p>
                  </div>

                  <div className="text-sm text-gray-600 mt-2 md:mt-0">
                    {new Date(
                      v.timestamp
                    ).toLocaleString()}
                  </div>
                </div>

                <div className="mt-2 text-gray-700">
                  Latitude: {v.latitude} |
                  Longitude: {v.longitude}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}