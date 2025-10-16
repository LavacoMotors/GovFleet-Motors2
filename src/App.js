import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

const MOCK_INVENTORY = [
  {
    id: "chevy2500-2005",
    year: 2005,
    make: "Chevrolet",
    model: "Silverado 2500HD Service Truck",
    mileage: 164000,
    price: 6000,
    location: "Brea, CA",
    vin: "1GCHK24U15E123456",
    fuel: "Gasoline",
    transmission: "Automatic",
    images: [
      "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/1.jpeg",
      "https://raw.githubusercontent.com/LavacoMotors/GovFleet-Motors2/refs/heads/main/public/images/2005-chevrolet-silverado-2500HD/2.jpeg",
    ],
    notes: "Fleet maintained. Excellent condition.",
  },
];

function Header() {
  return (
    <header className="bg-gray-900 text-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-cyan-400 rounded flex items-center justify-center font-bold">
            GM
          </div>
          <div>
            <div className="text-xl font-semibold">GovFleet Motors</div>
            <div className="text-xs opacity-80">Premium Used Fleet Vehicles</div>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/inventory" className="hover:underline">Inventory</Link>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  const featured = MOCK_INVENTORY;
  return (
    <main>
      <section className="relative text-white text-center py-20 bg-gray-900">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_United_States_%28faded%29.svg')] bg-cover opacity-10" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Premium Government Fleet Vehicles</h1>
          <Link to="/inventory" className="bg-amber-500 px-5 py-3 rounded text-gray-900 font-semibold">Browse Inventory</Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(v => (
            <Link key={v.id} to={`/vehicle/${v.id}`} className="border rounded overflow-hidden shadow-sm">
              <img src={v.images[0]} alt={v.model} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{v.year} {v.make} {v.model}</h3>
                <p className="text-sm text-gray-600">{v.mileage.toLocaleString()} miles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function VehiclePage() {
  const { id } = useParams();
  const vehicle = MOCK_INVENTORY.find(v => v.id === id);
  if (!vehicle) return <div className="p-6">Vehicle not found.</div>;
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
      <img src={vehicle.images[0]} alt={vehicle.model} className="w-full h-96 object-cover rounded" />
      <p className="mt-4">{vehicle.notes}</p>
      <Link to="/inventory" className="mt-6 inline-block border px-4 py-2 rounded">Back</Link>
    </main>
  );
}

function Inventory() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Available Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_INVENTORY.map(v => (
          <Link key={v.id} to={`/vehicle/${v.id}`} className="border rounded overflow-hidden shadow-sm">
            <img src={v.images[0]} alt={v.model} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{v.year} {v.make} {v.model}</h3>
              <p className="text-sm text-gray-600">{v.mileage.toLocaleString()} miles</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/vehicle/:id" element={<VehiclePage />} />
      </Routes>
    </Router>
  );
}
