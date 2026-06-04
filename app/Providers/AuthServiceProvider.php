<?php

namespace App\Providers;

use Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('create-post', function ($user) {
            return $user->hasRole('VENDEDOR') || $user->hasRole('ADMIN');
        });
        Gate::define('delete-post', function ($user, $post) {
            return $user->hasRole('ADMIN') ||
                ($user->hasRole('VENDEDOR') && $user->id === $post->id_user);
        });
        Gate::define('update-post', function ($user, $post) {
            return $user->hasRole('VENDEDOR') && $user->id === $post->id_user;
        });
    }
}
