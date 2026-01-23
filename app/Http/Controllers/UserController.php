<?php

namespace App\Http\Controllers;

use App\Models\Car;

class UserController extends Controller
{
    public function welcome()
    {
        // dd(Car::all());
        return inertia('welcome', [
            'loguedUser' => $this->loguedUser,
            'posts' => $this->paginatedCarPosts,
        ]);
    }
}