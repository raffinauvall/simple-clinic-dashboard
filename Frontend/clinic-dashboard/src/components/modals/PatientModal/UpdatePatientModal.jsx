import { useState, useEffect } from "react";
import useUpdatePatient from "../../../hooks/patient/useUpdatePatient";

const EditPatientModal = ({ isOpen, onClose, patient, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    address: "",
    birth_date: "",
  });

  const { handleUpdate, loading, error } = useUpdatePatient();

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || "",
        gender: patient.gender || "",
        phone: patient.phone || "",
        address: patient.address || "",
        birth_date: patient.birth_date
          ? new Date(patient.birth_date).toISOString().slice(0, 10)
          : "",
      });
    }
  }, [patient]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      birth_date: new Date(formData.birth_date).toISOString().slice(0, 10),
    };

    handleUpdate(patient.id, formattedData, () => {
      alert("Berhasil diupdate");
      onSuccess();
      onClose();
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white-20 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Pasien</h2>
        {error && <div className="text-red-500 mb-2">{error.message}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Name"
            className="border p-2 w-full"
          />
          <input
            name="gender"
            value={formData.gender}
            onChange={onChange}
            placeholder="Gender"
            className="border p-2 w-full"
          />
          <input
            name="birth_date"
            value={formData.birth_date}
            onChange={onChange}
            placeholder="Birth Date"
            className="border p-2 w-full"
            type="date"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="Phone"
            className="border p-2 w-full"
          />
          <input
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Address"
            className="border p-2 w-full"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
