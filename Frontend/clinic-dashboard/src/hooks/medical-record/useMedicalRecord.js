import { useEffect, useState } from "react";
import { getMedicalRecord } from "../../services/medicalRecordService";

const useMedicalRecord = () => {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMedicalRecord = async () => {
        try{
            setLoading(true);
            const data = await getMedicalRecord();
            setMedicalRecords(data)
        } catch (err) {
            setError(error)
        }
    };
    useEffect(() => {
        fetchMedicalRecord()
    }, []);
    return {medicalRecords, loading, error, refetch: fetchMedicalRecord};
}

export default useMedicalRecord;