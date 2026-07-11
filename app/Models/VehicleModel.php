<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleModel extends Model
{
    protected $casts = [
        'brand_id' => 'integer',
    ];
    protected $fillable = ['brand_id', 'name', 'external_model_id'];

    public function carBrand()
    {
        return $this->belongsTo(VehicleBrand::class, 'brand_id');
    }
    public function posts()
    {
        return $this->hasMany(Post::class, 'id_model');
    }
}
