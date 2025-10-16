import React, { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-[#1e2a38] text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="GovFleet Motors Logo" className="w-8 h-8" />
          <h1 className="font-bold text-lg">GovFleet Motors</h1>
        </div>
        <nav className="space-x-4">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/inventory" className="hover:text-gray-300">Inventory</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-700 text-white text-center py-20">
        <h2 className="text-3xl font-bold mb-4">
          Premium Used California Government Owned Fleet Vehicles
        </h2>
        <p className="mb-6">
          Trusted, fleet-maintained vehicles — inspected, serviced, and ready for work.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
          Browse Inventory
        </button>
      </section>

      {/* Featured Inventory */}
      <section className="py-10 px-6 text-center">
        <h3 className="text-2xl font-semibold mb-6">Featured Inventory</h3>
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
            <img
              src="https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/1.jpeg"
              alt="2005 Chevrolet Silverado 2500HD"
              className="rounded mb-3"
            />
            <h4 className="font-semibold text-lg">
              2005 Chevrolet Silverado 2500HD Service Truck
            </h4>
            <p className="text-gray-600 text-sm mt-1">164,000 miles</p>
            <p className="text-gray-600 text-sm">Brea, CA</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e2a38] text-gray-300 py-6 text-center text-sm">
        <p>© {new Date().getFullYear()} GovFleet Motors. All Rights Reserved.</p>
        <p>1215 W. Imperial Hwy #221, Brea, CA 92821 | (714) 269-3483</p>
      </footer>
    </div>
  );
}

export default App;
