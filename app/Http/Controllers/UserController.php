<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserEditRequest;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function welcome()
    {
        // dd($this->paginatedCarPosts);
        return inertia('welcome', [
            'posts' => Post::with('mainImage', 'car.carModel.carBrand', 'user', 'municipio.provincia', 'car.car_type')
                ->whereHas('mainImage') // mainImage = imagen con orden = 1
                ->latest()
                ->paginate($this->paginateLimit),
        ]);
    }
    public function show($id)
    {
        // declaro $post como si ese usuario tuviera un posteo relacionado
        $post = Post::where('id_user', $id)
            ->with('user')
            ->get();
        // en caso de no tener ningun post, envío solo el usuario.
        $user = User::findOrFail($id);

        return inertia('user/show', [
            'post' => $post,
            'profileUser' => $user, // renombrado para no pisar el shared prop 'user' (usuario logueado)
        ]);
    }
    public function edit()
    {
        return inertia('user/edit');
    }
    public function update(UserEditRequest $request)
    {
        $user = $this->loguedUser;
        $validated = $request->validated();
        // Si no quiere cambiar contraseña, no la enviamos al update
        if (empty($validated['password'])) {
            unset($validated['password']);
        }
        // si ya existe una imagen en este perfil...
        if ($request->hasFile('avatar')) {
            //  si recibo una imagen en formato archivo, la cambio
            // (Opcional pero recomendado) borrar la anterior
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            // Guardar la nueva imagen
            $path = $request->file('avatar')->store('avatars', 'public');

            // Guardar solo la ruta en la BD
            $validated['avatar'] = $path;
        } else if (!$request->hasFile('avatar') && !is_string($validated['avatar'])) {
            // si no tengo un archivo Y lo que recibo como avatar NO es un string, mantengo mi foto de perfil
            $validated['avatar'] = $user->avatar;
        } else if (is_string($validated['avatar']) && str_contains($validated['avatar'], 'api')) {
            // si recibo un string que contiene 'api', es porque el usuario quiere eliminar la imagen de perfil, por lo que obtendra una de sus primeras 2 iniciales.
            $validated['avatar'] = $request['avatar'];
        }
        // Tampoco necesitamos guardar la confirmación
        unset($validated['password_confirmation']);
        $user->update($validated);

        return redirect()->route('user.show', $user->id);
    }
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('welcome');
    }
}