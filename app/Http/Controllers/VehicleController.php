<?php

namespace App\Http\Controllers;

use App\Models\VehicleBrand;
use App\Models\VehicleModel;

class VehicleController extends Controller
{
    public function brands()
    {
        return VehicleBrand::orderBy('name', 'asc')->select('id', 'name')->get();
    }

    public function models()
    {
        // todos los modelos de los autos pero con el nombre de la marca a la que pertenecen
        // la marca se busca por id

        return VehicleModel::orderBy('name', 'asc')
            ->select('id', 'name'/* , 'brand_id'*/)
            // ->with('carBrand:id,name')
            ->get();
    }

    public function models_by_brand($brandId)
    {
        return VehicleModel::where('brand_id', $brandId)
            ->orderBy('name', 'asc')
            ->select('id', 'name')
            ->get();
    }
}
