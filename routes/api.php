<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;

// provincias
Route::get('/provincias', [LocationController::class, 'provincias']);
// municipios (todos)
Route::get('/municipios', [LocationController::class, 'municipios']);
// municipios por provincia
Route::get('/municipios/{provincia}', [LocationController::class, 'municipios_provincia']);


// marcas
Route::get('/brands', [VehicleController::class, 'brands']);
// modelos
Route::get('/models', [VehicleController::class, 'models']);
// modelos de una marca
Route::get('/brands/{brand}/models', [VehicleController::class, 'models_by_brand']);