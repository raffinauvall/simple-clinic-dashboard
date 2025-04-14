<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index(){
        $appointments = Appointment::all();
        if (!$appointments){
            return response()->json(['message' => 'There are no appointment yet.']);
        }
    }
}
