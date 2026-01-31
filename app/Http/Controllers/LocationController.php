<?php

namespace App\Http\Controllers;

use App\Models\Municipio;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function municipios($provinciaId)
    {
        return Municipio::where('id_provincia', $provinciaId)
            ->select('id', 'nombre')
            ->orderBy('nombre')
            ->get();
    }
}
