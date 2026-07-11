<?php

namespace Database\Seeders;

use App\Models\CarsBrand;
use App\Models\CarType;
use App\Models\Currency;
use App\Models\Municipio;
use App\Models\Provincia;
use App\Models\VehicleBody;
use App\Models\VehicleBrand;
use App\Models\VehicleModel;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $types = "http://api-autos-arg.test/api/types";
        $types_json = json_decode(file_get_contents($types), true);
        $marcas = "http://api-autos-arg.test/api/brands";
        $marcas_json = json_decode(file_get_contents($marcas), true);
        $models = "http://api-autos-arg.test/api/models";
        $models_json = json_decode(file_get_contents($models), true);
        // $drivetrains = "http://api-autos-arg.test/api/drivetrains";
        // $drivetrains_json = json_decode(file_get_contents($drivetrains), true);
        // $transmissions = "http://api-autos-arg.test/api/transmissions";
        // $transmissions_json = json_decode(file_get_contents($transmissions), true);
        // $fuels = "http://api-autos-arg.test/api/fuels";
        // $fuels_json = json_decode(file_get_contents($fuels), true);
        $divisas = ['Dolar', 'Pesos'];
        $provincias_json = json_decode(file_get_contents("https://infra.datos.gob.ar/georef/provincias.json"));
        $provincias = $provincias_json->provincias;
        $localidades_json = json_decode(file_get_contents("https://infra.datos.gob.ar/georef/municipios.json"));
        $localidades = $localidades_json->municipios;

        $this->call([
            UserSeeder::class
        ]);

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
        foreach ($marcas_json['data'] as $marca) {
            VehicleBrand::create([
                'name' => $marca['name'],
                'logo' => 'logo',
                'external_id' => $marca['id']
            ]);
        }
        foreach ($models_json['data'] as $modelo) {
            VehicleModel::create([
                'brand_id' => VehicleBrand::where('external_id', $modelo['brand_id'])->first()->id,
                'name' => $modelo['name'],
                'external_model_id' => $modelo['id'],
            ]);
        }
        foreach ($types_json['data'] as $type) {
            VehicleBody::create([
                'name' => $type['name'],
            ]);
        }
        foreach ($divisas as $divisa) {
            Currency::create([
                'nombre' => $divisa
            ]);
        }
    }
}