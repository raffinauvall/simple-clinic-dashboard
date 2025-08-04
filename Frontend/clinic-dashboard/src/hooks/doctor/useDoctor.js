// hooks/doctor/useDoctor.js
import { useEffect, useState } from "react";
import { getDoctor } from "../../services/doctorService";

const useDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await getDoctor();
      setDoctors(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return { doctors, loading, error };
};

export default useDoctor;
