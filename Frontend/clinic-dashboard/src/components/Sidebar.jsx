import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUserInjured,
  faCalendarCheck,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

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
        } w-64 h-screen bg-gray-200 text-white fixed top-0 left-0 transform transition-transform duration-300 z-40 md:translate-x-0`}
      >
        <div className="text-center text-3xl font-bold py-4">
          <span className="text-blue-600">MedPrime</span>
        </div>
        <nav className="flex flex-col gap-1 p-4 text-black">
          <SidebarItem className="hover:text-white" icon={faTachometerAlt} label="Dashboard" to="/" />
          <SidebarItem icon={faUserInjured} label="Patients" to="/patients" />
          <SidebarItem
            icon={faCalendarCheck}
            label="Appointments"
            to="/appointments"
          />
          <SidebarItem icon={faMoneyBillWave} label="Payments" to="/payments" />
        </nav>
      </aside>
    </>
  );
};

const SidebarItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded transition-colors duration-200 text-sm sm:text-base ${
        isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600 hover:text-white" 
      }`
    }
  >
    <FontAwesomeIcon icon={icon} />
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
