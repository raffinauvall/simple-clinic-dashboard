import { useState } from "react";
import { createMedicalRecord } from "../../services/medicalRecordService";
import { toast } from "sonner";

const useCreateMedicalRecord = () => {
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const handleCreate = async (medicalRecordData) => {
    try {
      setLoading(true);
      const response = await createMedicalRecord(medicalRecordData);
      toast.success("Berhasil menambahkan data");
      return response;
    } catch (err) {
      setError(err);
      toast.error("Gagal menambahkan data");
    } finally {
      setLoading(false); 
    }
  };

  return { handleCreate, loading, error };
};

export default useCreateMedicalRecord;
