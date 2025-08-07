const PatientBox = ({patient}) => {
    if (!patient) return null;
    return (
        <div className="p-4 w-1/2 rounded-xl shadow bg-white">
            <h2 className="euclid-bold">Detail Patient</h2>
              <p><strong>Nama:</strong> {patient.name}</p>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>No. HP:</strong> {patient.phone}</p>
                <p><strong>Tanggal Lahir:</strong> {
                  new Date(patient.birth_date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })
                }</p>
        </div>
    )
}

export default PatientBox;