import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { ChevronDown } from "lucide-react"; // install: npm i lucide-react

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // State waktu realtime
  const [dateTime, setDateTime] = useState(new Date());

  // Update waktu tiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format tanggal & jam sesuai kebutuhan
  const formatDateTime = (date) => {
    const day = date.getDate();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div className="h-16 w-auto rounded-xl bg-white border-b border-gray-200 flex justify-between items-center px-6 shadow-sm">
      <div className="flex items-center">
        <div className="time text-black euclid-bold">
          {formatDateTime(dateTime)}
        </div>
      </div>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-xl text-black euclid-medium transition gap-1"
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
          admin
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <ul className="py-2">
              <li>
                <a
                  href="#profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#logout"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}

        <FontAwesomeIcon
          icon={faUserCircle}
          className="text-gray-600 text-4xl"
        />
      </div>
    </div>
  );
};

export default Topbar;
