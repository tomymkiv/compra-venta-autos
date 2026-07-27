<?php

namespace App\Http\Controllers;

use App\Actions\Posts\UpdatePostAction;
use App\Actions\User\UpdateUserAction;
use App\Http\Requests\PostUpdateRequest;
use App\Http\Requests\UserEditRequest;
use App\Models\Currency;
use App\Models\Post;
use App\Models\PostImage;
use App\Models\Provincia;
use App\Models\User;
use App\Models\VehicleBody;
use App\Models\VehicleBrand;
use Auth;
use Cache;
use Gate;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    protected function clearCache()
    {
        Cache::forget('sidebar_currencies');
        Cache::forget('sidebar_brands');
        Cache::forget('sidebar_provincias');
        Cache::forget('sidebar_municipios');
        Cache::forget('sidebar_vehicle_bodies');
        Cache::forget('sidebar_roles');
    }
    public function index()
    {
        return inertia('admin/index');
    }

    public function users()
    {
        // si el usuario logueado tiene el rol de admin, puede ingresar
        // cambiar por "SUPER_USER" cuando este rol esté bien configurado
        $user = Auth::user();

        if ($user && $user->hasRole('SUPER_USER') && $user->email_verified_at != null) {
            return inertia('admin/users/index', [
                'users' => User::with('rol')->orderBy('name', 'asc')
                    ->where('id', '!=', $user->id)
                    ->paginate(4),
                // que no muestre el usuario que está logueado
                // faltan los roles de estos usuarios
            ]);
        }
        // caso contrario, lo llevo a la pagina de bienvenida
        return redirect()->route('welcome');
    }

    public function posts()
    {
        // si el usuario logueado tiene el rol de admin, puede ingresar
        // cambiar por "SUPER_USER" cuando este rol esté bien configurado
        $user = Auth::user();

        if ($user && $user->hasRole('SUPER_USER') && $user->email_verified_at != null) {
            return inertia('admin/posts/index', [
                'posts' => Post::with('user', 'mainImage', 'carModel.carBrand')
                    ->orderBy('created_at', 'asc')
                    ->paginate(2),
                // 'posts' => Post::with('user', 'mainImage', 'carModel.carBrand')->where('id', '>', 0)->paginate(1)
            ]);
        }
        // caso contrario, lo llevo a la pagina de bienvenida
        return redirect()->route('welcome');
    }
    public function edit_post($id)
    {
        $post = Post::with('user', 'carModel.carBrand', 'postImage', 'mainImage', 'municipio.provincia')
            ->findOrFail($id);
        if (!Gate::allows('update-post', $post)) {
            abort(403);
        }
        return inertia('admin/posts/edit', [
            'postData' => $post,
            'carBrands' => VehicleBrand::orderBy('name', 'asc')->get(),
            'vehicleBodies' => VehicleBody::orderBy('name', 'asc')->get(),
            'currencies' => Currency::get(),
            'provincias' => Provincia::orderBy('nombre', 'asc')->get(),
        ]);
    }
    public function update_post(PostUpdateRequest $request, Post $post, UpdatePostAction $updatePostAction)
    {
        if (!Gate::allows('update-any-post', $post)) {
            abort(403);
        }

        if (!$request['main_image']) {
            return redirect()->back();
        }

        $updatePostAction->execute($post, $request->validated(), $request);
        $this->clearCache();
        return redirect()->route('admin.posts.index');
    }
    public function edit_user(User $user)
    {
        return inertia('admin/users/edit', [
            'profile_user' => $user,
        ]);
    }
    public function update_user(UserEditRequest $request, UpdateUserAction $action, $id)
    {
        $user = User::findOrFail($id);

        if (!Gate::allows('update-any-user', $user)) {
            abort(403);
        }

        $action->execute($user, $request->validated(), $request);

        return redirect()->route('admin.users.index');
    }
    public function delete_post(Post $post)
    {
        if (!Gate::allows('delete-any-post', $post)) {
            abort(403);
        }
        $post->delete();
    }
    public function delete_user(User $user)
    {
        if (!Gate::allows('delete-any-user', $user)) {
            abort(403);
        }
        $user->delete();
    }
    // public function roles()
    // {
    //     $roles = Role::get();
    //     return inertia('admin/roles', [
    //         'roles' => $roles,
    //     ]);
    // }

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
