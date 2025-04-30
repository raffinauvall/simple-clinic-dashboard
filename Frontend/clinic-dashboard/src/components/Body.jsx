import React, { useState } from "react";
import usePatient from "../hooks/patient/usePatient";
import CreatePatientModal from "./modals/PatientModal/CreatePatientModal";

const Body = () => {
  const { patients, loading, error, refetch } = usePatient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleSuccess = () => {
    refetch();
    setIsCreateOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="p-4 sm:p-6">
      <div className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-5">
        Selamat Datang, admin
      </div>

      <div className="recent bg-white rounded-xl shadow-sm p-4 overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="text-xl sm:text-2xl font-bold text-black">
            Patient
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
          >
            Tambah Pasien
          </button>
        </div>

        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-sm sm:text-base">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Gender</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b text-sm sm:text-base">
                <td className="p-2">{patient.name}</td>
                <td className="p-2">{patient.gender}</td>
                <td className="p-2">{patient.phone}</td>
                <td className="p-2">{patient.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Create Patient */}
      <CreatePatientModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Body;
