<?php

namespace App\Http\Middleware;

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
        if (Auth::user()) {
            $my_user_role = $request->user()->roles->first()->name;
        } else {
            $my_user_role = null;
        }

        if ($request->routeIs('user.show')) { // si voy a ver el perfil de un usuario, busco su rol
            $user_role = $request->route('user');
            $user_role = Role::where('id', $user_role)->first()->name;
        } else {
            $user_role = null;
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
        ];
    }
}
