<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = ['id_modelo', 'anio','kilometraje', 'tipo'];

    public function carModel(){
        return $this->belongsTo(CarsModel::class, 'id_modelo');
    }
}