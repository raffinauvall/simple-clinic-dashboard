import { useState } from "react";
import { createPatient } from "../../services/patientService";

const useCreatePatient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const create = async (patientData) => {
        setLoading(true);
        try {
            const response = await createPatient(patientData);
            return response;
        } catch (err) {
            setError(err);
        } finally {      
            setLoading(false);
        }
    };

    return { create, loading, error };
};

export default useCreatePatient;
