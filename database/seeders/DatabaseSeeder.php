<?php

namespace Database\Seeders;

use App\Models\CarsBrand;
use App\Models\CarType;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $marcas = ['Fiat', 'Chevrolet', 'Volkswagen', 'Ford', 'Toyota', 'Peugeot'];
        $types = ['Auto', 'Camioneta/Camion', 'Moto'];

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
        foreach($types as $type){
            CarType::create([
                'tipo' => $type,
            ]);
        }
    }
}