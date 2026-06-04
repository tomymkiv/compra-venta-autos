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


        $comprador = Role::create(['name' => 'COMPRADOR']);
        $vendedor = Role::create(['name' => 'VENDEDOR']);

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
    }
}
