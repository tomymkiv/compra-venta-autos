<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarType extends Model
{
    protected $fillable = ['id', 'tipo'];

    // Un tipo puede tener muchos autos (ej: SUV → varios autos de tipo SUV)
    // FK en cars: id_type → car_types.id
    public function cars()
    {
        return $this->hasMany(Car::class, 'id_type');
    }
}