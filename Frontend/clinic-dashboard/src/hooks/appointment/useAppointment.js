import { useState, useEffect } from "react";
import { getAppointment } from "../../services/appointmentService";

const useAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchAppointment = async () => {
        try {
            setLoading(true);
            const data = await getAppointment();
            setAppointments(data);
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAppointment()
    }, []);
    return { appointments, loading, error, refetch: fetchAppointment };
}

export default useAppointment;