import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [vehicleIndex, setVehicleIndex] = useState(0);

  const vehicles = [
    {
      id: 1,
      name: "2020 Chevrolet Silverado 1500 Police Special",
      image: "/images/silverado.jpg",
      status: "available",
      details: "5.3L V8 • 4x4 • Police Fleet Package • 68,000 miles",
    },
    {
      id: 2,
      name: "Coming Soon",
      image: "/images/placeholder1.jpg",
      status: "available",
      details: "More government fleet vehicles arriving soon.",
    },
    {
      id: 3,
      name: "Coming Soon",
      image: "/images/placeholder2.jpg",
      status: "sold",
      details: "Sold — stay tuned for more inventory.",
    },
    {
      id: 4,
      name: "Coming Soon",
      image: "/images/placeholder3.jpg",
      status: "available",
      details: "Future fleet additions will appear here.",
    },
  ];

  const openLightbox = (index) => {
    setVehicleIndex(index);
    setSelectedVehicle(vehicles[index]);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextVehicle = () => {
    const nextIndex = (vehicleIndex + 1) % vehicles.length;
    setVehicleIndex(nextIndex);
    setSelectedVehicle(vehicles[nextIndex]);
  };

  const prevVehicle = () => {
    const prevIndex = (vehicleIndex - 1 + vehicles.length) % vehicles.length;
    setVehicleIndex(prevIndex);
    setSelectedVehicle(vehicles[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const availableCount = vehicles.filter(v => v.status === "available").length;
  const soldCount = vehicles.filter(v => v.status === "sold").length;

  return (
    <div className="app">
      <header className="header">
        <h1>GovFleet Motors</h1>
        <h2>Premium Used Government Fleet Vehicles</h2>
      </header>

      <main className="inventory-grid">
        {vehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className={`vehicle-card ${vehicle.status}`}
            onClick={() => openLightbox(index)}
          >
            <div className="image-wrapper">
              <img src={vehicle.image} alt={vehicle.name} />
              {vehicle.status === "sold" && (
                <div className="sold-overlay">SOLD</div>
              )}
            </div>
            <h3>{vehicle.name}</h3>
            <p>{vehicle.details}</p>
          </div>
        ))}
      </main>

      <footer className="footer">
        <p>
          Vehicles Available: <strong>{availableCount}</strong> | Sold: 
          <strong>{soldCount}</strong>
        </p>
      </footer>

      {isLightboxOpen && selectedVehicle && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeLightbox}>
              ✕
            </button>
            <button className="nav-arrow left" onClick={prevVehicle}>
              ◀
            </button>
            <img
              src={selectedVehicle.image}
              alt={selectedVehicle.name}
              className="lightbox-image"
            />
            <button className="nav-arrow right" onClick={nextVehicle}>
              ▶
            </button>
            <div className="lightbox-info">
              <h2>{selectedVehicle.name}</h2>
              <p>{selectedVehicle.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
