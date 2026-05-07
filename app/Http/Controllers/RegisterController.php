<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Http;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function index()
    {
        return inertia('auth/register');
    }
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();
        if ($validated['password'] !== $request->password_confirmation) {
            return back()->withErrors([
                'password' => 'Las contraseñas no coinciden',
            ]);
        }

        if (!$validated['avatar']) {
            $validated['avatar'] = 'https://ui-avatars.com/api/?name=' . $validated['name'] . '&background=random';
        } else {
            $path = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = $path;
        }

        $user = User::create($validated);
        $user->assignRole('USER');
        Auth::login($user);
        /**
         * aviso de bienvenida enviado a n8n para que genere un correo
         */
        // Http::post(env('N8N_WEBHOOK_BASE_URL') . '/new-user', [
        //     'name' => $user->name,
        //     'email' => $user->email,
        // ]);

        return redirect()->route('welcome');
    }
}
