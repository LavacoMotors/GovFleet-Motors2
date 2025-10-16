import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

// --- Mock Inventory Data ---
const MOCK_INVENTORY = [
  {
    id: "chevy2500-2005",
    year: 2005,
    make: "Chevrolet",
    model: "Silverado 2500HD Service Truck",
    mileage: 164000,
    location: "Brea, CA",
    type: "Utility",
    vin: "1GCHK24U15E123456",
    fuel: "Gasoline",
    transmission: "Automatic",
    images: [
      "/images/2005-chevrolet-silverado-2500HD/1.jpeg",
      "/images/2005-chevrolet-silverado-2500HD/2.jpeg",
      "/images/2005-chevrolet-silverado-2500HD/3.jpeg",
      "/images/2005-chevrolet-silverado-2500HD/4.jpeg",
    ],
    notes:
      "Former government fleet service truck with ladder rack. Fleet-maintained, passed California smog, and ready for work.",
  },
  {
    id: "placeholder1",
    year: 2016,
    make: "Ford",
    model: "F-250 Utility Truck",
    mileage: 120000,
    location: "Brea, CA",
    notes: "Placeholder vehicle — new inventory coming soon.",
    images: ["/images/placeholder.jpg"],
  },
  {
    id: "placeholder2",
    year: 2017,
    make: "Dodge",
    model: "Ram 1500 Work Truck",
    mileage: 110000,
    location: "Brea, CA",
    notes: "Placeholder vehicle — new inventory coming soon.",
    images: ["/images/placeholder.jpg"],
  },
  {
    id: "placeholder3",
    year: 2018,
    make: "Chevrolet",
    model: "Express Cargo Van",
    mileage: 98000,
    location: "Brea, CA",
    notes: "Placeholder vehicle — new inventory coming soon.",
    images: ["/images/placeholder.jpg"],
  },
];

// --- Lightbox Component ---
function Lightbox({ images, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);
  const [touchStart, setTouchStart] = useState(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") showNext(e);
      if (e.key === "ArrowLeft") showPrev(e);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const showNext = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) showNext(e);
    if (diff < -50) showPrev(e);
    setTouchStart(0);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-gray-300"
      >
        ×
      </button>

      {/* Prev Arrow */}
      <button
        onClick={showPrev}
        className="absolute left-5 text-blue-500 text-5xl font-bold hover:text-blue-400 select-none"
      >
        ‹
      </button>

      {/* Image */}
      <img
        src={images[index]}
        alt="Vehicle"
        className="max-h-[90vh] max-w-[90vw] rounded shadow-lg object-contain"
      />

      {/* Next Arrow */}
      <button
        onClick={showNext}
        className="absolute right-5 text-blue-500 text-5xl font-bold hover:text-blue-400 select-none"
      >
        ›
      </button>
    </div>
  );
}

// --- Vehicle Detail Page ---
function VehicleDetail() {
  const { id } = useParams();
  const vehicle = MOCK_INVENTORY.find((v) => v.id === id);
  const navigate = useNavigate();

  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!vehicle) return <p className="text-center mt-10">Vehicle not found.</p>;

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {vehicle.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${vehicle.make}-${i}`}
            className="rounded shadow cursor-pointer hover:opacity-80"
            onClick={() => openLightbox(i)}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={vehicle.images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}

      <div className="text-gray-700 space-y-2">
        <p>
          <strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} miles
        </p>
        <p>
          <strong>Location:</strong> {vehicle.location}
        </p>
        <p>{vehicle.notes}</p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/inventory")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Inventory
        </button>
      </div>
    </div>
  );
}

// --- Inventory Page ---
function Inventory() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Current Inventory</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_INVENTORY.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
          >
            <Link to={`/inventory/${vehicle.id}`}>
              <img
                src={vehicle.images[0]}
                alt={vehicle.model}
                className="w-full h-56 object-cover"
              />
            </Link>
            <div className="p-4">
              <h3 className="font-semibold">{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}</h3>
              <p className="text-gray-600 text-sm">
                {vehicle.mileage.toLocaleString()} miles
              </p>
              <p className="text-gray-600 text-sm mb-2">{vehicle.location}</p>
              <Link to={`/inventory/${vehicle.id}`}>
                <button className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Home Page ---
function Home() {
  const featured = MOCK_INVENTORY[0];
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-700 text-white text-center py-20">
        <h2 className="text-3xl font-bold mb-4">
          Premium Used California Government Owned Fleet Vehicles
        </h2>
        <p className="mb-6">
          Trusted, fleet-maintained vehicles — inspected, serviced, and ready for work.
        </p>
        <Link to="/inventory">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
            Browse Inventory
          </button>
        </Link>
      </section>

      {/* Featured Vehicle */}
      <section className="py-10 px-6 text-center">
        <h3 className="text-2xl font-semibold mb-6">Featured Inventory</h3>
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-sm">
            <Link to={`/inventory/${featured.id}`}>
              <img
                src={featured.images[0]}
                alt={featured.model}
                className="w-full h-56 object-cover rounded-t"
              />
            </Link>
            <div className="p-4">
              <h4 className="font-semibold">{`${featured.year} ${featured.make} ${featured.model}`}</h4>
              <p className="text-gray-600 text-sm">
                {featured.mileage.toLocaleString()} miles
              </p>
              <p className="text-gray-600 text-sm mb-2">{featured.location}</p>
              <Link to={`/inventory/${featured.id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Main App ---
export default function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-[#1e2a38] text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="GovFleet Motors Logo" className="w-8 h-8" />
            <h1 className="font-bold text-lg">GovFleet Motors</h1>
          </div>
          <nav className="space-x-4">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/inventory" className="hover:text-gray-300">
              Inventory
            </Link>
            <a href="#contact" className="hover:text-gray-300">
              Contact
            </a>
          </nav>
        </header>

        {/* Routes */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/:id" element={<VehicleDetail />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-[#1e2a38] text-gray-300 py-6 text-center text-sm">
          <p>© {new Date().getFullYear()} GovFleet Motors. All Rights Reserved.</p>
          <p>1215 W. Imperial Hwy #221, Brea, CA 92821 | (714) 269-3483</p>
        </footer>
      </div>
    </Router>
  );
}
