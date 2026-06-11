"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function GeofencesPage() {
  const [geofences, setGeofences] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/geofences")
      .then((res) => setGeofences(res.data.geofences || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          📍 Geofences
        </h1>

        <p className="text-gray-600 mt-2">
          Manage and monitor all active geofence zones.
        </p>
      </div>

      {/* Summary Card */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg opacity-90">
            Total Geofences
          </h2>

          <p className="text-5xl font-bold mt-2">
            {geofences.length}
          </p>
        </div>
      </div>

      {/* Geofence Cards */}
      {geofences.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="text-6xl mb-4">📍</div>

          <p className="text-gray-500 text-lg">
            No Geofences Found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {geofences.map((g) => (
            <div
              key={g.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  {g.name}
                </h2>

                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {g.category}
                </span>
              </div>

              <p className="text-gray-600 mb-5">
                {g.description}
              </p>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="font-semibold text-green-600">
                  Active Monitoring Zone
                </p>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  Geofence ID
                </p>

                <p className="font-mono text-xs break-all">
                  {g.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}