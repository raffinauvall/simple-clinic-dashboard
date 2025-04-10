<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function index(){
        $doctors = Doctor::all();
        
        if($doctors->isEmpty()){
            return response()->json(['message' => 'There are no doctors yet.'], 404);
        }

        return response()->json($doctors);
    }

    public function show($id){
        $doctors = Doctor::find($id);
        if(!$doctors){
            return response()->json(['message' => 'Doctor not found.'],404);
        }

        return response()->json($doctors);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required|string',
            'specialization' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|string',
            'address' => 'required|string'
        ]);

        $doctors = Doctor::create($validated);
        return response()->json([
            'message' => 'Successfully added.',
            'data' => $doctors
        ],201);
    }

    public function update(Request $request, $id){
        $doctors = Doctor::find($id);
        if(!$doctors){
            return response()->json(['message' => 'Doctor not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'specialization' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|string',
            'address' => 'required|string'
        ]);

        $doctors->update($validated);
        return response()->json([
            'message' => 'Successfully added.',
            'data' => $doctors
        ], 201);
    }

    public function destroy($id){
        $doctors = Doctor::find($id);
        if(!$doctors){
            return response()->json(['message' => 'Doctor not found.'], 404);
        }

        $doctors->delete();
        return response()->json([
            'message' => 'Successfully deleted'
        ],201);
    }
}
