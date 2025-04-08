<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'gender' => 'required|string',
            'birth_date' => 'required|date',
            'phone' => 'required|string',
            'address' => 'required|string'
        ]);

        $patients = Patient::create($validated);

        return response()->json([
            'message' => 'Successfully added',
            'data' => $patients
        ], 201);
    }


    public function show($id){
        $patients = Patient::find($id);
        if(!$patients){
            return response()->json(['message' => 'Patient not found'], 404);
        }

        return response()->json($patients);
    }

    public function update(Request $request, $id)
    {
        $patients = Patient::find($id);
        if (!$patients) {
            return response()->json(['message' => 'Patient not found.'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'gender' => 'required|string',
            'birth_date' => 'required|date',
            'phone' => 'required|string',
            'address' => 'required|string'
        ]);

        $patients->update($validated);

        return response()->json([
            'message' => 'Successfully updated.',
            'data' => $patients
        ], 200);
    }


    public function destroy($id){
        $patients = Patient::find($id);
        if(!$patients){
            return response()->json(['message' => 'Patient not found.'], 404);
        }

        $patients->delete();
        return response()->json(['message' => 'Successfully deleted'], 200);
    }

    
}
