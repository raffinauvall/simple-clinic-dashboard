import { useEffect } from "react";

const ModalStatus = ({ isOpen, type, message, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const color = type === "success" ? "bg-green-500" : "bg-red-500";
  const border = type === "success" ? "border-green-600" : "border-red-600";

  return (
    <div className="fixed top-5 right-5 z-50 animate-fadeIn">
      <div
        className={`${color} ${border} text-white px-4 py-3 rounded shadow-lg`}
      >
        <div className="flex items-center justify-between gap-4">
          <span>{message}</span>
          <button onClick={onClose} className="font-bold">
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalStatus;
