"use client";

import { useEffect, useState } from "react";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data.vehicles || []))
      .catch((err) => console.error(err));
  }, []);

  const activeVehicles = vehicles.filter(
    (v) => v.status === "active"
  ).length;

  const inactiveVehicles =
    vehicles.length - activeVehicles;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          🚚 Fleet Vehicles
        </h1>

        <p className="text-gray-600 mt-2">
          Manage and monitor registered vehicles.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg opacity-90">
            Total Vehicles
          </h2>

          <p className="text-5xl font-bold mt-2">
            {vehicles.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg opacity-90">
            Active Vehicles
          </h2>

          <p className="text-5xl font-bold mt-2">
            {activeVehicles}
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg opacity-90">
            Inactive Vehicles
          </h2>

          <p className="text-5xl font-bold mt-2">
            {inactiveVehicles}
          </p>
        </div>
      </div>

      {/* Vehicle Cards */}
      {vehicles.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="text-6xl mb-4">🚚</div>

          <p className="text-gray-500 text-lg">
            No vehicles found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    🚚 {vehicle.vehicle_number}
                  </h2>

                  <p className="text-sm text-gray-500 mb-4">
                    Registered Vehicle
                  </p>

                  <p className="text-gray-700">
                    👤 <strong>Driver:</strong>{" "}
                    {vehicle.driver_name}
                  </p>

                  <p className="text-gray-700">
                    🚛 <strong>Vehicle Type:</strong>{" "}
                    {vehicle.vehicle_type}
                  </p>

                  <p className="text-gray-700">
                    📞 <strong>Phone:</strong>{" "}
                    {vehicle.phone}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${
                    vehicle.status === "active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {vehicle.status === "active"
                    ? "🟢 Active"
                    : "🔴 Inactive"}
                </span>
              </div>

              <div className="mt-5 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Vehicle ID
                </p>

                <p className="font-mono text-sm break-all text-slate-700">
                  {vehicle.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}