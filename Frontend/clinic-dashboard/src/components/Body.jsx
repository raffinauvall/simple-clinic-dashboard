import React, { useState } from "react";
import usePatient from "../hooks/patient/usePatient";
import CreatePatientModal from "./modals/PatientModal/CreatePatientModal";
import useDeletePatient from "../hooks/patient/useDeletePatient";

const Body = () => {
  const {
    patients,
    loading: isPatientLoading,
    error: patientError,
    refetch,
  } = usePatient();
  const {
    handleDelete,
    loading: isDeleteLoading,
    error: deleteError,
  } = useDeletePatient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleSuccess = () => {
    refetch();
    setIsCreateOpen(false);
  };

  const onDelete = (id) => {
    if (confirm("Yakin mau hapus data ini?")) {
      handleDelete(id, () => {
        alert("Data berhasil dihapus");
        refetch(); // Refresh data abis hapus
      });
    }
  };

  if (isPatientLoading) return <div>Loading data pasien...</div>;
  if (patientError) return <div>Error saat ambil data pasien</div>;

  return (
    <div className="p-4 sm:p-6">
      <div className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-5">
        Selamat Datang, admin
      </div>
      <div className="content flex flex-col md:flex-row gap-4">
        <div className="recent w-full md:w-3/4 bg-white rounded-xl shadow-sm p-4 overflow-x-auto">
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

          {deleteError && (
            <div className="text-red-500 mb-2 text-sm">
              Gagal menghapus data: {deleteError.message}
            </div>
          )}

          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-sm sm:text-base">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Gender</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Address</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b text-sm sm:text-base">
                  <td className="p-2">{patient.name}</td>
                  <td className="p-2">{patient.gender}</td>
                  <td className="p-2">{patient.phone}</td>
                  <td className="p-2">{patient.address}</td>
                  <td className="p-2 space-x-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => {
                        // nanti bisa navigate ke halaman edit
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={`text-red-500 hover:underline ${
                        isDeleteLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => onDelete(patient.id)}
                      disabled={isDeleteLoading}
                    >
                      {isDeleteLoading ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full md:w-1/4 shadow-sm rounded-lg bg-white h-30"></div>
      </div>

      <CreatePatientModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Body;
