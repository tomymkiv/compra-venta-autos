<?php

namespace App\Http\Controllers;

class UserController extends Controller
{
    public function welcome()
    {
        return inertia('welcome', [
            'loguedUser' => $this->loguedUser,
            'posts' => $this->paginatedCarPosts,
        ]);
    }
}