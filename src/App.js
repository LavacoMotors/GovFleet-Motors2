import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // ============================
  // VEHICLE INVENTORY
  // ============================
  const vehicles = [
    // 1) 2005 Silverado – SOLD
    {
      id: 1,
      name: "2005 Chevrolet Silverado 2500HD Utility Bed",
      status: "sold",
      details: "6.0L V8 • 4x2 • City Fleet Truck • 165,000 miles",
      price: "$5,700",
      description: [
        "2005 Chevrolet Silverado 2500 HD – 165k miles.",
        "Reliable city fleet utility bed work truck recently sold. Clean, straight body and ready for jobsite duty from day one."
      ],
      features: [
        "Clean title",
        "Passed smog",
        "Current registration",
        "1 owner",
        "Well maintained",
        "6.0L V8 gasoline with tow package",
        "Reliable work truck"
      ],
      gallery: [
        "/images/2005-chevrolet-silverado-2500HD/1.jpeg",
        "/images/2005-chevrolet-silverado-2500HD/2.jpeg",
        "/images/2005-chevrolet-silverado-2500HD/3.jpeg",
        "/images/2005-chevrolet-silverado-2500HD/4.jpeg",
        "/images/2005-chevrolet-silverado-2500HD/5.jpeg",
        "/images/2005-chevrolet-silverado-2500HD/6.jpeg",
        "/images/2005-chevrolet-silverado-2500HD/7.jpeg",
        "/images/2005-chevrolet-silverado-2500HD/8.jpeg",
        "/images/2005-chevrolet-silverado-2500HD/9.jpeg"
      ]
    },

    // 2) 2010 Ford E-450 Ambulance – AVAILABLE
    {
      id: 2,
      name: "2010 Ford E-450 Ambulance",
      status: "available",
      details: "Powerstroke Turbo Diesel • 84,000 miles • Former municipal ambulance",
      price: "$13,500",
      description: [
        "Well-maintained former municipal ambulance, ready for its next chapter.",
        "Whether you're outfitting for EMS, mobile service, overlanding, or a camper conversion, this is a clean, low-mileage rig with solid bones."
      ],
      features: [
        "Powerstroke Turbo Diesel",
        "Only 84,000 original miles",
        "Clean title – one owner",
        "Fleet-maintained – Southern California",
        "Current registration",
        "Fully functioning emergency equipment: lights, siren, air horn"
      ],
      gallery: [
        "/images/2010-ford-e450-ambulance-84k/1.JPG",
        "/images/2010-ford-e450-ambulance-84k/2.JPG",
        "/images/2010-ford-e450-ambulance-84k/3.JPG",
        "/images/2010-ford-e450-ambulance-84k/4.JPG",
        "/images/2010-ford-e450-ambulance-84k/5.JPG",
        "/images/2010-ford-e450-ambulance-84k/6.JPG",
        "/images/2010-ford-e450-ambulance-84k/7.JPG",
        "/images/2010-ford-e450-ambulance-84k/8.JPG",
        "/images/2010-ford-e450-ambulance-84k/9.JPG",
        "/images/2010-ford-e450-ambulance-84k/10.JPG"
      ]
    },

    // 3) Coming soon cards
    {
      id: 3,
      name: "Coming Soon",
      status: "available",
      details: "More government fleet vehicles arriving soon.",
      gallery: ["/preview.jpg"]
    },
    {
      id: 4,
      name: "Coming Soon",
      status: "available",
      details: "New arrivals on the way.",
      gallery: ["/preview.jpg"]
    },
    {
      id: 5,
      name: "Coming Soon",
      status: "available",
      details: "Future fleet additions will appear here.",
      gallery: ["/preview.jpg"]
    }
  ];

  // ============================
  // LIGHTBOX LOGIC
  // ============================
  const openLightbox = (vehicle) => {
    setSelectedVehicle(vehicle);
    setActiveImageIndex(0);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    if (!selectedVehicle || !selectedVehicle.gallery) return;
    setActiveImageIndex((prev) => {
      const total = selectedVehicle.gallery.length;
      return (prev + 1) % total;
    });
  };

  const prevImage = () => {
    if (!selectedVehicle || !selectedVehicle.gallery) return;
    setActiveImageIndex((prev) => {
      const total = selectedVehicle.gallery.length;
      return (prev - 1 + total) % total;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
      if (!selectedVehicle) return;
      if (e.key === "ArrowRight") {
        nextImage();
      }
      if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVehicle]);

  const availableCount = vehicles.filter((v) => v.status === "available").length;
  const soldCount = vehicles.filter((v) => v.status === "sold").length;

  const scrollToInventory = () => {
    const el = document.getElementById("inventory-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ============================
  // RENDER
  // ============================
  return (
    <div className="app">
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-mark">GFM</div>
            <div className="brand-text">
              <span className="brand-name">GovFleet Motors</span>
              <span className="brand-tagline">
                Premium Used Government Fleet Vehicles
              </span>
            </div>
          </div>
          <div className="header-contact">
            <span className="header-phone">714-269-3483</span>
            <span className="header-city">Brea, California</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Premium Used Government Fleet Vehicles</h1>
            <p>
              Specializing in retired police interceptors, trucks, SUVs, and
              municipal fleet units sourced from trusted public agencies.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={scrollToInventory}>
                View Inventory
              </button>
            </div>
          </div>
        </section>

        {/* Inventory */}
        <section id="inventory-section" className="inventory-section">
          <div className="section-header">
            <h2>Current Inventory</h2>
            <p>
              Vehicles are inspected and prepared for their next assignment.{" "}
              <span className="section-sub">
                Sold units stay visible to showcase past fleet builds.
              </span>
            </p>
          </div>

          <div className="inventory-grid">
            {vehicles.map((vehicle) => {
              const thumbnail =
                vehicle.gallery && vehicle.gallery.length > 0
                  ? vehicle.gallery[0]
                  : "";
              return (
                <div
                  key={vehicle.id}
                  className={`vehicle-card ${vehicle.status}`}
                  onClick={() =>
                    vehicle.gallery && vehicle.gallery.length > 0
                      ? openLightbox(vehicle)
                      : null
                  }
                >
                  <div className="image-wrapper">
                    {thumbnail && <img src={thumbnail} alt={vehicle.name} />}
                    {vehicle.status === "sold" && (
                      <div className="sold-overlay">SOLD</div>
                    )}
                  </div>
                  <div className="card-body">
                    <h3>{vehicle.name}</h3>
                    <p>{vehicle.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <p>
            Vehicles Available: <strong>{availableCount}</strong> &nbsp;|&nbsp;
            Sold: <strong>{soldCount}</strong>
          </p>
          <p className="footer-note">
            GovFleet Motors &copy; {new Date().getFullYear()} - Premium Used
            Government Fleet Vehicles.
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {isLightboxOpen && selectedVehicle && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeLightbox}>
              ✕
            </button>

            {selectedVehicle.gallery && selectedVehicle.gallery.length > 1 && (
              <>
                <button className="nav-arrow left" onClick={prevImage}>
                  ◀
                </button>
                <button className="nav-arrow right" onClick={nextImage}>
                  ▶
                </button>
              </>
            )}

            <img
              src={selectedVehicle.gallery[activeImageIndex]}
              alt={selectedVehicle.name}
              className="lightbox-image"
            />

            <div className="lightbox-info">
              <h2>{selectedVehicle.name}</h2>
              {selectedVehicle.price && (
                <p className="lightbox-price">{selectedVehicle.price}</p>
              )}
              <p>{selectedVehicle.details}</p>

              {selectedVehicle.description &&
                selectedVehicle.description.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}

              {selectedVehicle.features && (
                <ul className="lightbox-features">
                  {selectedVehicle.features.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {selectedVehicle.gallery &&
                selectedVehicle.gallery.length > 1 && (
                  <p className="lightbox-counter">
                    Photo {activeImageIndex + 1} of{" "}
                    {selectedVehicle.gallery.length}
                  </p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
