<?php

namespace App\Models;

use App\Models\Post;
use Illuminate\Database\Eloquent\Model;

class PostImage extends Model
{
    protected $fillable = ['id_post', 'url', 'orden'];

    public function post(){
        return $this->belongsTo(Post::class, 'id_post');
    }
}