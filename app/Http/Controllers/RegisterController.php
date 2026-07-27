<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\Contact;
use App\Models\User;
use Http;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Request;
use Spatie\Permission\Models\Role;

class RegisterController extends Controller
{
    public function index()
    {
        return inertia('auth/register', [
            'rol' => session('rol', ''),
        ]);
    }
    public function roles()
    {
        return inertia('auth/roles', [
            'roles' => Role::where('is_public', true)->get(),
        ]);
    }
    public function storeRole()
    {
        session(['rol' => request('rol')]);
        return redirect()->route('auth.register');
    }
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();
        // dd($validated->rol);
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
        // $user
        $user = User::create($validated);

        if ($validated['rol']) {
            if ($validated['rol'] == 'C') {
                $user->assignRole('COMPRADOR');
            } else if ($validated['rol'] == 'V') {
                $user->assignRole('VENDEDOR');

                Contact::create([ // creo el contacto, ya que si o si debe ingresar su numero
                    'user_id' => $user->id,
                    'contacto' => $validated['contacto'],
                ]);
            } else if ($validated['rol'] == 'S') {
                $user->assignRole('SUPER_USER');
            }
        } else {
            return back()->withErrors([
                'rol' => 'El rol es obligatorio',
            ]);
        }
        event(new Registered($user));
        Auth::login($user);
        /**
         * aviso de bienvenida enviado a n8n para que genere un correo
         */
        // Http::post(env('N8N_WEBHOOK_BASE_URL') . '/new-user', [
        //     'name' => $user->name,
        //     'email' => $user->email,
        // ]);

        return redirect()->route('auth.verification');
    }
}
