<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    public function index()
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

    public function store(Request $request)
    {
        $role = Role::create($request->all());
        return redirect()->route('roles.index');
    }

    // public function edit(Role $role)
    // {
    //     return view('roles.edit', compact('role'));
    // }

    public function update(Request $request, Role $role)
    {
        $role->update($request->all());
        return redirect()->route('roles.index');
    }

    // public function destroy(Role $role)
    // {
    //     $role->delete();
    //     return redirect()->route('roles.index');
    // }
}
