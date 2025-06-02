import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PatientTable = ({
  patients,
  isDeleteLoading,
  deleteError,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="recent w-full bg-white rounded-xl shadow-sm p-4 overflow-x-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="text-xl sm:text-2xl euclid-semibold font-bold text-black">Patient</div>
        <button
          onClick={onEdit}
          className="w-full euclid-medium sm:w-auto px-4 py-2 bg-[#2F4EFC] text-white rounded hover:bg-blue-600 text-sm sm:text-base"
        >
          Tambah Pasien
        </button>
      </div>

      {deleteError && (
        <div className="text-red-500 mb-2 text-sm">
          Gagal menghapus data: {deleteError.message}
        </div>
      )}

      <table className="min-w-full table-auto md:table-auto">
        <thead>
          <tr className="bg-[#D9D9D9] rounded-sm text-sm sm:text-base euclid-semibold">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Gender</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4 euclid-medium">
                Belum ada pasien.
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient.id} className="text-sm sm:text-base euclid-medium">
                <td className="p-2">{patient.id}</td>
                <td className="p-2">{patient.name}</td>
                <td className="p-2">{patient.gender}</td>
                <td className="p-2">{patient.phone}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-[#2F4EFC] px-2 py-1 rounded-lg text-white hover:bg-blue-900"
                    onClick={() => onEdit(patient)}
                  >
                    <FontAwesomeIcon icon="edit" />
                  </button>
                  <button
                    className={`bg-red-500 px-2 py-1 rounded-lg text-white hover:bg-red-800 ${
                      isDeleteLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => onDelete(patient.id)}
                    disabled={isDeleteLoading}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
