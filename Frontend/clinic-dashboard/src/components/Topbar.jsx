import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Topbar = () => {
  return (
    <div className="h-16 w-auto bg-white border-b border-gray-200 flex items-center justify-end px-6 shadow-sm">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="text-gray-600 text-2xl"
        />
        <button className="text-sm text-gray-600 hover:text-red-500 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
