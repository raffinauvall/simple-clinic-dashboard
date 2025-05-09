import { useState } from "react";
import { createPatient } from "../../services/patientService";
import { toast } from "sonner";

const useCreatePatient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async (patientData) => {
        setLoading(true);
        try {
            const response = await createPatient(patientData);
            toast.success('Data berhasil ditambahkan')
            return response;
        } catch (err) {
            setError(err);
            toast.error('Gagal menambahkan data')
        } finally {      
            setLoading(false);
        }
    };

    return { handleCreate, loading, error };
};

export default useCreatePatient;
