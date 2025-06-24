import { useEffect, useState } from "react";
import axios from "axios";
import { getPatientById } from "../../services/patientService";

const usePatientById = (id) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  if (!id) {
    console.log("ID kosong, tidak fetch");
    return;
  }

  const fetchPatientById = async () => {
    try {
      console.log("Fetching patient with ID:", id); // ✅ debug
      setLoading(true);
      const response = await getPatientById(id);
      setPatient(response);
    } catch (err) {
      console.log("Error fetch:", err); // ✅ debug
      setError(err);
      setPatient(null);
    } finally {
      setLoading(false);
    }
  };

  fetchPatientById();
}, [id]);

  return { patient, loading, error };
};

export default usePatientById;
