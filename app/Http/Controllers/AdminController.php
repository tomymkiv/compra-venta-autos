<?php

namespace App\Http\Controllers;

class AdminController extends Controller
{
    public function index()
    {
        return inertia('admin/index');
    }
}
