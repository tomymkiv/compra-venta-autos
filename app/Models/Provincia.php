<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{
    protected $fillable = ['id', 'nombre'];

    public function municipios()
    {
        return $this->hasMany(Municipio::class);
    }
}
