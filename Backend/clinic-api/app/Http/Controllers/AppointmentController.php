<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // Tampilkan semua appointment
    public function index()
    {
        $appointments = Appointment::with(['patient', 'doctor'])->get();

        if ($appointments->isEmpty()) {
            return response()->json(['message' => 'No appointments found.'], 404);
        }

        return response()->json($appointments);
    }

    // Tambah appointment
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required',
            'status' => 'in:scheduled,completed,canceled',
            'notes' => 'nullable|string',
        ]);

        $appointment = Appointment::create($validated);

        return response()->json([
            'message' => 'Appointment created successfully.',
            'data' => $appointment
        ], 201);
    }

    // Update appointment
    public function update(Request $request, $id)
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found.'], 404);
        }

        $validated = $request->validate([
            'appointment_date' => 'sometimes|date',
            'appointment_time' => 'sometimes',
            'status' => 'sometimes|in:scheduled,completed,canceled',
            'notes' => 'nullable|string',
        ]);

        $appointment->update($validated);

        return response()->json([
            'message' => 'Appointment updated successfully.',
            'data' => $appointment
        ], 200);
    }

    public function destroy($id)
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found.'], 404);
        }

        $appointment->delete();

        return response()->json(['message' => 'Appointment deleted successfully.'], 200);
    }

    // Get appointment berdasarkan patient_id
    public function getByPatientId($patientId)
    {
        $appointments = Appointment::with('doctor')->where('patient_id', $patientId)->get();

        if ($appointments->isEmpty()) {
            return response()->json(['message' => 'No appointments found for this patient.'], 404);
        }

        return response()->json($appointments);
    }
}
