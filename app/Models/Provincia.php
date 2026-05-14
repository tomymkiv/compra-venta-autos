<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{
    protected $fillable = ['id', 'nombre'];

    // Una provincia tiene muchos municipios
    // FK en municipios: id_provincia → provincias.id
    public function municipios()
    {
        return $this->hasMany(Municipio::class, 'id_provincia');
    }
}
