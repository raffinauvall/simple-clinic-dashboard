<?php

use App\Http\Controllers\DoctorController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::apiResource('patients', PatientController::class);

Route::apiResource('doctors', DoctorController::class);


Route::apiResource('medical-records', MedicalRecordController::class);
Route::get('medical-records/patients/{patient_id}', [MedicalRecordController::class, 'getByPatient']);



Route::apiResource('appointments', AppointmentController::class);
Route::get('appointments/patient/{patientId}', [AppointmentController::class, 'getByPatientId']);


Route::apiResource('payments', PaymentController::class);
Route::get('payments/appointment/{appointmentId}', [PaymentController::class, 'getByAppointment']);


