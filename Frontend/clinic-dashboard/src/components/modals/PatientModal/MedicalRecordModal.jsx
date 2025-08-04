import React, { useEffect, useState } from "react";
import useCreateMedicalRecord from "../../../hooks/medical-record/useCreateMedicalRecord";
import useDoctor from "../../../hooks/doctor/useDoctor";
import ModalWrapper from "../modalWrapper";

const MedicalRecordModal = ({ isOpen, onClose, onSuccess, patient }) => {
  const { handleCreate, loading, error } = useCreateMedicalRecord();
  const { doctors, loading: loadingDoctors, error: doctorError } = useDoctor();

  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    visit_date: "",
    diagnosis: "",
    treatment: "",
    notes: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData((prev) => ({
        ...prev,
        patient_id: patient.id,
      }));
    }
  }, [patient]);

const handleChange = (e) => {
  const { name, value } = e.target;
  let parsedValue = value;

  if (["doctor_id", "patient_id"].includes(name)) {
    parsedValue = value ? Number(value) : "";
  }

  setFormData((prev) => ({
    ...prev,
    [name]: parsedValue,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreate(formData);
    onSuccess();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Tambah Rekam Medis">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="patient_id" value={formData.patient_id} />
        <select
          name="doctor_id"
          value={formData.doctor_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih Dokter</option>
          {loadingDoctors ? (
            <option disabled>Memuat daftar dokter...</option>
          ) : doctors?.length > 0 ? (
            doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))
          ) : (
            <option disabled>Tidak ada dokter tersedia</option>
          )}
        </select>

        <input
          type="date"
          name="visit_date"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="diagnosis"
          placeholder="Diagnosis"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="treatment"
          placeholder="Pengobatan"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="notes"
          placeholder="Catatan Tambahan"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {error && <div className="text-red-500">{error.message}</div>}
        {doctorError && <div className="text-red-500">{doctorError.message}</div>}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-400 text-white rounded"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default MedicalRecordModal;
