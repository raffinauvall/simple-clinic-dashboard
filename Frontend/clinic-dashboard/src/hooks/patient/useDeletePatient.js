import { useState } from "react";
import { deletePatient } from "../../services/patientService";


const useDeletePatient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (id, onSuccess) => {
        setLoading(true);
        setError(null);
        try{
            await deletePatient(id);
            if (onSuccess) onSuccess()
        } catch (err){
            setError(err);
        } finally{
            setLoading(false);
        }
    };
    return { handleDelete, loading, error };
};

export default useDeletePatient;