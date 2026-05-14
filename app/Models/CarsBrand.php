<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarsBrand extends Model
{
    protected $fillable = ['marca'];

    // Una marca puede tener muchos modelos de auto (ej: Toyota → Corolla, Hilux, RAV4...)
    // FK en cars_models: id_marca → cars_brands.id
    public function carModels()
    {
        return $this->hasMany(CarsModel::class, 'id_marca');
    }
}