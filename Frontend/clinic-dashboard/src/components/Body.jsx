import React from "react";
import usePatient from "../hooks/patient/usePatient";

const Body = () => {
  const { patients, loading, error } = usePatient();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something when wrong</div>;
  return (
    <div className="p-6">
      <div className="text-3xl font-bold text-black mb-5">
        Selamat Datang, admin
      </div>
      <div className="recent h-auto bg-white rounded-xl shadow-sm p-4">
        <div className="text-2xl font-bold text-black">Patient</div>
        <table className="w-full mt-4 table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="p-2">{patient.name}</td>
                <td className="p-2">{patient.gender}</td>
                <td className="p-2">{patient.phone}</td>
                <td className="p-2">{patient.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Body;
