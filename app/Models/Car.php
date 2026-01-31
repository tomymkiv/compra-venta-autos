<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = ['id_modelo', 'id_type', 'anio', 'kilometraje', 'tipo'];

    public function carModel()
    {
        return $this->belongsTo(CarsModel::class, 'id_modelo');
    }
    public function post()
    {
        return $this->hasOne(Post::class, 'id_car');
    }
    public function car_type()
    {
        return $this->belongsTo(CarType::class, 'id_type', 'id');
    }
}