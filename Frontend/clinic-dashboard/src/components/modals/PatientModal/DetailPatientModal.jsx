import React from "react";
import usePatientById from "../../../hooks/patient/usePatientbyId";
import ModalWrapper from "../modalWrapper";

const DetailPatientModal = ({ isOpen, onClose, patientId }) => {
  // Jangan fetch kalau modal belum dibuka atau belum ada patientId
  const shouldFetch = isOpen && patientId;
  const { patient, loading, error } = usePatientById(shouldFetch ? patientId : null);

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Detail Pasien">
      {!shouldFetch ? (
        <p className="text-gray-500">Pilih pasien terlebih dahulu.</p>
      ) : loading ? (
        <p>Loading data pasien...</p>
      ) : error ? (
        <p className="text-red-500">Gagal memuat data pasien.</p>
      ) : patient ? (
        <div className="space-y-2 text-sm">
          <p><strong>ID:</strong> {patient.id}</p>
          <p><strong>Nama:</strong> {patient.name}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Tanggal Lahir:</strong> {patient.birth_date}</p>
          <p><strong>No. Telepon:</strong> {patient.phone}</p>
          <p><strong>Alamat:</strong> {patient.address}</p>
        </div>
      ) : (
        <p className="text-gray-500">Data pasien tidak ditemukan.</p>
      )}
    </ModalWrapper>
  );
};

export default DetailPatientModal;
