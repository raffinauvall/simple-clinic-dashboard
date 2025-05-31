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
        className="md:hidden p-4 text-gray-800 fixed top-0 left-0 z-50"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-64 w-full h-screen bg-white text-white fixed top-0 left-0 transform transition-transform duration-300 pt-5 z-40 md:translate-x-0`}
      >
        <div className="text-center text-4xl euclid-bold py-4">
          <span className="text-black">Med</span>
          <span className="text-[#0527E6]">Prime</span>
        </div>
        <nav className="flex flex-col gap-5 p-4 text-black">
          <SidebarItem icon={faTachometerAlt} label="Dashboard" to="/" />
          <SidebarItem icon={faUserInjured} label="Patients" to="/patients" />
          <SidebarItem icon={faCalendarCheck} label="Appointments" to="/appointments" />
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
      `flex items-center gap-7 px-3 py-2 rounded-xl euclid-medium transition-colors duration-200 text-xl sm:text-xl ${
        isActive ? "bg-[#0527E6] text-white" : "hover:bg-[#0527E6] hover:text-white"
      }`
    }
  >
    <FontAwesomeIcon icon={icon} />
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
