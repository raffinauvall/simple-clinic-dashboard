// Navigation.jsx
import React, { useState } from "react";

const Navigation = ({ onChangeView }) => {
  const [activeView, setActiveView] = useState("grid");

  const handleViewChange = (view) => {
    setActiveView(view);
    onChangeView(view); // memanggil handler dari parent
  };

  return (
    <div className="flex justify-between mb-4">
      <div
        className={`w-full py-3 rounded-s-full flex justify-center items-center cursor-pointer ${
          activeView === "grid" ? "bg-blue-800 text-white" : "border bg-white"
        }`}
        onClick={() => handleViewChange("grid")}
      >
        <h2 className="euclid-bold">Show as Grid</h2>
      </div>
      <div
        className={`w-full py-3 rounded-e-full flex justify-center items-center cursor-pointer ${
          activeView === "table" ? "bg-blue-800 text-white" : "border bg-white"
        }`}
        onClick={() => handleViewChange("table")}
      >
        <h2 className="euclid-bold">Show as Table</h2>
      </div>
    </div>
  );
};

export default Navigation;
