"use client";

import { useEffect, useState } from "react";

export default function LiveAlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [connected, setConnected] =
    useState(false);

  useEffect(() => {
    const ws = new WebSocket(
      "ws://localhost:8080/ws/alerts"
    );

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const alert = JSON.parse(event.data);

      setAlerts((prev) => [
        {
          ...alert,
          receivedAt:
            new Date().toLocaleString(),
        },
        ...prev,
      ]);
    };

    ws.onerror = () => {
  console.log(
    "Unable to connect to WebSocket server"
  );
};

    ws.onclose = () => {
  console.log(
    "WebSocket connection closed"
  );

  setConnected(false);
};

    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          🔔 Live Alerts
        </h1>

        <span
          className={`px-4 py-2 rounded-full text-white font-semibold ${
            connected
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {connected
            ? "Connected"
            : "Disconnected"}
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="text-6xl mb-4">
            📡
          </div>

          <p className="text-gray-500 text-lg">
            Waiting for live alerts...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-5 border-l-8 ${
                alert.event_type === "entry"
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">
                    🚚{" "}
                    {alert.vehicle_id}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    Geofence:{" "}
                    {alert.geofence_id}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                    alert.event_type === "entry"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {alert.event_type.toUpperCase()}
                </span>
              </div>

              <div className="mt-3 text-sm text-gray-500">
                {alert.receivedAt}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}