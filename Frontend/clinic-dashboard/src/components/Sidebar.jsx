import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUserInjured,
  faCalendarCheck,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Hamburger Button for mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 text-gray-800 bg-gray-100 fixed top-0 left-0 z-50"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 transform transition-transform duration-300 z-40 md:translate-x-0`}
      >
        <div className="text-center text-xl font-bold py-5 border-b border-gray-700">
          Klinik<span className="text-blue-400">App</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <SidebarItem icon={faTachometerAlt} label="Dashboard" />
          <SidebarItem icon={faUserInjured} label="Patients" />
          <SidebarItem icon={faCalendarCheck} label="Appointments" />
          <SidebarItem icon={faMoneyBillWave} label="Payments" />
        </nav>
      </aside>
    </>
  );
};

const SidebarItem = ({ icon, label }) => (
  <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition text-sm sm:text-base">
    <FontAwesomeIcon icon={icon} />
    <span>{label}</span>
  </button>
);

export default Sidebar;
