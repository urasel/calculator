<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\API\CalculationController;
Route::post('/calculate', [CalculationController::class, 'process']);