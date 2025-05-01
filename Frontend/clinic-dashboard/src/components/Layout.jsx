import { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <main
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } flex-1 min-h-[100dvh] overflow-y-auto bg-gray-100 p-6 md:ml-64`} // Default ml-64 for md and up
      >
        {/* Button for toggling sidebar on mobile */}
        <button
          className="md:hidden mb-4 text-gray-700"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
      
        </button>
        {children}
      </main>
    </div>
  );
};

export default Layout;
