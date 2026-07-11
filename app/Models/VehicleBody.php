<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleBody extends Model
{
    protected $fillable = ['id', 'name'];

    public function posts()
    {
        return $this->hasMany(Post::class, 'id_body');
    }
}