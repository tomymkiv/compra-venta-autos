<?php

namespace Database\Seeders;

use App\Models\CarsBrand;
use App\Models\CarType;
use App\Models\Currency;
use App\Models\Localidad;
use App\Models\Municipio;
use App\Models\Provincia;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $marcas = ['Chevrolet', 'Volkswagen', 'Ford', 'Toyota', 'Peugeot', 'BMW', 'Audi', 'Mercedes-Benz', 'Renault', 'Honda', 'Hyundai', 'Kia', 'Nissan', 'Subaru', 'Suzuki', 'Volvo', 'Porsche', 'Ferrari', 'Lamborghini', 'Maserati', 'Bentley', 'Rolls-Royce', 'McLaren', 'Aston Martin', 'Jaguar', 'Land Rover', 'Mini', 'Smart', 'Acura', 'Infiniti', 'Alfa Romeo', 'Citroën', 'Dacia', 'DS', 'Fiat', 'Jeep', 'Lancia', 'Lexus', 'Lotus', 'Mitsubishi', 'Opel', 'Saab', 'Seat', 'Skoda', 'Tata', 'Yamaha', 'Motomel', 'Zanella', 'Corven', 'Gilera', 'Kymco'];
        $types = ['Auto', 'Camioneta/Camion', 'Moto'];
        $divisas = ['Dolar', 'Pesos'];
        $provincias_json = json_decode(file_get_contents("https://infra.datos.gob.ar/georef/provincias.json"));
        $provincias = $provincias_json->provincias;
        $localidades_json = json_decode(file_get_contents("https://infra.datos.gob.ar/georef/municipios.json"));
        $localidades = $localidades_json->municipios;

        foreach ($provincias as $provincia) {
            Provincia::create([
                'id' => $provincia->id,
                'nombre' => $provincia->nombre,
            ]);
        }
        foreach ($localidades as $localidad) {
            Municipio::create([
                'id' => $localidad->id,
                'nombre' => $localidad->nombre,
                'id_provincia' => $localidad->provincia->id,
            ]);
        }
        foreach ($marcas as $marca) {
            CarsBrand::create([
                'marca' => $marca,
            ]);
        }
        foreach ($types as $type) {
            CarType::create([
                'tipo' => $type,
            ]);
        }
        foreach ($divisas as $divisa) {
            Currency::create([
                'nombre' => $divisa
            ]);
        }
        $this->call([
            UserSeeder::class
        ]);
    }
}