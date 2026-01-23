<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;

abstract class Controller
{
    protected $loguedUser;
    protected $individualCarPost;
    protected $paginatedCarPosts;
    protected $paginateLimit = 4;
    public function __construct()
    {
        $this->loguedUser = Auth::user();
        $this->paginatedCarPosts = Post::with('mainImage', 'car.carModel.carBrand', 'user')
            ->whereHas('mainImage', fn($query) => $query->where('orden', 1)) // limito a los posts que tienen una imagen principal con orden = 1
            ->latest()
            ->paginate($this->paginateLimit);
    }
}