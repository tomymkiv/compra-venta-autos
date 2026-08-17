<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class OAuthController extends Controller
{
    public function redirectToGoogle(Request $request)
    {
        $rol = $request->input('rol');
        $contacto = $request->input('contacto');

        if ($rol) {
            $request->session()->put('oauth_rol', $rol);
        }
        if ($contacto) {
            $request->session()->put('oauth_contacto', $contacto);
        }

        $url = Socialite::driver("google")->redirect()->getTargetUrl();
        return Inertia::location($url);
    }
    public function handleGoogleCallback(Request $request)
    {
        $user = Socialite::driver('google')->user();
        $findUser = User::where('google_id', $user->id)->first();

        if ($findUser) { // si el usuario existe, inicio sesion
            Auth::login($findUser);
        } else { // si no existe, creo el usuario
            $rol = $request->session()->pull('oauth_rol');
            $contacto = $request->session()->pull('oauth_contacto');

            if (!$rol) {
                return Inertia::location(route('auth.register', [
                    'error' => 'Ocurrio un problema al iniciar sesion. Contacte al administrador.',
                ]));
            }

            $newUser = User::create([
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'google_id' => $user->id,
                'password' => bcrypt(Str::random(32)),
                'email_verified_at' => now(),
            ]);

            if ($rol === 'V') {
                $newUser->assignRole('VENDEDOR');
            } else if ($rol === 'C') {
                $newUser->assignRole('COMPRADOR');
            }

            if ($contacto) {
                Contact::create([
                    'user_id' => $newUser->id,
                    'contacto' => $contacto,
                ]);
            }
            Auth::login($newUser);
        }

        return Inertia::location(route('welcome'));
    }
}