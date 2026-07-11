<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleBrand extends Model
{
    protected $fillable = ['name', 'external_id'];

    // Una marca puede tener muchos modelos de auto (ej: Toyota → Corolla, Hilux, RAV4...)
    // FK en cars_models: id_marca → cars_brands.id
    public function carModels()
    {
        return $this->hasMany(VehicleModel::class, 'brand_id');
    }
}