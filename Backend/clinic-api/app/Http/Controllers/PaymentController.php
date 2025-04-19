<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{

    // Show All
    public function index()
    {
        $payments = Payment::all();
        if ($payments->isEmpty()) {
            return response()->json(['message' => 'No payments found.'], 404);
        }
        return response()->json($payments);
    }


    // Create
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'patient_id' => 'required|exists:patients,id',
                'appointment_id' => 'required|exists:appointments,id',
                'amount' => 'required|numeric',
                'payment_method' => 'required|string',
                'paid_at' => 'nullable|date',
                'status' => 'nullable|string|in:paid,unpaid,pending',
                'notes' => 'nullable|string'
            ]);

            // Cek jika 'status' ada dan bernilai 'paid', serta 'paid_at' kosong
            if (isset($validated['status']) && $validated['status'] === 'paid' && empty($validated['paid_at'])) {
                $validated['paid_at'] = now(); // Set 'paid_at' ke waktu sekarang
            }

            $payment = Payment::create($validated);

            return response()->json([
                'message' => 'Payment successfully created.',
                'data' => $payment
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->validator->errors()
            ], 422);
        }
    }



    public function show($id)
    {
        $payment = Payment::find($id);
        if (!$payment) {
            return response()->json(['message' => 'Payment not found.'], 404);
        }
        return response()->json($payment);
    }

    public function update(Request $request, $id)
    {
        $payment = Payment::find($id);
        if (!$payment) {
            return response()->json(['message' => 'Payment not found.'], 404);
        }

        $validated = $request->validate([
            'amount' => 'sometimes|numeric',
            'payment_method' => 'sometimes|string',
            'paid_at' => 'sometimes|date',
            'status' => 'sometimes|string',
            'notes' => 'nullable|string'
        ]);

        $payment->update($validated);

        return response()->json([
            'message' => 'Payment successfully updated.',
            'data' => $payment
        ], 200);
    }

    public function destroy($id)
    {
        $payment = Payment::find($id);
        if (!$payment) {
            return response()->json(['message' => 'Payment not found.'], 404);
        }

        $payment->delete();

        return response()->json(['message' => 'Payment successfully deleted.'], 200);
    }

    public function getByAppointment($appointmentId)
    {
        $payment = Payment::where('appointment_id', $appointmentId)->first();

        if (!$payment) {
            return response()->json(['message' => 'Payment not found for this appointment.'], 404);
        }

        return response()->json($payment);
    }
}
