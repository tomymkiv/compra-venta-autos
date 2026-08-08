<?php

namespace Database\Seeders;

use App\Models\Contact;
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
        $comprador = null;
        $vendedor = null;
        $admin = null;
        /**
         * creacion de permisos
         */
        if (!Permission::where("name", "CREATE_POST")->exists()) {
            Permission::create(['name' => 'CREATE_POST']);
        }

        if (!Permission::where("name", "EDIT_OWN_USER")->exists()) {
            Permission::create(['name' => 'EDIT_OWN_USER']);
        }

        if (!Permission::where("name", "DELETE_OWN_USER")->exists()) {
            Permission::create(['name' => 'DELETE_OWN_USER']);
        }
        if (!Permission::where("name", "EDIT_OWN_POST")->exists()) {
            Permission::create(['name' => 'EDIT_OWN_POST']);
        }
        if (!Permission::where("name", "DELETE_OWN_POST")->exists()) {
            Permission::create(['name' => 'DELETE_OWN_POST']);
        }

        if (!Permission::where("name", "DELETE_ANY_POST")->exists()) {
            Permission::create(['name' => 'DELETE_ANY_POST']);
        }

        if (!Permission::where("name", "EDIT_ANY_POST")->exists()) {
            Permission::create(['name' => 'EDIT_ANY_POST']);
        }
        if (!Permission::where("name", "DELETE_ANY_USER")->exists()) {
            Permission::create(['name' => 'DELETE_ANY_USER']);
        }
        if (!Permission::where("name", "EDIT_ANY_USER")->exists()) {
            Permission::create(['name' => 'EDIT_ANY_USER']);
        }
        if (!Permission::where("name", "CREATE_REVIEW")->exists()) {
            Permission::create(['name' => 'CREATE_REVIEW']);
        }
        if (!Permission::where("name", "UPDATE_OWN_REVIEW")->exists()) {
            Permission::create(['name' => 'UPDATE_OWN_REVIEW']);
        }
        if (!Permission::where("name", "DELETE_OWN_REVIEW")->exists()) {
            Permission::create(['name' => 'DELETE_OWN_REVIEW']);
        }
        if (!Permission::where("name", "UPDATE_ANY_REVIEW")->exists()) {
            Permission::create(['name' => 'UPDATE_ANY_REVIEW']);
        }
        if (!Permission::where("name", "DELETE_ANY_REVIEW")->exists()) {
            Permission::create(['name' => 'DELETE_ANY_REVIEW']);
        }

        if (!Role::where('name', 'COMPRADOR')->exists()) {
            $comprador = Role::create(['name' => 'COMPRADOR', 'is_public' => true]);
        } else {
            $comprador = Role::where('name', 'COMPRADOR')->first();
        }

        if (!Role::where('name', 'VENDEDOR')->exists()) {
            $vendedor = Role::create(['name' => 'VENDEDOR', 'is_public' => true]);
        } else {
            $vendedor = Role::where('name', 'VENDEDOR')->first();
        }

        if (!Role::where('name', 'SUPER_USER')->exists()) {
            $admin = Role::create(['name' => 'SUPER_USER', 'is_public' => false]);
        } else {
            $admin = Role::where('name', 'SUPER_USER')->first();
        }

        $vendedor->syncPermissions([
            'EDIT_OWN_USER',
            'DELETE_OWN_USER',
            'CREATE_POST',
            'EDIT_OWN_POST',
            'DELETE_OWN_POST',
            'CREATE_REVIEW',
            'UPDATE_OWN_REVIEW',
            'DELETE_OWN_REVIEW',
        ]);

        $comprador->syncPermissions([
            'EDIT_OWN_USER',
            'DELETE_OWN_USER',
            'CREATE_REVIEW',
            'UPDATE_OWN_REVIEW',
            'DELETE_OWN_REVIEW',
        ]);

        $admin->syncPermissions([
            'CREATE_POST',
            'EDIT_OWN_POST',
            'DELETE_OWN_POST',
            'EDIT_ANY_POST',
            'DELETE_ANY_POST',


            'DELETE_OWN_USER',
            'EDIT_OWN_USER',
            'EDIT_ANY_USER',
            'DELETE_ANY_USER',

            'CREATE_REVIEW',
            'DELETE_ANY_REVIEW',
            'UPDATE_ANY_REVIEW',
        ]);

        if (!User::where('email', 'correo@gmail.com')->first()) {
            User::create([
                'name' => 'Administrador',
                'avatar' => 'https://ui-avatars.com/api/?name=Administrador&color=FF0000&size=128&rounded=true&bold=true&background=random&bold=true&size=256',
                'email_verified_at' => now(),
                'email' => 'correo@gmail.com',
                'password' => bcrypt('password'),
            ])->assignRole($admin);
            Contact::create([
                'user_id' => User::where('email', 'correo@gmail.com')->first()->id,
                'contacto' => 12345678,
            ]);
        }
        User::create([
            'name' => 'Vendedor seeder',
            'avatar' => 'https://ui-avatars.com/api/?name=Vendedor seeder&color=FF0000&size=128&rounded=true&bold=true&background=random&bold=true&size=256',
            'email_verified_at' => now(),
            'email' => "vendedor@gmail.com",
            'password' => bcrypt('password'),
        ])->assignRole($vendedor);
        Contact::create([
            'user_id' => User::where('email', 'vendedor@gmail.com')->first()->id,
            'contacto' => 13391111,
        ]);
        User::create([
            'name' => 'Comprador seeder',
            'avatar' => 'https://ui-avatars.com/api/?name=Comprador seeder&color=FF0000&size=128&rounded=true&bold=true&background=random&bold=true&size=256',
            'email_verified_at' => now(),
            'email' => "comprador@gmail.com",
            'password' => bcrypt('password'),
        ])->assignRole($comprador);
    }
}
