import React, { useState } from "react";
import usePatient from "../hooks/patient/usePatient";
import CreatePatientModal from "./modals/PatientModal/CreatePatientModal";

const Body = () => {
  const { patients, loading, error, refetch } = usePatient(); // pastikan ada refetch
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Tambahkan handler untuk refresh data setelah tambah pasien
  const handleSuccess = () => {
    refetch(); // ambil ulang data pasien
    setIsCreateOpen(false); // tutup modal
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="p-6">
      <div className="text-3xl font-bold text-black mb-5">
        Selamat Datang, admin
      </div>

      <div className="recent h-auto bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-black">Patient</div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tambah Pasien
          </button>
        </div>

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
