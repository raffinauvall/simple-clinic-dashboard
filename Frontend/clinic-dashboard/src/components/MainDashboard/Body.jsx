import React, { useState } from "react";
import usePatient from "../../hooks/patient/usePatient";
import CreatePatientModal from "../modals/PatientModal/CreatePatientModal";
import EditPatientModal from "../modals/PatientModal/UpdatePatientModal";
import useDeletePatient from "../../hooks/patient/useDeletePatient";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
library.add(faTrash, faEdit)

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
  const [isEditOpen, setIsEditOpen] = useState(false); // buat modal edit
  const [selectedPatient, setSelectedPatient] = useState(null); // data pasien yg mau diedit
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);



  const handleSuccess = () => {
    refetch();
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setSelectedPatient(null);
  };

  const onDelete = (id) => {
    setSelectedDeleteId(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedDeleteId) return;

    handleDelete(selectedDeleteId, () => {
      setOpenDeleteModal(false);
      setSelectedDeleteId(null);
      refetch();
    });
  };
  

  if (isPatientLoading) return <div>Loading data pasien...</div>;
  if (patientError) return <div>Error saat ambil data pasien</div>;

  return (
    <div className="p-4 sm:p-6">
      <div className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-5 euclid-bold">
        Good Night, admin 
      </div>
      <div className="flex justify-center gap-5 mb-6">
        <div className="patient bg-white h-40 rounded-xl w-100 p-5">
          <div className="text-xl euclid-medium">
            Patient
          </div>
        </div>
        <div className="doctor bg-white h-40 rounded-xl w-100"></div>
        <div className="appointment bg-white h-40 rounded-xl w-100"></div>
      </div>
      <div className="content flex">
        <div className="recent w-full  bg-white rounded-xl shadow-sm p-4 overflow-x-auto">
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

          <table className="min-w-full table-auto md:table-auto">
            <thead>
              <tr className="bg-gray-200 text-sm sm:text-base font-euclid">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Gender</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Address</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
           <tbody>
  {patients.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center text-gray-500 py-4">
        Belum ada pasien.
      </td>
    </tr>
  ) : (
    patients.map((patient) => (
      <tr key={patient.id} className="border-b text-sm sm:text-base">
        <td className="p-2">{patient.name}</td>
        <td className="p-2">{patient.gender}</td>
        <td className="p-2">{patient.phone}</td>
        <td className="p-2">{patient.address}</td>
        <td className="p-2 space-x-2">
          <button
            className="bg-blue-500 px-2 py-1 rounded-sm text-white hover:bg-blue-800"
            onClick={() => {
              setSelectedPatient(patient);
              setIsEditOpen(true);
            }}
          >
            <FontAwesomeIcon icon="edit" />
          </button>
          <button
            className={`bg-red-500 px-2 py-1 rounded-sm text-white hover:bg-red-800 ${
              isDeleteLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => onDelete(patient.id)}
            disabled={isDeleteLoading}
          >
            <FontAwesomeIcon icon="trash" />
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>
        </div>

       
      </div>

      <CreatePatientModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={handleSuccess}
      />

      <EditPatientModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedPatient(null);
        }}
        patient={selectedPatient}
        onSuccess={handleSuccess}
      />
      <DeleteConfirmationModal
        isOpen={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedDeleteId(null);
        }}
        onConfirm={confirmDelete}
        loading={isDeleteLoading}
      />
    </div>
  );
};

export default Body;
