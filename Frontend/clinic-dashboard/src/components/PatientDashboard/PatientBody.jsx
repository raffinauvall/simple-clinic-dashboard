import { useState } from "react";
import PatientCard from "./PatientCard";
import usePatient from "../../hooks/patient/usePatient";
import useDeletePatient from "../../hooks/patient/useDeletePatient";
import EditPatientModal from "../modals/PatientModal/UpdatePatientModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";

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
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onEdit={(p) => {
              setSelectedPatient(p);
              setIsEditOpen(true);
            }}
            onDelete={onDelete}
            onDetail={(p) => {
              console.log("Detail clicked", p);
            }}
          />
        ))}
        {patients.length === 0 && (
          <div className="text-gray-500 col-span-full">Belum ada pasien yang terdaftar.</div>
        )}
      </div>

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
