import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

/* =========================
   Helpers
   ========================= */
const formatPrice = (num) =>
  typeof num === "number"
    ? `$${num.toLocaleString()}`
    : undefined;

/* =========================
   INVENTORY DATA (edit here)
   ========================= */
const MOCK_INVENTORY = [
  {
    id: "chevy2500-2005",
    status: "available", // "available" | "sold"
    year: 2005,
    make: "Chevrolet",
    model: "Silverado 2500HD Service Truck",
    mileage: 164000,
    location: "Brea, CA",
    type: "Utility",
    vin: "1GCHK24U15E123456",
    fuel: "Gasoline",
    transmission: "Automatic",
    price: 8900, // shown only when status === "available"
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
    status: "available",
    year: 2016,
    make: "Ford",
    model: "F-250 Utility Truck",
    mileage: 120000,
    location: "Brea, CA",
    type: "Utility",
    vin: "1FTNF2B60GEC12345",
    fuel: "Gasoline",
    transmission: "Automatic",
    price: 12900,
    images: ["/images/placeholder.jpg"],
    notes: "Placeholder vehicle — new inventory coming soon.",
  },
  {
    id: "placeholder2",
    status: "sold", // example sold unit
    year: 2017,
    make: "Dodge",
    model: "Ram 1500 Work Truck",
    mileage: 110000,
    location: "Brea, CA",
    type: "Truck",
    vin: "1C6RR6FT0HS123456",
    fuel: "Gasoline",
    transmission: "Automatic",
    // price intentionally omitted for sold unit (hidden anyway)
    images: ["/images/placeholder.jpg"],
    notes: "Placeholder vehicle — recently sold.",
  },
  {
    id: "placeholder3",
    status: "available",
    year: 2018,
    make: "Chevrolet",
    model: "Express Cargo Van",
    mileage: 98000,
    location: "Brea, CA",
    type: "Van",
    vin: "1GCWGAFF0J1234567",
    fuel: "Gasoline",
    transmission: "Automatic",
    price: 10900,
    images: ["/images/placeholder.jpg"],
    notes: "Placeholder vehicle — new inventory coming soon.",
  },
];

/* =========================
   LIGHTBOX (detail page only)
   ========================= */
function Lightbox({ images, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);
  const [touchStart, setTouchStart] = useState(0);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") showNext(e);
      if (e.key === "ArrowLeft") showPrev(e);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

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
    const x = e.touches[0].clientX;
    const diff = touchStart - x;
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
      {/* Close (white X) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-gray-300"
        aria-label="Close"
      >
        ×
      </button>

      {/* Prev (blue) */}
      <button
        onClick={showPrev}
        className="absolute left-5 text-blue-500 text-5xl font-bold hover:text-blue-400 select-none"
        aria-label="Previous"
      >
        ‹
      </button>

      {/* Image */}
      <img
        src={images[index]}
        alt="Vehicle"
        className="max-h-[90vh] max-w-[90vw] rounded shadow-lg object-contain"
      />

      {/* Next (blue) */}
      <button
        onClick={showNext}
        className="absolute right-5 text-blue-500 text-5xl font-bold hover:text-blue-400 select-none"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}

/* =========================
   SEO JSON-LD (Vehicle)
   ========================= */
