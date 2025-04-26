import Body from "../components/Body";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-gray-100">
        <Topbar />
        <Body />
      </div>
    </div>
  );
};

export default Dashboard;
