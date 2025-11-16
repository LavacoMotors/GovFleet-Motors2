import React, { useState } from "react";
import "./App.css";

function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentDescription, setCurrentDescription] = useState("");

  const openLightbox = (gallery, index, description) => {
    setCurrentGallery(gallery);
    setCurrentImageIndex(index);
    setCurrentDescription(description);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentGallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentGallery.length - 1 : prev - 1
    );
  };

  // ============================
  // VEHICLE INVENTORY DATA
  // ============================
  const vehicles = [
    // ===================================================
    // 2005 Silverado - SOLD + updated details
    // ===================================================
    {
      id: 1,
      name: "2005 Chevrolet Silverado 2500HD Utility Bed",
      status: "sold",
      thumbnail: "/images/2005-chevrolet-silverado-2500HD/1.jpeg",
      details:
        "Clean Title • Passed Smog • Current Registration • 1 Owner • Well Maintained • 6.0L V8 Gasoline Tow Package • Reliable Fleet Work Truck • 165,000 miles",
      price: "$5,700",
      gallery: [
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
      fullDescription: `
2005 Chevrolet Silverado 2500 HD – 165k Miles

Clean Title  
Passed Smog  
Current Registration  
1 Owner  
Well Maintained  
6.0L V8 Gasoline / Tow Package  
Reliable Work Truck  

$5700
      `,
    },

    // ===================================================
    // 2010 Ford E-450 Ambulance - ACTIVE
    // ===================================================
    {
      id: 2,
      name: "2010 Ford E-450 Ambulance",
      status: "available",
      thumbnail: "/images/2010-ford-e450-ambulance-84k/1.JPG",
      details: "Powerstroke Turbo Diesel • 84,000 miles • Former municipal ambulance",
      price: "$13,500",
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
        "/images/2010-ford-e450-ambulance-84k/10.JPG",
      ],
      fullDescription: `
2010 Ford E-450 Ambulance – Only 84K Miles – $13,500

Well-maintained former municipal ambulance, ready for its next chapter.

✔ Powerstroke Turbo Diesel  
✔ 84,000 Original Miles  
✔ Clean Title – One Owner  
✔ Fleet-Maintained – Southern California  
✔ Current Registration  
✔ Fully Functioning Emergency Equipment (Lights, Siren, Air Horn)  

$13,500
      `,
    },

    // ===================================================
    // Coming Soon Placeholder Vehicles
    // ===================================================
    {
      id: 3,
      name: "Coming Soon",
      status: "coming-soon",
      thumbnail: "/preview.jpg",
      details: "More government fleet vehicles arriving soon.",
      gallery: [],
      fullDescription: "Upcoming unit. Stay tuned.",
    },
    {
      id: 4,
      name: "Coming Soon",
      status: "coming-soon",
      thumbnail: "/preview.jpg",
      details: "New arrivals on the way.",
      gallery: [],
      fullDescription: "Upcoming unit. Stay tuned.",
    },
  ];

  // ============================
  // RENDER
  // ============================

  return (
    <div className="App">

      <header className="header">
        <div className="logo">GFM</div>
        <div>
          <h2>GovFleet Motors</h2>
          <p>Premium Used Government Fleet Vehicles</p>
        </div>
        <div className="contact">
          714-269-3483<br />Brea, California
        </div>
      </header>

      <section className="hero">
        <h1>Premium Used Government Fleet Vehicles</h1>
        <p>
          Specializing in retired police interceptors, trucks, SUVs, and municipal fleet units
          sourced from trusted public agencies.
        </p>
        <button
          className="primaryButton"
          onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
        >
          View Inventory
        </button>
      </section>

      <section className="inventorySection">
        <h2>Current Inventory</h2>
        <p>Vehicles are inspected and prepared for their next assignment. Sold units stay visible to showcase past fleet builds.</p>

        <div className="inventoryGrid">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`vehicleCard ${vehicle.status}`}
              onClick={() =>
                vehicle.gallery.length > 0 &&
                openLightbox(vehicle.gallery, 0, vehicle.fullDescription)
              }
            >
              <div className="imageWrapper">
                {vehicle.status === "sold" && <span className="soldTag">SOLD</span>}
                <img src={vehicle.thumbnail} alt={vehicle.name} />
              </div>
              <h3>{vehicle.name}</h3>
              <p>{vehicle.details}</p>
            </div>
          ))}
        </div>
      </section>

      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="closeButton" onClick={closeLightbox}>×</button>

          <div className="lightboxContent" onClick={(e) => e.stopPropagation()}>
            <button className="navButton left" onClick={prevImage}>‹</button>

            <img
              src={currentGallery[currentImageIndex]}
              alt="Vehicle"
              className="lightboxImage"
            />

            <button className="navButton right" onClick={nextImage}>›</button>
          </div>

          <pre className="descriptionBox">{currentDescription}</pre>
        </div>
      )}

    </div>
  );
}

export default App;
