"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: "🚀" },
    { name: "Vehicles", href: "/vehicles", icon: "🚚" },
    { name: "Geofences", href: "/geofences", icon: "📍" },
    { name: "Violations", href: "/violations", icon: "⚠️" },
    { name: "Live Alerts", href: "/live-alerts", icon: "🔔" },
    { name: "Map", href: "/map", icon: "🗺️" },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-4 items-center">
          <h1 className="text-xl font-bold text-blue-400 mr-6">
            Geofence System
          </h1>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg transition ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}