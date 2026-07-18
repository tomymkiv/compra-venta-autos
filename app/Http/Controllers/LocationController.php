<?php

namespace App\Http\Controllers;

use App\Models\Municipio;
use App\Models\Provincia;

class LocationController extends Controller
{
    public function provincias()
    {
        return Provincia::orderBy('nombre', 'asc')->select('id', 'nombre')->get();
    }

    public function municipios()
    {
        return Municipio::orderBy('nombre', 'asc')->select('id', 'nombre')->get();
    }

    public function municipios_provincia($provinciaId)
    {
        return Municipio::where('id_provincia', $provinciaId)
            ->select('id', 'nombre')
            ->orderBy('nombre')
            ->get();
    }
}
