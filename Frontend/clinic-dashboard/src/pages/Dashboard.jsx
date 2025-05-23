import Body from "../components/MainDashboard/Body";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  return (
    <div className="md:flex-row">
      <Topbar />
      <Body />
    </div>
  );
};

export default Dashboard;
