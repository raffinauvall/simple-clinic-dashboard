import React, { use, useState } from "react";
import { createMedicalRecord } from "../../services/medicalRecordService";
import { toast } from "sonner";

const useCreateMedicalRecord = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleCreate = async (medicalRecordData) => {
        try{
            const response = await createMedicalRecord(medicalRecordData);
            toast.success("Berhasil menambahkan data");
            return response;
        } catch (err){
            setError(err);
        } finally {
            setLoading(true);
        }
    };
     return {handleCreate, loading, error};
};

export default useCreateMedicalRecord;