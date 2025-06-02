import { useEffect, useState } from "react";
import { getDoctor } from "../../services/doctorService"

const useDoctor = () => {
    const [doctor, setDoctor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const fetchDoctor = async () => {
        try {
            setLoading(true);
            const data = await getDoctor();
            setDoctor(data);
        } catch (err){
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDoctor()
    }, []);
    return { doctor, loading, error , refetch: fetchDoctor };
}

export default useDoctor;