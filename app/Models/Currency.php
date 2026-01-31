<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $fillable = ['nombre'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
