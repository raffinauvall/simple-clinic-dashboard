<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    // Function for getAll()
    public function index(){
        $medicalrecords = MedicalRecord::all();

        if($medicalrecords->isEmpty()){
            return response()->json(['message' => 'There are no medical record yet'],404);
        }
        return response()->json($medicalrecords);
    }

    // Function for post()
    public function store(Request $request){
        $validated = $request->validate([
                'patient_id' => 'required|exists:patients,id',
                'doctor_id' => 'required|exists:doctors,id',
                'visit_date' => 'required|date',
                'diagnosis' => 'required|string',
                'treatment' => 'required|string',
                'notes' => 'nullable|string',
        ]);
        $medicalrecords = MedicalRecord::create($validated);
        return response()->json([
            'message' => 'Successfully created.',
            'data' => $medicalrecords
    ],201);
    }

    // Function for getById()
    public function show($id){
        $medicalrecords = MedicalRecord::find($id); 
        if (!$medicalrecords){
            return response()->json(['message' => 'Record not found.'],404);
        }
        return response()->json($medicalrecords);
    }

    // Function for update()
    public function update(Request $request,$id){
        $medicalrecords = MedicalRecord::find($id);
        if (!$medicalrecords){
            return response()->json(['message' => 'Record not found'],404);
        }
        $validated = $request->validate([
            'visit_date' => 'sometimes|date',
            'diagnosis' => 'sometimes|string',
            'treatment' => 'sometimes|string',
            'notes' => 'nullable|string',
        ]);
        $medicalrecords->update($validated);
        return response()->json([
            'message' => 'Successfully created.',
            'data' => $medicalrecords
        ], 201);        
    }

    // Function for delete()
    public function destroy($id){
        $medicalrecords = MedicalRecord::find($id);
        if(!$medicalrecords){
            return response()->json(['message' => 'Record not found'],404);
        }

        $medicalrecords->delete();
        return response()->json(['message' => 'Successfully deleted.'],201);
    }

    // Get record by calling patient_id
    public function getByPatient($patientId)
    {
        $medicalrecords = MedicalRecord::with('doctor', 'patient') 
            ->where('patient_id', $patientId)
            ->get();

        if ($medicalrecords->isEmpty()) {
            return response()->json([
                'message' => 'No medical records found for this patient.'
            ], 404);
        }

        return response()->json($medicalrecords);
    }

}


