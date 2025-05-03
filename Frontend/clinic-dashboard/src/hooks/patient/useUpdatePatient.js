import { useState } from "react";
import { updatePatient } from "../../services/patientService";

const useUpdatePatient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const update = async (id, patientData) => {
        setLoading(true);
        try{
            const response = await updatePatient(patientData);
            return response;
        } catch (err){ 
            setError(err)
        } finally{
            setLoading(false)
        }
    }
    return {loading, error, update}
}

export default useUpdatePatient;