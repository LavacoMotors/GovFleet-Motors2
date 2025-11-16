import React, { useState, useEffect } from "react";
import "./App.css";

const vehicles = [
  // 2018 Explorer – 103k
  {
    id: "explorer-2018-103k",
    name: "2018 Ford Explorer Police Interceptor",
    status: "available",
    details:
      "Former Police Vehicle • Fleet Maintained • 3.7L V6 • AWD • 103,000 miles",
    description: `2018 Ford Explorer Police Interceptor

Clean Title
Passed Smog
Current Registration 

1 Owner 
3.7L V6 - AWD (All Wheel Drive)
Well Maintained 
Ballistic Front Doors / Push Bar / Spotlights 

$8000`,
    mileage: 103000,
    price: 8000,
    images: [
      "/images/2018-ford-explorer-103k/1.JPG",
      "/images/2018-ford-explorer-103k/2.JPG",
      "/images/2018-ford-explorer-103k/3.JPG",
      "/images/2018-ford-explorer-103k/4.JPG",
      "/images/2018-ford-explorer-103k/5.JPG",
      "/images/2018-ford-explorer-103k/6.JPG",
      "/images/2018-ford-explorer-103k/7.JPG",
      "/images/2018-ford-explorer-103k/8.JPG",
      "/images/2018-ford-explorer-103k/9.JPG",
    ],
  },

  // 2017 Explorer – 96k
  {
    id: "explorer-2017-96k",
    name: "2017 Ford Explorer Police Interceptor",
    status: "available",
    details:
      "Former Police Interceptor • Fleet Maintained • 3.7L V6 • AWD • 96,000 miles",
    description: `2017 Ford Explorer Police Interceptor

✔️ 96K Original Miles
✔️ Clean Title
✔️ Just Passed Smog
✔️ Current Registration

✅ 1 Owner
✅ Fleet Maintained
✅ Recently Serviced
✅ 3.7L V6 – AWD (All-Wheel Drive)

$7,900`,
    mileage: 96000,
    price: 7900,
    images: [
      "/images/2017-ford-explorer-96k/1.JPG",
      "/images/2017-ford-explorer-96k/2.JPG",
      "/images/2017-ford-explorer-96k/3.JPG",
      "/images/2017-ford-explorer-96k/4.JPG",
      "/images/2017-ford-explorer-96k/5.JPG",
      "/images/2017-ford-explorer-96k/6.JPG",
      "/images/2017-ford-explorer-96k/7.JPG",
      "/images/2017-ford-explorer-96k/8.JPG",
      "/images/2017-ford-explorer-96k/9.JPG",
    ],
  },

  // Ambulance – 84k **UPDATED ENGINE INFO**
  {
    id: "ambulance-2010",
    name: "2010 Ford E-450 Ambulance",
    status: "available",
    details:
      "6.0L PowerStroke Turbo Diesel • Dual Rear Wheels • Fleet Maintained • Ready for Conversion or Service",
    description: `2010 Ford E-450 Ambulance

Clean Title
Passed Smog
Current Registration

Fleet Maintained
6.0L PowerStroke Turbo Diesel
Dual Rear Wheels
Ready for Conversion or Service Use`,
    mileage: 84000,
    price: 0,
    images: [
      "/images/2010-ford-e450-ambulance-84k/1.JPG",
      "/images/2010-ford-e450-ambulance-84k/2.JPG",
      "/images/2010-ford-e450-ambulance-84k/3.JPG",
      "/images/2010-ford-e450-ambulance-84k/4.JPG",
      "/images/2010-ford-e450-ambulance-84k/5.JPG",
      "/images/2010-ford-e450-ambulance-84k/6.JPG",
      "/images/2010-ford-e450-ambulance-84k/7.JPG",
      "/images/2010-ford-e450-ambulance-84k/8.JPG",
      "/images/2010-ford-e450-ambulance-84k/9.JPG",
      "/images/2010-ford-e450-ambulance-84k/10.JPG",
    ],
  },

  // Silverado – SOLD
  {
    id: "silverado-2005",
    name: "2005 Chevrolet Silverado 2500HD Utility Bed",
    status: "sold",
    details: "City Fleet Truck • 6.0L V8 • Tow Package • 165,000 miles",
    description: `2005 Chevrolet Silverado 2500 HD - 165k Miles

Clean Title 
Passed Smog
Current Registration 
1 Owner
Well Maintained 
6.0L V8 Gasoline / Tow Package 
Reliable Work Truck

$5700`,
    mileage: 165000,
    price: 5700,
    images: [
      "/images/2005-chevrolet-silverado-2500HD/1.jpeg",
      "/images/2005-chevrolet-silverado-2500HD/2.jpeg",
      "/images/2005-chevrolet-silverado-2500HD/3.jpeg",
      "/images/2005-chevrolet-silverado-2500HD/4.jpeg",
      "/images/2005-chevrolet-silverado-2500HD/5.jpeg",
      "/images/2005-chevrolet-silverado-2500HD/6.jpeg",
      "/images/2005-chevrolet-silverado-2500HD/7.jpeg",
      "/images/2005-chevrolet-silverado-2500HD/8.jpeg",
      "/images/2005-chevrolet-silverado-2500HD/9.jpeg",
    ],
  },

  // PLACEHOLDERS
  {
    id: "placeholder-1",
    name: "Coming Soon – Government Fleet Vehicle",
    status: "available",
    details: "New inventory arriving soon • Government Fleet Maintained",
    description: "New vehicle loading soon.",
    mileage: 0,
    price: 0,
    images: [],
  },
  {
    id: "placeholder-2",
    name: "Coming Soon – Government Fleet Vehicle",
    status: "available",
    details: "New inventory arriving soon • Government Fleet Maintained",
    description: "New vehicle loading soon.",
    mileage: 0,
    price: 0,
    images: [],
  },
  {
    id: "placeholder-3",
    name: "Coming Soon – Government Fleet Vehicle",
    status: "available",
    details: "New inventory arriving soon • Government Fleet Maintained",
    description: "New vehicle loading soon.",
    mileage: 0,
    price: 0,
    images: [],
  },
];

