<?php

namespace App\Http\Middleware;

use App\Models\Post;
use App\Models\User;
use Auth;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Mockery\Undefined;
use Spatie\Permission\Models\Role;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user_role = null;
        $my_user_role = null;
        $post_info = null;

        if (Auth::user()) {
            $my_user_role = $request->user()->roles->first()->name;
        }

        if ($request->routeIs('user.show')) { // si voy a ver el perfil de un usuario, busco su rol
            $user_role = User::where('id', $request->route('user'))
                ->first()
                ->roles
                ->first()
                ->name;
            // dd($user_role);// buscar rol del usuario con id de $user_role
        }
        // obtengo el posts (con sus relaciones) para poder editarlo
        if ($request->routeIs('posts.edit')) {
            $post_info = Post::with('user', 'car.carModel.carBrand', 'postImage', 'mainImage', 'municipio.provincia')
                ->find($request->route('post'));
        }
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => !$request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'user' => Auth::user(), // objeto del usuario
            'user_role' => $user_role,
            'my_user_role' => $my_user_role,
            'post_info' => $post_info
        ];
    }
}
