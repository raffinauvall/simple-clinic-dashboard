import React, { useState } from "react";
import usePatientById from "../../../hooks/patient/usePatientbyId";
import WrapperPatient from "./Wrapper";
import MedicalRecordModal from "./MedicalRecordModal"; // pastikan import benar

const DetailPatientModal = ({ isOpen, onClose, patientId }) => {
  const shouldFetchPatient = isOpen && patientId;
  const { patient, loading, error } = usePatientById(shouldFetchPatient ? patientId : null);

  const [isMedicalModalOpen, setMedicalModalOpen] = useState(false);

  const handleSuccess = () => {
    setMedicalModalOpen(false);
    // Kalau perlu refresh data pasien di sini, bisa panggil refetch kalau ada
    window.location.reload(); // atau bikin useEffect + refetch
  };

  return (
    <WrapperPatient isOpen={isOpen} onClose={onClose} title="Detail Pasien">
      {!shouldFetchPatient ? (
        <p className="text-gray-500">Pilih pasien terlebih dahulu.</p>
      ) : loading ? (
        <p>Loading data pasien...</p>
      ) : error ? (
        <p className="text-red-500">Gagal memuat data pasien.</p>
      ) : patient ? (
        <div className="flex justify-between">
          <div className="col patient-detail space-y-2 text-sm">
            <p><strong>ID:</strong> {patient.id}</p>
            <p><strong>Nama:</strong> {patient.name}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Tanggal Lahir:</strong> {
                 new Date(patient.birth_date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })
                }</p>

            <p><strong>No. Telepon:</strong> {patient.phone}</p>
            <p><strong>Alamat:</strong> {patient.address}</p>
          </div>

          <div className="col medic-detail space-y-2 text-sm">
            <p className="font-bold mb-1">Medical Records:</p>
            {patient.medical_records?.length > 0 ? (
              <div className="medical-record space-y-1">
                {patient.medical_records.map((record, index) => (
                  <div key={record.id || index}>
                    <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                    <p><strong>Catatan:</strong> {record.notes}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 space-y-2">
                <p>Tidak ada medical record.</p>
                <button
                  className="bg-[#0527E6] euclid-regular text-white px-3 py-1 rounded-2xl"
                  onClick={() => setMedicalModalOpen(true)}
                >
                  Tambah Record
                </button>
              </div>
            )}
          </div>

          {/* Modal Tambah Rekam Medis */}
          <MedicalRecordModal
            isOpen={isMedicalModalOpen}
            onClose={() => setMedicalModalOpen(false)}
            onSuccess={handleSuccess}
            patient={patient}
          />
        </div>
      ) : (
        <p className="text-gray-500">Data pasien tidak ditemukan.</p>
      )}
    </WrapperPatient>
  );
};

export default DetailPatientModal;
