import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// ----- Inventory Data -----
const MOCK_INVENTORY = [
  {
    id: "chevy2500-2005",
    year: 2005,
    make: "Chevrolet",
    model: "Silverado 2500HD Service Truck",
    mileage: 112000,
    price: 8900,
    location: "Brea, CA",
    type: "Utility",
    vin: "1GCHK24U15E123456",
    fuel: "Gasoline",
    transmission: "Automatic",
    images: [
      "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/1.jpeg",
      "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/2.jpeg",
      "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/3.jpeg",
      "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/4.jpeg",
      "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/5.jpeg",
      "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/6.jpeg",
      "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/7.jpeg",
      "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/8.jpeg",
      "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/9.jpeg",
    ],
    notes:
      "Former government fleet utility truck with service body and roof ladder rack. Fleet-maintained, clean title, passed California Smog and strong 6.0L V8 engine.",
  },
];

// ----- Home Page -----
function Home() {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-[#101828] text-white py-8 px-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">GovFleet Motors</h1>
          <p className="text-gray-300">Premium Used Fleet Vehicles</p>
        </div>
        <nav className="mt-4 md:mt-0">
          <Link to="/" className="mr-6 hover:text-blue-400">
            Home
          </Link>
          <Link to="/inventory" className="hover:text-blue-400">
            Inventory
          </Link>
        </nav>
      </header>

      <section className="text-center py-16 bg-[#1E293B] text-white">
        <h2 className="text-4xl font-bold mb-6">
          Premium Government Fleet Vehicles
        </h2>
        <Link
          to="/inventory"
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md text-lg font-semibold"
        >
          Browse Inventory
        </Link>
      </section>

      <section className="max-w-6xl mx-auto py-12 px-6">
        <h3 className="text-2xl font-semibold mb-8">Featured Inventory</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {MOCK_INVENTORY.map((vehicle) => (
            <Link
              key={vehicle.id}
              to={`/vehicle/${vehicle.id}`}
              className="block bg-white rounded-xl shadow hover:shadow-xl transition"
            >
              <img
                src={vehicle.images[0]}
                alt={vehicle.model}
                className="rounded-t-xl w-full h-56 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-lg text-gray-900">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h4>
                <p className="text-gray-500">{vehicle.mileage.toLocaleString()} miles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

// ----- Vehicle Details Page -----
function VehiclePage({ id }) {
  const vehicle = MOCK_INVENTORY.find((v) => v.id === id);
  if (!vehicle) return <p className="p-8 text-center">Vehicle not found.</p>;

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-[#101828] text-white py-6 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">GovFleet Motors</h1>
        <Link to="/" className="hover:text-blue-400">
          Back to Home
        </Link>
      </header>

      <main className="max-w-6xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-semibold mb-4">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={vehicle.images[0]}
              alt={vehicle.model}
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div>
            <p className="text-gray-600 mb-2">
              <strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} miles
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Transmission:</strong> {vehicle.transmission}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Fuel:</strong> {vehicle.fuel}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> {vehicle.location}
            </p>
            <p className="text-gray-700 mt-4">{vehicle.notes}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

// ----- Router Setup -----
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/vehicle/:id"
          element={<VehiclePage id="chevy2500-2005" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
