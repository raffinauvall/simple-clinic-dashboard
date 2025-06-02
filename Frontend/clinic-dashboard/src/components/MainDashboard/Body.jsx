import React, { useState } from "react";
import usePatient from "../../hooks/patient/usePatient";
import CreatePatientModal from "../modals/PatientModal/CreatePatientModal";
import EditPatientModal from "../modals/PatientModal/UpdatePatientModal";
import useDeletePatient from "../../hooks/patient/useDeletePatient";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import patientLogo from "../../assets/img/patient_logo.png"
import doctorLogo from "../../assets/img/doctor_logo.png"
import appointmentLogo from "../../assets/img/appointment_logo.png"
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 18) return "Good Night"
    if (hour >= 15) return "Good Evening"
    if (hour >= 12) return "Good Afternoon"
    return "Good Morning"
  }


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
        {getGreeting()}, admin 
      </div>
      <div className="overflow-x-auto md:overflow-visible">
  <div className="flex md:grid md:grid-cols-3 gap-5 mb-6 w-max md:w-full">
    <div className="min-w-[250px] md:min-w-0 bg-white h-40 rounded-xl p-5 border-b-[9px] border-[#0527E6]">
      <div className="flex justify-between mb-4">
        <div className="text-xl text-gray-500 euclid-medium">Patient</div>
        <img src={patientLogo} width={30} alt="" />
      </div>
      <div className="text-5xl euclid-semibold">{patients.length}</div>
    </div>

    <div className="min-w-[250px] md:min-w-0 bg-white h-40 rounded-xl p-5 border-b-[9px] border-[#059FE6]">
      <div className="flex justify-between mb-4">
        <div className="text-xl text-gray-500 euclid-medium">Doctor</div>
        <img src={doctorLogo} width={30} alt="" />
      </div>
      <div className="text-5xl euclid-semibold"></div>
    </div>

    <div className="min-w-[250px] md:min-w-0 bg-white h-40 rounded-xl p-5 border-b-[9px] border-[#6378F3]">
      <div className="flex justify-between mb-4">
        <div className="text-xl text-gray-500 euclid-medium">Appointment</div>
        <img src={appointmentLogo} width={30} alt="" />
      </div>
      <div className="text-5xl euclid-semibold">17</div>
    </div>
  </div>
</div>

      <div className="content flex">
        <div className="recent w-full  bg-white rounded-xl shadow-sm p-4 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="text-xl sm:text-2xl euclid-semibold font-bold text-black">
              Patient
            </div>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="w-full euclid-medium sm:w-auto px-4 py-2 bg-[#2F4EFC] text-white rounded hover:bg-blue-600 text-sm sm:text-base"
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
            <thead className="">
              <tr className="bg-[#D9D9D9] rounded-sm text-sm sm:text-base euclid-semibold">
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Gender</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
           <tbody>
  {patients.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center text-gray-500 py-4 euclid-medium">
        Belum ada pasien.
      </td>
    </tr>
  ) : (
    patients.map((patient) => (
      <tr key={patient.id} className="text-sm sm:text-base euclid-medium">
        <td className="p-2">{patient.id}</td>
        <td className="p-2">{patient.name}</td>
        <td className="p-2">{patient.gender}</td>
        <td className="p-2">{patient.phone}</td>
        <td className="p-2 space-x-2">
          <button
            className="bg-[#2F4EFC] px-2 py-1 rounded-lg text-white hover:bg-blue-900"
            onClick={() => {
              setSelectedPatient(patient);
              setIsEditOpen(true);
            }}
          >
            <FontAwesomeIcon icon="edit" />
          </button>
          <button
            className={`bg-red-500 px-2 py-1 rounded-lg text-white hover:bg-red-800 ${
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
