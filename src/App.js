import React from "react";

function App() {
  const vehicles = [
    {
      id: 1,
      title: "2005 Chevrolet Silverado 2500HD Service Truck",
      price: "$6,000",
      miles: "164,000",
      location: "Brea, CA",
      image:
        "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/1.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-[#1e2a38] text-white shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <img
              src="https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/main/public/logo.png"
              alt="GovFleet Motors"
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold">GovFleet Motors</h1>
              <p className="text-sm text-gray-300">
                Premium Used Government Fleet Vehicles
              </p>
            </div>
          </div>
          <nav className="space-x-6 text-sm font-semibold">
            <a href="#" className="hover:text-blue-400">
              Home
            </a>
            <a href="#" className="hover:text-blue-400">
              Inventory
            </a>
            <a href="#" className="hover:text-blue-400">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/main/public/flag-bg.png')",
        }}
      >
        <div className="bg-black bg-opacity-60 py-24 text-center">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Premium Used California Government Owned Fleet Vehicles
          </h2>
          <p className="text-gray-200 mb-8 text-lg">
            Trusted, fleet-maintained vehicles — inspected, serviced, and ready
            for work.
          </p>
          <a
            href="#inventory"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition"
          >
            Browse Inventory
          </a>
        </div>
      </section>

      {/* Featured Inventory Section */}
      <section id="inventory" className="max-w-7xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Inventory
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={v.image}
                alt={v.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-2">{v.title}</h4>
                <p className="text-gray-600">{v.miles} miles</p>
                <p className="text-gray-600">{v.location}</p>
                <p className="text-blue-600 font-bold text-lg mt-2">{v.price}</p>
                <button className="mt-4 bg-gray-900 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e2a38] text-gray-300 text-center py-6">
        <p className="text-sm">
          © {new Date().getFullYear()} GovFleet Motors. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
