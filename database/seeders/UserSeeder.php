<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /**
         * creacion de permisos
         */
        Permission::create(['name' => 'VIEW_USER']); // USER-ADMIN
        Permission::create(['name' => 'CREATE_USER']); // USER-ADMIN
        Permission::create(['name' => 'EDIT_USER']); // USER-ADMIN
        Permission::create(['name' => 'DELETE_USER']); // USER (solo user propio)-ADMIN

        Permission::create(['name' => 'VIEW_POST']); // USER-ADMIN
        Permission::create(['name' => 'CREATE_POST']); // USER (propio)-ADMIN
        Permission::create(['name' => 'EDIT_POST']); // USER (propio)-ADMIN
        Permission::create(['name' => 'DELETE_POST']); // USER (propio)-ADMIN

        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'User (admin)',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        $userUser = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        /**
         * creacion de roles
         */
        $userRole = Role::create(['name' => 'USER']);
        $adminRole = Role::create(['name' => 'ADMIN']);

        $userAdmin = User::where('email', 'admin@example.com')->first();
        $userAdmin->assignRole($adminRole); // asigno rol de admin a ese usuario

        $userNoAdmin = User::where('email', 'user@example.com')->first();
        $userNoAdmin->assignRole($userRole); // asigno rol de user a ese usuario

        $permissionsAdmin = Permission::query()->pluck('name');
        $adminRole->syncPermissions($permissionsAdmin); // asigno TODOS los permisos de admin (CRUD de users y de posts)
        // dd($permissionsAdmin);


        $userRole->syncPermissions([
            // 'VIEW_USER',
            'EDIT_USER',
            'DELETE_USER',
            // 'VIEW_POST',
            'CREATE_POST',
            'EDIT_POST',
            // 'DELETE_POST',
        ]); // asigno ciertos permisos al rol "USER" (deberia tener todo habilitado, pero es una prueba)
    }
}
