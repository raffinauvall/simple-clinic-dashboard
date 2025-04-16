<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::all();
        if ($payments->isEmpty()) {
            return response()->json(['message' => 'No payments found.'], 404);
        }
        return response()->json($payments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'amount' => 'required|numeric',
            'payment_method' => 'required|string',
            'payment_date' => 'required|date',
            'status' => 'required|string'
        ]);

        $payment = Payment::create($validated);

        return response()->json([
            'message' => 'Payment successfully created.',
            'data' => $payment
        ], 201);
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
            'payment_date' => 'sometimes|date',
            'status' => 'sometimes|string'
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
