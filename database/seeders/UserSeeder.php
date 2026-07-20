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
        Permission::create(['name' => 'DELETE_USER']); // USER (propio)-ADMIN

        Permission::create(['name' => 'DELETE_EXTERNAL_POST']); // ADMIN
        Permission::create(['name' => 'EDIT_EXTERNAL_USER']);// ADMIN
        Permission::create(['name' => 'DELETE_EXTERNAL_USER']); // ADMIN
        Permission::create(['name' => 'EDIT_EXTERNAL_POST']); // ADMIN

        Permission::create(['name' => 'VIEW_POST']); // USER-ADMIN
        Permission::create(['name' => 'CREATE_POST']); // USER-ADMIN
        Permission::create(['name' => 'EDIT_POST']); // USER-ADMIN
        Permission::create(['name' => 'DELETE_POST']); // USER (propio)-ADMIN


        $comprador = Role::create(['name' => 'COMPRADOR']);
        $vendedor = Role::create(['name' => 'VENDEDOR']);
        $admin = Role::create(['name' => 'SUPER_USER']);

        $vendedor->syncPermissions([
            'VIEW_USER',
            'CREATE_USER',
            'EDIT_USER',
            'DELETE_USER',
            'VIEW_POST',
            'CREATE_POST',
            'EDIT_POST',
            'DELETE_POST',
        ]);

        $comprador->syncPermissions([
            'VIEW_USER',
            'CREATE_USER',
            'EDIT_USER',
            'DELETE_USER',
            'VIEW_POST',
        ]);

        $admin->syncPermissions([
            'VIEW_USER',
            'CREATE_USER',
            'EDIT_USER',
            'DELETE_USER',
            'VIEW_POST',
            'CREATE_POST',
            'EDIT_POST',
            'DELETE_POST',
            'DELETE_EXTERNAL_POST',
            'EDIT_EXTERNAL_USER',
            'DELETE_EXTERNAL_USER',
            'EDIT_EXTERNAL_POST',
        ]);
    }
}