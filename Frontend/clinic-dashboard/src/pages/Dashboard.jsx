import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-gray-100">
        <Topbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-600">Selamat datang di sistem klinik!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
