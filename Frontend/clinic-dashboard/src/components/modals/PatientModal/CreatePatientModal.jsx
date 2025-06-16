// src/components/modals/PatientModal/CreatePatientModal.jsx
import React, { useState } from "react";
import ModalWrapper from "../modalWrapper";
import useCreatePatient from "../../../hooks/patient/useCreatePatient";

const CreatePatientModal = ({ isOpen, onClose, onSuccess }) => {
  const { handleCreate, loading, error } = useCreatePatient();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birth_date: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await handleCreate(formData);
    onSuccess();
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Tambah Pasien</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Pasien"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="gender"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="number"
          name="phone"
          placeholder="Nomor Telepon"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Alamat"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Input untuk birth_date */}
        <input
          type="date"
          name="birth_date"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {error && <div className="text-red-500">{error.message}</div>}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default CreatePatientModal;
