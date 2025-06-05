import React, { useState } from "react";
import usePatient from "../../hooks/patient/usePatient";
import useDeletePatient from "../../hooks/patient/useDeletePatient";
import CreatePatientModal from "../modals/PatientModal/CreatePatientModal";
import EditPatientModal from "../modals/PatientModal/UpdatePatientModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import DashboardGreeting from "./DashboardGreeting";
import DashboardCards from "./StatsCard";
import PatientTable from "./PatientTable";
import useDoctor from "../../hooks/doctor/useDoctor";
import useAppointment from "../../hooks/appointment/useAppointment";

const Body = () => {
  const {
    patients,
    loading: isPatientLoading,
    error: patientError,
    refetch,
  } = usePatient();

  const{
    doctors,
    loading: isDoctorLoading,
    error: doctorError,
  } = useDoctor();

  const {
    appointments,
    loading: isAppointmentLoading,
    error: appointmentError,
  } = useAppointment();
  

  const {
    handleDelete,
    loading: isDeleteLoading,
    error: deleteError,
  } = useDeletePatient();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
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
      <DashboardGreeting />
      <DashboardCards
      patientCount={patients.length}
      doctorCount={isDoctorLoading ? "Loading..." : doctors?.length ?? 0}
      appointmentCount={isAppointmentLoading ? "Loading..." : appointments?.length ?? 0}
      />
      <PatientTable
        patients={patients}
        isDeleteLoading={isDeleteLoading}
        deleteError={deleteError}
        onEdit={(patient) => {
          setSelectedPatient(patient);
          setIsEditOpen(true);
        }}
        onDelete={onDelete}
        onAdd={() => setIsCreateOpen(true)}
      />
      <CreatePatientModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSuccess={handleSuccess} />
      <EditPatientModal isOpen={isEditOpen} onClose={() => {
        setIsEditOpen(false);
        setSelectedPatient(null);
      }} patient={selectedPatient} onSuccess={handleSuccess} />
      <DeleteConfirmationModal isOpen={openDeleteModal} onClose={() => {
        setOpenDeleteModal(false);
        setSelectedDeleteId(null);
      }} onConfirm={confirmDelete} loading={isDeleteLoading} />
    </div>
  );
};

export default Body;
