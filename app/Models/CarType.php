<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarType extends Model
{
    protected $fillable = ['id', 'tipo'];

    public function car()
    {
        return $this->belongsTo(Car::class, 'id_car');
    }
}