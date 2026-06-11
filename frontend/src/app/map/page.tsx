"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("./MapView"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[700px] bg-white rounded-2xl shadow-lg">
        <div className="text-xl font-semibold text-gray-500">
          Loading Map...
        </div>
      </div>
    ),
  }
);

export default function MapPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          🗺️ Geofence Monitoring Map
        </h1>

        <p className="text-gray-600 mt-2">
          Monitor vehicle locations, geofences, and
          real-time tracking activity.
        </p>
      </div>

      <MapView />
    </main>
  );
}