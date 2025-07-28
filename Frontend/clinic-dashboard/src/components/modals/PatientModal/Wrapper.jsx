import React from "react";

const WrapperPatient = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white-50 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-500 max-w-lg relative pt-10">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✖️
        </button>
        {children}
      </div>
    </div>
  );
};

export default WrapperPatient;