function VehicleSeo({ vehicle }) {
  if (!vehicle) return null;
  const isAvailable = vehicle.status !== "sold";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    brand: vehicle.make,
    model: vehicle.model,
    vehicleIdentificationNumber: vehicle.vin,
    mileageFromOdometer: vehicle.mileage,
    fuelType: vehicle.fuel,
    vehicleTransmission: vehicle.transmission,
    offers: {
      "@type": "Offer",
      price: isAvailable && typeof vehicle.price === "number" ? vehicle.price : undefined,
      priceCurrency: "USD",
      availability: isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
  return (
    <script type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  );
}

/* =========================
   VEHICLE DETAIL PAGE
   ========================= */
function VehicleDetail() {
  const { id } = useParams();
  const vehicle = MOCK_INVENTORY.find((v) => v.id === id);
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!vehicle) return <p className="text-center mt-10">Vehicle not found.</p>;
  const isSold = vehicle.status === "sold";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <VehicleSeo vehicle={vehicle} />

      <h1 className="text-3xl font-bold mb-2 text-center">
        {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      </h1>

      {/* Price or SOLD */}
      <div className="text-center mb-4">
        {!isSold && typeof vehicle.price === "number" ? (
          <div className="text-green-600 font-extrabold text-2xl">
            {formatPrice(vehicle.price)}
          </div>
        ) : (
          <div className="inline-block bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
            SOLD
          </div>
        )}
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {vehicle.images.map((src, i) => (
          <div key={i} className="relative">
            {/* SOLD ribbon over images too */}
            {isSold && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                SOLD
              </div>
            )}
            <img
              src={src}
              alt={`${vehicle.make}-${i}`}
              className={`rounded shadow cursor-pointer hover:opacity-80 ${
                isSold ? "opacity-90" : ""
              }`}
              onClick={() => setLightboxIndex(i)}
            />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={vehicle.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Details */}
      <div className="text-gray-700 space-y-2">
        <p>
          <strong>Mileage:</strong>{" "}
          {vehicle.mileage?.toLocaleString?.() ?? "—"} miles
        </p>
        <p>
          <strong>Location:</strong> {vehicle.location}
        </p>
        <p>
          <strong>VIN:</strong> {vehicle.vin ?? "—"}
        </p>
        <p>
          <strong>Fuel:</strong> {vehicle.fuel ?? "—"}
        </p>
        <p>
          <strong>Transmission:</strong> {vehicle.transmission ?? "—"}
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

/* =========================
   INVENTORY PAGE (counts, prices, SOLD sorting)
   ========================= */
function Inventory() {
  const available = MOCK_INVENTORY.filter((v) => v.status !== "sold");
  const sold = MOCK_INVENTORY.filter((v) => v.status === "sold");
  const ordered = [...available, ...sold]; // available first, sold last

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Counts */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Current Inventory</h2>
        <p className="text-gray-600 mt-1">
          {MOCK_INVENTORY.length} Vehicles — {available.length} Available ·{" "}
          {sold.length} Sold
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ordered.map((vehicle) => {
          const isSold = vehicle.status === "sold";
          const showPrice = !isSold && typeof vehicle.price === "number";
          return (
            <div
              key={vehicle.id}
              className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative">
                <Link to={`/inventory/${vehicle.id}`}>
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.model}
                    className={`w-full h-56 object-cover ${
                      isSold ? "opacity-80" : ""
                    }`}
                  />
                </Link>

                {/* SOLD ribbon (top-left) */}
                {isSold && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    SOLD
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold">
                  {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                </h3>
                <p className="text-gray-600 text-sm">
                  {vehicle.mileage?.toLocaleString?.() ?? "—"} miles
                </p>
                <p className="text-gray-600 text-sm">
                  {vehicle.location}
                </p>

                {/* Price (green) or nothing if sold */}
                {showPrice && (
                  <div className="mt-2 text-green-600 font-bold">
                    {formatPrice(vehicle.price)}
                  </div>
                )}

                <div className="mt-3">
                  <Link to={`/inventory/${vehicle.id}`}>
                    <button
                      className={`px-3 py-2 rounded text-white ${
                        isSold
                          ? "bg-gray-500"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================
   HOME PAGE
   ========================= */
function Home() {
  // Prefer to feature an available unit if possible
  const featured =
    MOCK_INVENTORY.find((v) => v.status !== "sold") ?? MOCK_INVENTORY[0];
  const isSold = featured.status === "sold";
  const showPrice = !isSold && typeof featured.price === "number";

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-700 text-white text-center py-20">
        <h2 className="text-3xl font-bold mb-4">
          Premium Used California Government Owned Fleet Vehicles
        </h2>
        <p className="mb-6">
          Trusted, fleet-maintained vehicles — inspected, serviced, and ready
          for work.
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
            <div className="relative">
              <Link to={`/inventory/${featured.id}`}>
                <img
                  src={featured.images[0]}
                  alt={featured.model}
                  className="w-full h-56 object-cover rounded-t"
                />
              </Link>
              {isSold && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  SOLD
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-semibold">
                {`${featured.year} ${featured.make} ${featured.model}`}
              </h4>
              <p className="text-gray-600 text-sm">
                {featured.mileage?.toLocaleString?.() ?? "—"} miles
              </p>
              <p className="text-gray-600 text-sm">{featured.location}</p>

              {showPrice && (
                <div className="mt-2 text-green-600 font-bold">
                  {formatPrice(featured.price)}
                </div>
              )}

              <div className="mt-3">
                <Link to={`/inventory/${featured.id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================
   MAIN APP (Router + Layout)
   ========================= */
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
            <a
              href="mailto:govfleetmotors@gmail.com"
              className="hover:text-gray-300"
            >
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
