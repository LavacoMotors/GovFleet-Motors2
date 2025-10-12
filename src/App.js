import React, { useState } from "react";

const MOCK_INVENTORY = [
  {
    id: "1",
    year: 2018,
    make: "Ford",
    model: "Explorer Police Interceptor",
    mileage: 42000,
    price: 12900,
    location: "Sacramento, CA",
    type: "Police",
    vin: "1FM5K8AR0JGC12345",
    fuel: "Gasoline",
    transmission: "Automatic",
    images: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=60",
    ],
    notes: "Fleet-serviced; recent brakes; clean title.",
  },
  {
    id: "2",
    year: 2016,
    make: "Chevrolet",
    model: "Express Van",
    mileage: 76000,
    price: 8900,
    location: "Los Angeles, CA",
    type: "Utility",
    vin: "1GCWGAFP6G1123456",
    fuel: "Gasoline",
    transmission: "Automatic",
    images: [
      "https://images.unsplash.com/photo-1502877828070-33a6b6df6f6d?auto=format&fit=crop&w=1200&q=60",
    ],
    notes: "Used by city maintenance; upfit available.",
  },
  {
    id: "3",
    year: 2019,
    make: "Toyota",
    model: "Camry Hybrid",
    mileage: 33000,
    price: 14900,
    location: "San Diego, CA",
    type: "Hybrid",
    vin: "4T1BD1FK3KU123456",
    fuel: "Hybrid",
    transmission: "CVT",
    images: [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=60",
    ],
    notes: "Low mileage, excellent fuel economy; formerly state fleet.",
  },
];

function SeoSnippet({ vehicle }) {
  if (!vehicle) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    brand: vehicle.make,
    model: vehicle.model,
    vehicleIdentificationNumber: vehicle.vin,
    mileageFromOdometer: vehicle.mileage,
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
  return <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>;
}

