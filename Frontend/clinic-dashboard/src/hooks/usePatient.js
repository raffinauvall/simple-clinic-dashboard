import { useEffect, useState } from "react";
import { getPatients } from "../services/patientService";

const usePatient = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPatient = async () =>{
        try{
            setLoading(true);
            const data = await getPatients();
            setPatients(data);
        } catch (err) {
            setError(err);
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatient();
    }, []);
    return {patients, loading, error, refetch: fetchPatient};
};

export default usePatient;