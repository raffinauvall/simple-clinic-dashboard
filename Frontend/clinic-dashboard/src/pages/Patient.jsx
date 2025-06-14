import PatientBody from "../components/PatientDashboard/PatientBody";
import Topbar from "../components/Topbar";

const Patient = () => {
  return (
    <div className="md:flex-row">
      <Topbar />
      <PatientBody />
    </div>
  );
};

export default Patient;
