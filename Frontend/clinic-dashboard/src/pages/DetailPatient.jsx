import { useParams } from "react-router-dom";
import Topbar from "../components/Topbar";
import { useState } from "react";
import usePatientById from "../hooks/patient/usePatientById";
import PatientBox from "../components/DetailPatient/PatientBox"
import MedicalRecordBox from "../components/DetailPatient/MedicalRecordBox";
import AppointmentHistoryBox from "../components/DetailPatient/AppointmentHistoryBox";

const DetailPatient = () => {
    const { id } = useParams();
    const { patient, loading, error } = usePatientById(id);

    return (
        <div className="md:flex-row">
        <Topbar />
        <div className="flex justify-between mt-3 mb-4">
            <PatientBox patient={patient} />
            <MedicalRecordBox/>
           
        </div>
         <AppointmentHistoryBox/>
        </div>
    );
};

export default DetailPatient;
