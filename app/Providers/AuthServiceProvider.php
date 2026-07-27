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
            return $user->hasRole('VENDEDOR') ||
                $user->hasRole('SUPER_USER');
        });
        Gate::define('delete-own-post', function ($user, $post) {
            return $user->hasRole('VENDEDOR') && $user->id === $post->id_user;
        });
        Gate::define('update-own-post', function ($user, $post) {
            return $user->hasRole('VENDEDOR') && $user->id === $post->id_user;
        });

        Gate::define('delete-own-user', function ($user, $post) {
            return $user->id === $post->id_user;
        });
        Gate::define('update-own-user', function ($user, $post) {
            return ($user->id === $post->id_user);
        });
        Gate::define('update-any-post', function ($user) {
            return $user->hasRole('SUPER_USER');
        });
        Gate::define('update-any-user', function ($user) {
            return $user->hasRole('SUPER_USER');
        });
        Gate::define('delete-any-user', function ($user) {
            return $user->hasRole('SUPER_USER');
        });
        Gate::define('delete-any-post', function ($user) {
            return $user->hasRole('SUPER_USER');
        });
    }
}