function formatMileage(miles) {
  if (!miles || miles <= 0) return "Mileage: See Details";
  return `Mileage: ${miles.toLocaleString()} miles`;
}

function formatPrice(price) {
  if (!price || price <= 0) return "Call for pricing";
  return `$${price.toLocaleString()}`;
}

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const totalVehicles = vehicles.length;
  const availableCount = vehicles.filter((v) => v.status === "available").length;
  const soldCount = vehicles.filter((v) => v.status === "sold").length;

  // sort so available vehicles always come first
  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === "available" ? -1 : 1;
  });

  const openVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedImageIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedVehicle(null);
  };

  const showPrevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === 0 ? selectedVehicle.images.length - 1 : prev - 1
    );
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === selectedVehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrevImage(e);
      if (e.key === "ArrowRight") showNextImage(e);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, selectedVehicle]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Lavaco Motors / GovFleet Motors</h1>
        <p>Premium Used Government Fleet Vehicles</p>
      </header>

      <main className="inventory-section">
        <div className="inventory-grid">
          {sortedVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`vehicle-card ${
                vehicle.status === "sold" ? "vehicle-card-sold" : ""
              }`}
              onClick={() => openVehicle(vehicle)}
            >
              <div className="vehicle-image-wrapper">
                {!!vehicle.images?.length && (
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="vehicle-image"
                  />
                )}

                {vehicle.status === "sold" && (
                  <div className="sold-banner">SOLD</div>
                )}
              </div>

              <div className="vehicle-info">
                <h2 className="vehicle-name">{vehicle.name}</h2>
                <p className="vehicle-details">{vehicle.details}</p>
                <p className="vehicle-mileage">
                  {formatMileage(vehicle.mileage)}
                </p>
                <p className={`vehicle-status status-${vehicle.status}`}>
                  {vehicle.status === "sold" ? "Sold" : "Available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {lightboxOpen && selectedVehicle && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>

            <div className="lightbox-main">
              <div className="lightbox-image-section">
                <div className="lightbox-image-wrapper">
                  <button className="lightbox-arrow lightbox-arrow-left" onClick={showPrevImage}>‹</button>
                  <img
                    src={selectedVehicle.images[selectedImageIndex]}
                    alt=""
                    className="lightbox-image"
                  />
                  <button className="lightbox-arrow lightbox-arrow-right" onClick={showNextImage}>›</button>
                </div>

                {selectedVehicle.images.length > 1 && (
                  <div className="lightbox-thumbnails">
                    {selectedVehicle.images.map((img, index) => (
                      <button
                        key={img}
                        className={`thumbnail-button ${selectedImageIndex === index ? "active" : ""}`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img src={img} alt="" className="thumbnail-image" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="lightbox-details">
                <h2>{selectedVehicle.name}</h2>
                <p className="lightbox-status">
                  Status:{" "}
                  <span className={`status-pill status-${selectedVehicle.status}`}>
                    {selectedVehicle.status === "sold" ? "Sold" : "Available"}
                  </span>
                </p>
                <p className="lightbox-mileage">{formatMileage(selectedVehicle.mileage)}</p>
                <p className="lightbox-price">Price: {formatPrice(selectedVehicle.price)}</p>
                <pre className="lightbox-description">
{selectedVehicle.description}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="inventory-footer">
        <div className="vehicle-counts">
          <p>Total Vehicles: {totalVehicles}</p>
          <p>Available: {availableCount}</p>
          <p>Sold: {soldCount}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
