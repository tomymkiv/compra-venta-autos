<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;

abstract class Controller
{
    protected $loguedUser;
    protected $paginatedCarPosts;
    protected $paginateLimit = 12;
    public function __construct()
    {
        $this->loguedUser = Auth::user();
        $this->paginatedCarPosts = Post::with('mainImage', 'car.carModel.carBrand', 'user', 'municipio.provincia', 'car.car_type')
            ->whereHas('mainImage') // mainImage = imagen con orden = 1
            ->latest()
            ->paginate($this->paginateLimit);
    }
}