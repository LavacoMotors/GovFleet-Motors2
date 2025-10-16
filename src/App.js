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
            <div className="text-xs opacity-80">
              Premium Used Government Fleet Vehicles
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/inventory" className="hover:underline">
            Inventory
          </Link>
          <a
            href="tel:+17142693483"
            className="bg-amber-500 px-3 py-2 rounded text-sm font-semibold text-gray-900"
          >
            Call Now
          </a>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  const featured = [...MOCK_INVENTORY].slice(-3).reverse();

  return (
    <main>
      <section className="relative bg-gray-900 text-white text-center py-20 bg-[url('https://images.unsplash.com/photo-1526038831220-2b90c8b0f2a0?auto=format&fit=crop&w=1800&q=60')] bg-cover bg-center">
        <div className="bg-black/60 absolute inset-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            Premium Used California Government Fleet Vehicles
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Police Interceptors • Utility Trucks • Hybrids • Fleet-Sustained
            Performance
          </p>
          <Link
            to="/inventory"
            className="bg-amber-500 text-gray-900 px-5 py-3 rounded font-semibold"
          >
            Browse Inventory
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((v) => (
            <Link
              key={v.id}
              to={`/vehicle/${v.id}`}
              className="border rounded overflow-hidden bg-white shadow-sm hover:shadow-md transition"
            >
              <img
                src={v.images[0]}
                alt={`${v.make} ${v.model}`}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">
                  {v.year} {v.make} {v.model}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {v.mileage.toLocaleString()} miles • {v.location}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-lg font-bold text-gray-900">
                    ${v.price.toLocaleString()}
                  </div>
                  <span className="bg-amber-500 px-3 py-1 rounded text-sm font-semibold text-gray-900">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/inventory"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition"
          >
            View All Inventory
          </Link>
        </div>
      </section>
    </main>
  );
}

function VehiclePage() {
  const { id } = useParams();
  const vehicle = MOCK_INVENTORY.find((v) => v.id === id);
  const [lightbox, setLightbox] = useState(null);

  if (!vehicle)
    return (
      <div className="max-w-5xl mx-auto px-6 py-12 text-center text-gray-700">
        Vehicle not found.
      </div>
    );

  const prevImage = (e) => {
    e.stopPropagation();
    setLightbox((i) => (i === 0 ? vehicle.images.length - 1 : i - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightbox((i) => (i === vehicle.images.length - 1 ? 0 : i + 1));
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 relative">
      <h1 className="text-3xl font-bold mb-4">
        {vehicle.year} {vehicle.make} {vehicle.model}
      </h1>

      {/* Main Image */}
      <img
        src={vehicle.images[0]}
        alt={vehicle.model}
        className="w-full h-96 object-cover rounded cursor-pointer"
        onClick={() => setLightbox(0)}
      />

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {vehicle.images.slice(1).map((img, i) => (
          <img
            key={i}
            src={img}
            alt="thumbnail"
            className="h-32 w-full object-cover rounded cursor-pointer"
            onClick={() => setLightbox(i + 1)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setLightbox(null)}
        >
          <img
            src={vehicle.images[lightbox]}
            alt="Full view"
            className="max-h-[90%] max-w-[90%] rounded shadow-lg"
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-8 text-white text-3xl font-bold"
          >
            ✕
          </button>
          <button
            onClick={prevImage}
            className="absolute left-6 text-white text-4xl font-bold select-none"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 text-white text-4xl font-bold select-none"
          >
            ›
          </button>
        </div>
      )}

      {/* Vehicle Info */}
      <div className="mt-6 text-gray-700">
        <p className="mb-3">{vehicle.notes}</p>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          <li><strong>VIN:</strong> {vehicle.vin}</li>
          <li><strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} mi</li>
          <li><strong>Fuel:</strong> {vehicle.fuel}</li>
          <li><strong>Transmission:</strong> {vehicle.transmission}</li>
          <li><strong>Type:</strong> {vehicle.type}</li>
          <li><strong>Location:</strong> {vehicle.location}</li>
        </ul>

        <div className="mt-6 flex gap-3">
          <a
            href="tel:+17142693483"
            className="bg-gray-900 text-white px-4 py-2 rounded font-semibold"
          >
            Call Now
          </a>
          <Link
            to="/inventory"
            className="border px-4 py-2 rounded font-semibold"
          >
            Back to Inventory
          </Link>
        </div>
      </div>
    </main>
  );
}

function Inventory() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Available Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_INVENTORY.map((v) => (
          <article
            key={v.id}
            className="border rounded overflow-hidden bg-white shadow-sm"
          >
            <img
              src={v.images[0]}
              alt={`${v.make} ${v.model}`}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">
                {v.year} {v.make} {v.model}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {v.mileage.toLocaleString()} miles • {v.location}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <div className="text-lg font-bold">
                  ${v.price.toLocaleString()}
                </div>
                <Link
                  to={`/vehicle/${v.id}`}
                  className="bg-amber-500 px-3 py-1 rounded text-sm font-semibold text-gray-900"
                >
                  View Details
                </Link>
              </div>
            </div>
          </article>
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
