import { useState, useEffect } from "react";
import { createAppointment } from "../../services/appointmentService";
import { toast } from "sonner";

const useCreateAppointment = () => {
    const [loading, setLoading] = (false)
    const [error, setError] = (null)

    const handleCreate = async (appoinmentData) => {
        try{
            const response = await createAppointment(appoinmentData);
            toast.success('Data berhasil ditambahkan.');
            return response;
        } catch (err) {
            setError(err)
            toast.error('Data gagal ditambahkan.')
        } finally {
            setLoading(false);
        }
    }
    return {handleCreate, loading, error}
}

export default useCreateAppointment;