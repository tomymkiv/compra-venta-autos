<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function index()
    {
        // pagina donde coloco el correo para resetear la contraseña
        return inertia('auth/forgot-password');
    }
    public function send(Request $request)
    {
        // envio la notificacion al correo
        $request->validate([
            'email' => 'required|email',
        ]);
        Password::sendResetLink($request->toArray());

        return redirect()->back();
    }
    public function update(Request $request)
    {
        // momento en el que se restablece la clave
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);
        Password::reset($request->toArray(), function ($user, $password) {
            $user->password = bcrypt($password);
            $user->save();
            return redirect()->route('auth.login');
        });
    }
}
