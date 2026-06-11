import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Geofencing Alert System",
  description: "Real-time vehicle tracking and geofence monitoring dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        <Navbar />
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
          <Footer />

      </body>
    </html>
  );
}