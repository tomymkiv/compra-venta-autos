<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    protected $fillable = ['id', 'nombre', 'id_provincia'];

    public function provincia()
    {
        return $this->belongsTo(Provincia::class, 'id_provincia');
    }
    public function posts()
    {
        return $this->hasMany(Post::class, 'id_municipio');
    }
}