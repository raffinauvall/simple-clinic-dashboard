import patientLogo from "../../assets/img/patient_logo.png";
import doctorLogo from "../../assets/img/doctor_logo.png";
import appointmentLogo from "../../assets/img/appointment_logo.png";

const StatsCards = ({ patientCount, doctorCount }) => {
  return (
    <div className="overflow-x-auto md:overflow-visible">
      <div className="flex md:grid md:grid-cols-3 gap-5 mb-6 w-max md:w-full">
        <Card title="Patient" count={patientCount} borderColor="#0527E6" img={patientLogo} />
        <Card title="Doctor" count={doctorCount} borderColor="#059FE6" img={doctorLogo} />
        <Card title="Appointment" count={17} borderColor="#6378F3" img={appointmentLogo} />
      </div>
    </div>
  );
};

const Card = ({ title, count, borderColor, img }) => (
  <div className={`min-w-[250px] md:min-w-0 bg-white h-40 rounded-xl p-5 border-b-[9px]`} style={{ borderBottomColor: borderColor }}>
    <div className="flex justify-between mb-4">
      <div className="text-xl text-gray-500 euclid-medium">{title}</div>
      <img src={img} width={30} alt={title} />
    </div>
    <div className="text-5xl euclid-semibold">{count}</div>
  </div>
);

export default StatsCards;
