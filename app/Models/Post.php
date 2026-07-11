<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['id_user', 'id_currency', 'id_model', 'id_body', 'kilometraje', 'anio', 'id_municipio', 'precio', 'descripcion'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
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
        return $this->hasOne(Currency::class, 'id');
    }
    public function municipio()
    {
        return $this->belongsTo(Municipio::class, 'id_municipio');
    }
    public function carModel()
    {
        return $this->belongsTo(VehicleModel::class, 'id_model');
    }
    public function vehicleBody()
    {
        return $this->belongsTo(VehicleBody::class, 'id_body');
    }
}
