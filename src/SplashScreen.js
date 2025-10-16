import React, { useEffect, useState } from "react";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1500); // show for 1.5 seconds
    const finishTimer = setTimeout(onFinish, 2000); // remove after 2s
    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-[#1e2a38] text-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src="/logo.png"
        alt="GovFleet Motors Logo"
        className="w-28 h-28 mb-4 animate-bounce"
      />
      <h1 className="text-xl font-semibold tracking-wide">
        GovFleet Motors
      </h1>
      <p className="text-sm text-gray-300 mt-2">
        Premium Used Fleet Vehicles
      </p>
    </div>
  );
};

export default SplashScreen;
