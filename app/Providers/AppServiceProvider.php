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
        // el rol "ADMIN" podrá tener acceso a todos los permisos.
        Gate::before(function ($user, $ability) {
            return $user->hasRole('ADMIN') ? true : null;
        });
    }
}
