<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarsBrand extends Model
{
    protected $fillable = ['marca'];

    public function carModel(){
        return $this->hasOne(CarsModel::class, 'id_modelo');
    }
}