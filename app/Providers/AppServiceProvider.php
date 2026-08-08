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
        // el rol "SUPER_USER" podrá tener acceso a todos los permisos.
        Gate::before(function ($user) {
            return $user->hasRole('SUPER_USER') ? true : null;
        });
        Gate::define('create-post', function ($user) {
            return $user->hasRole('VENDEDOR') ||
                $user->hasRole('ADMIN');
        });
        Gate::define('delete-own-post', function ($user, $post) {
            return $user->hasRole('VENDEDOR') && $user->id === $post->id_user;
        });
        Gate::define('update-own-post', function ($user, $post) {
            return $user->hasRole('VENDEDOR') && $user->id === $post->id_user;
        });
        Gate::define('delete-own-user', function ($user) {
            return $user->hasRole('SUPER_USER') || $user->hasRole('VENDEDOR') || $user->hasRole('COMPRADOR');
        });
        Gate::define('update-own-user', function ($user) {
            return $user->hasRole('SUPER_USER') || $user->hasRole('VENDEDOR') || $user->hasRole('COMPRADOR');
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
        Gate::define('create-review', function ($user) {
            return $user->hasRole('COMPRADOR') || $user->hasRole('VENDEDOR') || $user->hasRole('SUPER_USER');
        });
        Gate::define('update-own-review', function ($user, $review) {
            return $user->hasRole('COMPRADOR') || $user->hasRole('VENDEDOR') || $user->hasRole('SUPER_USER') || $user->id === $review->reviewer_id;
        });
        Gate::define('delete-own-review', function ($user, $review) {
            return $user->hasRole('COMPRADOR') || $user->hasRole('VENDEDOR') || $user->hasRole('SUPER_USER') || $user->id === $review->reviewer_id;
        });
        Gate::define('delete-any-review', function ($user) {
            return $user->hasRole('SUPER_USER');
        });
        Gate::define('update-any-review', function ($user) {
            return $user->hasRole('SUPER_USER');
        });
        Gate::define('create-deal', function ($user, $post) {
            return $user->hasRole('VENDEDOR') || $user->hasRole('COMPRADOR') && $user->id !== $post->id_user;
        });
        Gate::define('update-deal', function ($user) {
            return $user->hasRole('COMPRADOR') || $user->hasRole('VENDEDOR');
        });
        Gate::define('delete-deal', function ($user) {
            return $user->hasRole('COMPRADOR') || $user->hasRole('VENDEDOR');
        });
    }
}
