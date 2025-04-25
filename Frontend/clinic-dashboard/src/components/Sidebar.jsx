import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUserInjured,
  faCalendarCheck,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col">
      <div className="text-center text-2xl font-bold py-5 border-b border-gray-700">
        Klinik<span className="text-blue-400">App</span>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        <SidebarItem icon={faTachometerAlt} label="Dashboard" />
        <SidebarItem icon={faUserInjured} label="Patients" />
        <SidebarItem icon={faCalendarCheck} label="Appointments" />
        <SidebarItem icon={faMoneyBillWave} label="Payments" />
      </nav>
    </aside>
    // Keren bgt bro
  );
};

const SidebarItem = ({ icon, label }) => (
  <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition text-sm">
    <FontAwesomeIcon icon={icon} />
    <span className="text-lg">{label}</span>
  </button>
);

export default Sidebar;
