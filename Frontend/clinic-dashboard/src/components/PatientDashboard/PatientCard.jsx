import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientCard = ({
    patient,
    onCreate,
    onEdit,
    onDelete,
    onDetail
}) => {

    const navigate = useNavigate();

    return (
         <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center min-w-[100%]">
      <div>
        <h3 className="text-2xl euclid-semibold">{patient.name}</h3>
        <p className="text-sm text-gray-600 euclid-regular">{patient.email}</p>
        <p className="text-sm text-gray-600 euclid-regular">{patient.phone || "08XXXXXXXXXX"}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => navigate(`/patients/${patient.id}`)}
          className="bg-blue-600 text-white euclid-regular px-3 py-1 rounded hover:bg-blue-700"
        >
          Detail
        </button>
        <button
          onClick={() => onEdit(patient)}
          className="bg-blue-500 text-white euclid-regular px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(patient.id)}
          className="bg-red-500 text-white euclid-regular px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
    )
}

export default PatientCard;