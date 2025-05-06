import { useState } from "react";
import { updatePatient } from "../../services/patientService"; // Pastikan method ini udah ada

const useUpdatePatient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async (id, data, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      await updatePatient(id, data);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdate, loading, error };
};

export default useUpdatePatient;
