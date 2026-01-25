<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function index()
    {
        return inertia('auth/register');
    }
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:8',
        ]);
        if ($validated['password'] !== $request->password_confirmation) {
            return back()->withErrors([
                'password' => 'Las contraseñas no coinciden',
            ]);
        }
        $user = User::create($validated);
        Auth::login($user);
        return redirect()->route('welcome');
    }
}
