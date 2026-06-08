<?php

namespace App\Http\Controllers;

use App\Actions\User\UpdateUserAction;
use App\Http\Requests\UserEditRequest;
use App\Models\Post;
use App\Models\User;
use Gate;

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
    public function update(UserEditRequest $request, UpdateUserAction $action)
    {
        $user = $this->loguedUser;

        if (!Gate::allows('update-user', $user)) {
            abort(403);
        }

        $action->execute($user, $request->validated(), $request);

        return redirect()->route('user.show', $user->id);
    }
    public function destroy(User $user)
    {
        if (!Gate::allows('delete-user', $user)) {
            abort(403);
        }

        $user->delete();
        return redirect()->route('welcome');
    }
}