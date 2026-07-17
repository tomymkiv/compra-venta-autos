<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        return inertia('auth/login');
    }
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        // pregunto si se validaron correctamente los datos
        if (!Auth::attempt($validated, $request->boolean('remember'))) {
            return back()->withErrors([
                'email' => 'Email o contraseña incorrectos',
            ]);
        }

        return redirect()->route('welcome');
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('auth.login');
    }
}