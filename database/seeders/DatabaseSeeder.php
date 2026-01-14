<?php

namespace Database\Seeders;

use App\Models\CarsBrand;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $marcas = ['Fiat', 'Chevrolet', 'Volkswagen', 'Ford', 'Toyota'];
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        foreach ($marcas as $marca) {
            CarsBrand::create([
                'marca' => $marca,
            ]);
        }
    }
}
