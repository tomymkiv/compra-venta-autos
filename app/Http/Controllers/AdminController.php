<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    public function index()
    {
        // si el usuario logueado tiene el rol de admin, puede ingresar
        if (Auth::user()->hasRole('ADMIN')) {
            return inertia('admin/index', [
                'users' => User::whereHas('roles', function ($query) {
                    $query->where('name', 'USER');
                })->get(),
            ]);
        }
        // caso contrario, lo llevo a la pagina de bienvenida
        return redirect()->route('welcome');
    }

    public function roles()
    {
        $roles = Role::get();
        return inertia('admin/roles', [
            'roles' => $roles,
        ]);
    }

    // public function create()
    // {
    //     return view('roles.create');
    // }

    // public function store(Request $request)
    // {
    //     $role = Role::create($request->all());
    //     return redirect()->route('roles.index');
    // }
}
