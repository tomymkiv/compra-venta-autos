<?php

namespace Database\Seeders;

use App\Models\CarsBrand;
use Illuminate\Database\Seeder;

class CarBrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $marcas = [
            'Fiat',
            'Chevrolet',
            'Ford',
            'Alfa romeo',
            'Volkswagen'];
        $llave = array_rand($marcas);
        $marca = $marcas[$llave];

        for ($i = 0; $i < $marcas; $i++) {
            CarsBrand::create([
                'id' => rand(1, 100000),
                'marca' => $marca,
            ]);
        }
    }
}
