import { useState } from "react";
import { updatePatient } from "../../services/patientService"; // Pastikan method ini udah ada
import { toast } from "sonner";

const useUpdatePatient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async (id, data, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      await updatePatient(id, data);
      if (onSuccess) onSuccess();
      toast.success('Data berhasil diubah')
    } catch (err) {
      setError(err);
      toast.error('Gagal mengubah data')
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdate, loading, error };
};

export default useUpdatePatient;
