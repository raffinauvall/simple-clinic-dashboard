import { useState } from "react";
import { deletePatient } from "../../services/patientService";
import { toast } from "sonner";


const useDeletePatient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (id, onSuccess) => {
        setLoading(true);
        setError(null);
        try{
            await deletePatient(id);
            if (onSuccess) onSuccess()
            toast.success('Data berhasil dihapus')
        } catch (err){
            setError(err);
            toast.error('Gagal menghapus data')
        } finally{
            setLoading(false);
        }
    };
    return { handleDelete, loading, error };
};

export default useDeletePatient;