export default function App() {
  const [page, setPage] = useState("home"); // 'home' | 'inventory' | 'vehicle'
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ type: "", minPrice: "", maxPrice: "" });
  const [selected, setSelected] = useState(null);

  const filtered = MOCK_INVENTORY.filter((v) => {
    const q = query.trim().toLowerCase();
    if (q) {
      const match = `${v.year} ${v.make} ${v.model} ${v.type} ${v.location}`.toLowerCase();
      if (!match.includes(q)) return false;
    }
    if (filters.type && v.type !== filters.type) return false;
    if (filters.minPrice && v.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && v.price > Number(filters.maxPrice)) return false;
    return true;
  });

  function openVehicle(vehicle) {
    setSelected(vehicle);
    setPage("vehicle");
  }

  function renderHeader() {
    return (
      <header className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-cyan-400 rounded flex items-center justify-center font-bold">GFM</div>
            <div>
              <div className="text-xl font-semibold">GovFleet Motors</div>
              <div className="text-xs opacity-80">Premium Used California Government Fleet Vehicles</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            <button onClick={() => setPage("home")} className="hover:underline">Home</button>
            <button onClick={() => setPage("inventory")} className="hover:underline">Inventory</button>
            <button onClick={() => setPage("categories")} className="hover:underline">Categories</button>
            <button onClick={() => setPage("about")} className="hover:underline">About</button>
            <a href="tel:+1-714-269-3483" className="bg-amber-500 px-3 py-2 rounded text-sm font-semibold text-gray-900">Call Now</a>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setPage("inventory")} className="bg-amber-500 px-3 py-2 rounded text-sm font-semibold text-gray-900">Browse</button>
          </div>
        </div>
      </header>
    );
  }

  function Home() {
    return (
      <main>
        <section className="relative bg-[url('https://images.unsplash.com/photo-1526038831220-2b90c8b0f2a0?auto=format&fit=crop&w=1800&q=60')] bg-cover bg-center h-96">
          <div className="bg-black/50 h-full flex items-center">
            <div className="max-w-6xl mx-auto px-6 text-white">
              <h1 className="text-4xl font-bold">Used Government Vehicles for Sale in California</h1>
              <p className="mt-3 max-w-xl">Low-mileage, fleet-maintained vehicles from trusted government fleets — police cars, vans, trucks, and hybrids.</p>

              <div className="mt-6 bg-white rounded p-4 max-w-2xl">
                <div className="flex gap-2">
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by make, model, year, location" className="flex-1 px-3 py-2 border rounded" />
                  <button onClick={() => setPage("inventory")} className="bg-gray-900 text-white px-4 rounded">Search</button>
                </div>
                <div className="text-xs mt-2 text-gray-600">Try: "police", "Camry", "Los Angeles"</div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_INVENTORY.slice(0, 3).map((v) => (
              <article key={v.id} className="border rounded overflow-hidden bg-white">
                <img src={v.images[0]} alt={`${v.make} {v.model}`} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{v.year} {v.make} {v.model}</h3>
                  <div className="text-sm text-gray-600 mt-1">{v.mileage.toLocaleString()} miles • {v.location}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-lg font-bold">${v.price.toLocaleString()}</div>
                    <button onClick={() => openVehicle(v)} className="bg-amber-500 px-3 py-1 rounded text-sm font-semibold text-gray-900">View Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-slate-50 to-white py-8">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <h3 className="font-semibold">Why buy government vehicles?</h3>
              <p className="mt-2 text-sm text-gray-700">Government fleets are routinely maintained, often have documented service histories, and are priced competitively. We inspect every vehicle and provide clear condition notes.</p>
            </div>

            <div className="p-4">
              <h3 className="font-semibold">Financing & Warranty</h3>
              <p className="mt-2 text-sm text-gray-700">We partner with lenders that offer financing for government-owned vehicles. Add optional warranties for extra peace of mind.</p>
            </div>

            <div className="p-4">
              <h3 className="font-semibold">Local Pickup & Shipping</h3>
              <p className="mt-2 text-sm text-gray-700">Pickup available at our California lot: <strong>1215 W. Imperial Hwy #221, Brea CA 92821</strong>. We can also arrange transport to most states.</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  function Inventory() {
    const uniqueTypes = Array.from(new Set(MOCK_INVENTORY.map((i) => i.type)));

    return (
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>

        <div className="mb-6 grid md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search inventory..." className="w-full px-3 py-2 border rounded" />
          </div>

          <div className="flex gap-2">
            <select value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))} className="px-2 py-2 border rounded">
              <option value="">All Types</option>
              {uniqueTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <input value={filters.minPrice} onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))} placeholder="Min Price" className="px-2 py-2 border rounded w-24" />
            <input value={filters.maxPrice} onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))} placeholder="Max Price" className="px-2 py-2 border rounded w-24" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.length === 0 && <div className="text-gray-600">No vehicles found. Try widening your search.</div>}

          {filtered.map((v) => (
            <article key={v.id} className="border rounded overflow-hidden bg-white">
              <img src={v.images[0]} alt={`${v.make} ${v.model}`} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{v.year} {v.make} {v.model}</h3>
                <div className="text-sm text-gray-600 mt-1">{v.mileage.toLocaleString()} miles • {v.location}</div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-lg font-bold">${v.price.toLocaleString()}</div>
                  <div className="flex gap-2">
                    <button onClick={() => openVehicle(v)} className="bg-gray-900 text-white px-3 py-1 rounded text-sm">Details</button>
                    <a href={`tel:+1-714-269-3483`} className="bg-amber-500 px-3 py-1 rounded text-sm font-semibold text-gray-900">Call</a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    );
  }

  function VehiclePage({ vehicle }) {
    if (!vehicle) return null;
    return (
      <main className="max-w-5xl mx-auto px-6 py-12">
        <SeoSnippet vehicle={vehicle} />

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img src={vehicle.images[0]} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-96 object-cover rounded" />
            <div className="mt-3 flex gap-2">
              <img src={vehicle.images[0]} alt="thumb" className="w-20 h-14 object-cover rounded" />
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
            <div className="text-gray-600 mt-1">{vehicle.mileage.toLocaleString()} miles • {vehicle.location}</div>
            <div className="mt-4 text-3xl font-extrabold text-amber-500">${vehicle.price.toLocaleString()}</div>

            <div className="mt-4 flex gap-3">
              <a href={`tel:+1-714-269-3483`} className="px-4 py-2 bg-gray-900 text-white rounded">Call Now</a>
              <button className="px-4 py-2 border rounded" onClick={() => alert('Lead form: request a test drive (this is a mockup)')}>Schedule Test Drive</button>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Vehicle Details</h3>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
                <li><strong>VIN:</strong> {vehicle.vin}</li>
                <li><strong>Transmission:</strong> {vehicle.transmission}</li>
                <li><strong>Fuel:</strong> {vehicle.fuel}</li>
                <li><strong>Type:</strong> {vehicle.type}</li>
              </ul>

              <div className="mt-4">
                <h4 className="font-semibold">Condition & Notes</h4>
                <p className="text-sm text-gray-700 mt-1">{vehicle.notes}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold">Financing</h4>
              <p className="text-sm text-gray-700">We offer financing options for vehicles sourced from government auctions. Contact us for rates and terms.</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-semibold">Similar Vehicles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {MOCK_INVENTORY.filter((i) => i.id !== vehicle.id).slice(0,3).map((v) => (
              <div key={v.id} className="border rounded p-2">
                <img src={v.images[0]} alt="similar" className="h-28 w-full object-cover rounded" />
                <div className="mt-2 text-sm">{v.year} {v.make} {v.model}</div>
                <div className="font-bold">${v.price.toLocaleString()}</div>
                <button onClick={() => openVehicle(v)} className="mt-2 px-2 py-1 bg-gray-900 text-white rounded text-sm">View</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {renderHeader()}

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setPage("home")} className={`px-3 py-1 rounded border ${page==='home' ? 'bg-gray-900 text-white' : ''}`}>Home</button>
          <button onClick={() => setPage("inventory")} className={`px-3 py-1 rounded border ${page==='inventory' ? 'bg-gray-900 text-white' : ''}`}>Inventory</button>
        </div>

        {page === "home" && <Home />}
        {page === "inventory" && <Inventory />}
        {page === "vehicle" && <VehiclePage vehicle={selected} />}
      </div>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-lg font-semibold">GovFleet Motors</div>
            <p className="text-sm opacity-80">Premium Used California Government Fleet Vehicles</p>
            <p className="text-xs opacity-70 mt-3">© 2025 GovFleet Motors. All Rights Reserved.</p>
          </div>
          <div>
            <div className="font-semibold">Contact</div>
            <ul className="text-sm mt-2 space-y-1 opacity-90">
              <li>1215 W. Imperial Hwy #221, Brea CA 92821</li>
              <li>Phone: <a className="underline" href="tel:+1-714-269-3483">(714) 269-3483</a></li>
              <li>Email: <a className="underline" href="mailto:GovFleetMotors@gmail.com">GovFleetMotors@gmail.com</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Hours</div>
            <ul className="text-sm mt-2 space-y-1 opacity-90">
              <li>Mon–Sat: 9:00 AM – 6:00 PM</li>
              <li>Sunday: By Appointment</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
