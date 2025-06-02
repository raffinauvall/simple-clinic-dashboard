import { useState, useEffect } from "react";
import { createDoctor } from "../../services/doctorService";
import { toast } from "sonner";

const useCreateDoctor = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleCreate = async (doctorData) => {
        setLoading(true);
        try {
            const response = await createDoctor(doctorData);
            toast.success("Data berhasil ditambahkan");
            return response;
        } catch (err){
            setError(err);
            toast.error("Gagal menambahkan data")
        } finally {
            setLoading(false);
        }
    };
    return {handleCreate, loading, error};

};

export default useCreateDoctor;