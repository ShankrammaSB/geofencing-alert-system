"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ViolationsPage() {
  const [violations, setViolations] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/violations")
      .then((res) =>
        setViolations(res.data.violations || [])
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          ⚠️ Violation History
        </h1>

        <p className="text-gray-600 mt-2">
          Monitor all geofence entry and exit
          events.
        </p>
      </div>

      {/* Summary Card */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg opacity-90">
            Total Violations
          </h2>

          <p className="text-5xl font-bold mt-2">
            {violations.length}
          </p>
        </div>
      </div>

      {violations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="text-6xl mb-4">
            ⚠️
          </div>

          <p className="text-gray-500 text-lg">
            No violations found
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {violations.map((v) => (
            <div
              key={v.id}
              className={`bg-white rounded-2xl shadow-lg p-5 border-l-8 ${
                v.event_type === "entry"
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    🚚 {v.vehicle_id}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    Geofence Event
                  </p>
                </div>

                <span
                  className={`mt-3 md:mt-0 px-4 py-2 rounded-full text-white text-sm font-semibold ${
                    v.event_type === "entry"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {v.event_type.toUpperCase()}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-5">
                <div>
                  <p className="text-sm text-gray-500">
                    Latitude
                  </p>
                  <p className="font-semibold">
                    {v.latitude}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Longitude
                  </p>
                  <p className="font-semibold">
                    {v.longitude}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Timestamp
                  </p>
                  <p className="font-semibold">
                    {new Date(
                      v.timestamp
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t">
                <p className="text-xs text-gray-500">
                  Violation ID
                </p>

                <p className="font-mono text-xs break-all">
                  {v.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}