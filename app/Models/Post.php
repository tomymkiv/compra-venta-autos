<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['id_user', 'id_car', 'id_currency', 'id_municipio', 'precio', 'descripcion', 'ubicacion', 'fecha_publicacion', 'estado', 'url'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function car()
    {
        return $this->belongsTo(Car::class, 'id_car');
    }

    public function postImage()
    {
        return $this->hasMany(PostImage::class, 'id_post');
    }

    public function mainImage()
    {
        return $this->hasOne(PostImage::class, 'id_post')->orderBy('orden');
    }

    public function currency()
    {
        return $this->hasOne(Currency::class, 'id_currency');
    }
    public function municipio()
    {
        return $this->belongsTo(Municipio::class, 'id_municipio');
    }
}
