import React, { useState, useEffect } from "react";
import "./App.css";

const DEFAULT_IMAGE = "/preview.jpg";

const vehicles = [
  // REAL INVENTORY
  {
    id: "explorer-2018-103k",
    type: "inventory",
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
  {
    id: "explorer-2017-96k",
    type: "inventory",
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
  {
    id: "ambulance-2010",
    type: "inventory",
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
  {
    id: "silverado-2005",
    type: "inventory",
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

  // COMING SOON PLACEHOLDERS
  {
    id: "placeholder-1",
    type: "placeholder",
    name: "Coming Soon – Government Fleet Vehicle",
    status: "coming-soon",
    details: "New inventory arriving soon • Government Fleet Maintained",
    description: "New vehicle coming soon. Check back for photos and full details.",
    mileage: 0,
    price: 0,
    images: [],
  },
  {
    id: "placeholder-2",
    type: "placeholder",
    name: "Coming Soon – Government Fleet Vehicle",
    status: "coming-soon",
    details: "New inventory arriving soon • Government Fleet Maintained",
    description: "New vehicle coming soon. Check back for photos and full details.",
    mileage: 0,
    price: 0,
    images: [],
  },
  {
    id: "placeholder-3",
    type: "placeholder",
    name: "Coming Soon – Government Fleet Vehicle",
    status: "coming-soon",
    details: "New inventory arriving soon • Government Fleet Maintained",
    description: "New vehicle coming soon. Check back for photos and full details.",
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

function getMainImage(vehicle) {
  if (vehicle.images && vehicle.images.length > 0) return vehicle.images[0];
  return DEFAULT_IMAGE;
}

function getLightboxImage(vehicle, index) {
  if (vehicle.images && vehicle.images.length > 0) {
    return vehicle.images[index];
  }
  return DEFAULT_IMAGE;
}

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const inventoryVehicles = vehicles.filter((v) => v.type === "inventory");
  const placeholderVehicles = vehicles.filter((v) => v.type === "placeholder");

  const totalVehicles = inventoryVehicles.length;
  const availableCount = inventoryVehicles.filter(
    (v) => v.status === "available"
  ).length;
  const soldCount = inventoryVehicles.filter(
    (v) => v.status === "sold"
  ).length;

  const sortedInventory = [...inventoryVehicles].sort((a, b) => {
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
    if (
      !selectedVehicle ||
      !selectedVehicle.images ||
      selectedVehicle.images.length <= 1
    )
      return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? selectedVehicle.images.length - 1 : prev - 1
    );
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    if (
      !selectedVehicle ||
      !selectedVehicle.images ||
      selectedVehicle.images.length <= 1
    )
      return;
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
      {/* HEADER */}
      <header className="app-header">
        <div className="app-header-inner">
          <div>
            <h1>GovFleet Motors</h1>
            <p>Premium Used Government Fleet Vehicles</p>
            <p className="app-header-contact">
              📞 714-269-3483 • 1215 W. Imperial Hwy #221, Brea CA 92821
            </p>
          </div>
          <div className="header-actions">
            <a href="tel:17142693483" className="btn btn-primary">
              Call Now
            </a>
            <a
              href="https://www.google.com/maps?q=1215+W+Imperial+Hwy+%23221,+Brea,+CA+92821"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Navigate
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* INVENTORY SECTION */}
        <section className="inventory-section">
          <h2 className="section-title">Current Inventory</h2>
          <div className="inventory-grid">
            {sortedInventory.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`vehicle-card ${
                  vehicle.status === "sold" ? "vehicle-card-sold" : ""
                }`}
                onClick={() => openVehicle(vehicle)}
              >
                <div className="vehicle-image-wrapper">
                  <img
                    src={getMainImage(vehicle)}
                    alt={vehicle.name}
                    className="vehicle-image"
                  />
                  {vehicle.status === "sold" && (
                    <div className="sold-banner">SOLD</div>
                  )}
                </div>

                <div className="vehicle-info">
                  <h3 className="vehicle-name">{vehicle.name}</h3>
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

          {/* COMING SOON SECTION */}
          {placeholderVehicles.length > 0 && (
            <section className="coming-soon-section">
              <h2 className="section-title">Coming Soon</h2>
              <div className="coming-soon-grid">
                {placeholderVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="coming-soon-card">
                    <div className="coming-soon-image-wrapper">
                      <img
                        src={getMainImage(vehicle)}
                        alt={vehicle.name}
                        className="coming-soon-image"
                      />
                    </div>
                    <div className="coming-soon-info">
                      <h3>{vehicle.name}</h3>
                      <p>{vehicle.details}</p>
                      <p>Mileage: See Details</p>
                      <p className="coming-soon-label">Coming Soon</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>

        {/* ABOUT SECTION */}
        <section className="about-section">
          <div className="section-inner">
            <h2>About GovFleet Motors</h2>
            <p>
              GovFleet Motors specializes in premium used government fleet
              vehicles based in Brea, California. We focus on well-maintained
              units such as Police Interceptors, work trucks, ambulances, and
              municipal fleet vehicles.
            </p>
            <p>
              Our vehicles are typically one-owner, fleet-maintained units with
              detailed service histories. Each vehicle is carefully selected,
              inspected, and prepared so you get a reliable workhorse for your
              business, agency, or personal use.
            </p>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section">
          <div className="section-inner">
            <h2>Contact GovFleet Motors</h2>
            <p>
              <strong>Phone:</strong> 714-269-3483
            </p>
            <p>
              <strong>Address:</strong> 1215 W. Imperial Hwy #221, Brea CA
              92821
            </p>
            <p>
              <strong>Email:</strong> govfleetmotors@gmail.com
            </p>
            <div className="contact-buttons">
              <a href="tel:17142693483" className="btn btn-primary">
                Call Now
              </a>
              <a
                href="https://www.google.com/maps?q=1215+W+Imperial+Hwy+%23221,+Brea,+CA+92821"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Navigate with Maps
              </a>
            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="map-section">
          <div className="section-inner">
            <h2>Find Us</h2>
            <p>Located in Brea, California.</p>
            <div className="map-wrapper">
              <iframe
                title="GovFleet Motors Location"
                src="https://www.google.com/maps?q=1215+W+Imperial+Hwy+%23221,+Brea,+CA+92821&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      {/* LIGHTBOX */}
      {lightboxOpen && selectedVehicle && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ×
            </button>

            <div className="lightbox-main">
              <div className="lightbox-image-section">
                <div className="lightbox-image-wrapper">
                  {selectedVehicle.images &&
                    selectedVehicle.images.length > 1 && (
                      <button
                        className="lightbox-arrow lightbox-arrow-left"
                        onClick={showPrevImage}
                      >
                        ‹
                      </button>
                    )}

                  <img
                    src={getLightboxImage(
                      selectedVehicle,
                      selectedImageIndex
                    )}
                    alt={selectedVehicle.name}
                    className="lightbox-image"
                  />

                  {selectedVehicle.images &&
                    selectedVehicle.images.length > 1 && (
                      <button
                        className="lightbox-arrow lightbox-arrow-right"
                        onClick={showNextImage}
                      >
                        ›
                      </button>
                    )}
                </div>

                {selectedVehicle.images &&
                  selectedVehicle.images.length > 1 && (
                    <div className="lightbox-thumbnails">
                      {selectedVehicle.images.map((img, index) => (
                        <button
                          key={img + index}
                          className={`thumbnail-button ${
                            index === selectedImageIndex ? "active" : ""
                          }`}
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          <img
                            src={img}
                            alt={`${selectedVehicle.name} thumbnail ${
                              index + 1
                            }`}
                            className="thumbnail-image"
                          />
                        </button>
                      ))}
                    </div>
                  )}
              </div>

              <div className="lightbox-details">
                <h2>{selectedVehicle.name}</h2>
                <p className="lightbox-status">
                  Status:{" "}
                  <span
                    className={`status-pill status-${selectedVehicle.status}`}
                  >
                    {selectedVehicle.status === "sold" ? "Sold" : "Available"}
                  </span>
                </p>
                <p className="lightbox-mileage">
                  {formatMileage(selectedVehicle.mileage)}
                </p>
                <p className="lightbox-price">
                  Price: {formatPrice(selectedVehicle.price)}
                </p>
                <pre className="lightbox-description">
{selectedVehicle.description}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="inventory-footer">
        <div className="vehicle-counts">
          <p><strong>GovFleet Motors</strong></p>
          <p>📞 714-269-3483</p>
          <p>📍 1215 W. Imperial Hwy #221, Brea CA 92821</p>
          <p>Total Vehicles: {totalVehicles}</p>
          <p>Available: {availableCount}</p>
          <p>Sold: {soldCount}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
