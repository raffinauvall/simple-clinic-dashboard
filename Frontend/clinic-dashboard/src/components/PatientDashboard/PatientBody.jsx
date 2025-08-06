import { useState } from "react";
import PatientCard from "./PatientCard";
import PatientTable from "../PatientTable";
import usePatient from "../../hooks/patient/usePatient";
import useDeletePatient from "../../hooks/patient/useDeletePatient";
import EditPatientModal from "../modals/PatientModal/UpdatePatientModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import Navigation from "./Navigation";
import CreatePatientModal from "../modals/PatientModal/CreatePatientModal";

const PatientBody = () => {
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

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [view, setView] = useState("grid");

  const handleSuccess = () => {
    refetch();
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
    <div className="pt-4">
      
      <Navigation onChangeView={setView} />
     <button className="btn p-3 w-full mb-3 bg-[#0527E6] rounded-xl shadow-sm text-white euclid-regular" onClick={() => setIsCreateOpen(true)}>
        Tambah Pasien
      </button>
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
               onCreate={() => {
                setSelectedPatient(null); // untuk create pasien baru
                setIsCreateOpen(true);
              }}
              onEdit={(p) => {
                setSelectedPatient(p);
                setIsEditOpen(true);
              }}
              onDelete={onDelete}
            />
          ))}
          {patients.length === 0 && (
            <div className="text-gray-500 col-span-full">
              Belum ada pasien yang terdaftar.
            </div>
          )}
        </div>
      ) : (
        <PatientTable
          patients={patients}
          onEdit={(p) => {
            setSelectedPatient(p);
            setIsEditOpen(true);
          }}
          onDelete={onDelete}
          onCreate={() => {
            setSelectedPatient(null);
            setIsCreateOpen(true);
          }}
          isDeleteLoading={isDeleteLoading}
          deleteError={deleteError}
        />
      )}

      <CreatePatientModal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false)
        }}
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

export default PatientBody;
