import { useState } from "react";

const PatientCard = ({
    patient,
    onEdit,
    onDelete,
    onDetail
}) => {

    return (
         <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start min-w-[300px]">
      <div>
        <h3 className="text-lg font-semibold">{patient.name}</h3>
        <p className="text-sm text-gray-600">{patient.email}</p>
        <p className="text-sm text-gray-600">{patient.phone || "08XXXXXXXXXX"}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onDetail(patient)}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Detail
        </button>
        <button
          onClick={() => onEdit(patient)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(patient.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
    )
}

export default PatientCard;