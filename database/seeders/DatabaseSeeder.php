<?php

namespace Database\Seeders;

use App\Models\CarsBrand;
use App\Models\CarType;
use App\Models\Currency;
use App\Models\Municipio;
use App\Models\Provincia;
use App\Models\ReviewStatus;
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
        $types = "http://api-vehiculos-arg.test/api/types";
        $types_json = json_decode(file_get_contents($types), true);
        $marcas = "http://api-vehiculos-arg.test/api/brands";
        $marcas_json = json_decode(file_get_contents($marcas), true);
        $models = "http://api-vehiculos-arg.test/api/models";
        $models_json = json_decode(file_get_contents($models), true);
        // $drivetrains = "http://api-vehiculos-arg.test/api/drivetrains";
        // $drivetrains_json = json_decode(file_get_contents($drivetrains), true);
        // $transmissions = "http://api-vehiculos-arg.test/api/transmissions";
        // $transmissions_json = json_decode(file_get_contents($transmissions), true);
        // $fuels = "http://api-vehiculos-arg.test/api/fuels";
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
            if (!Provincia::where('id', $provincia->id)->exists()) {
                Provincia::create([
                    'id' => $provincia->id,
                    'nombre' => $provincia->nombre,
                ]);
            }
        }
        foreach ($localidades as $localidad) {
            if (!Municipio::where('id', $localidad->id)->exists()) {
                Municipio::create([
                    'id' => $localidad->id,
                    'nombre' => $localidad->nombre,
                    'id_provincia' => $localidad->provincia->id,
                ]);
            }
        }
        foreach ($marcas_json['data'] as $marca) {
            if (!VehicleBrand::where('external_id', $marca['id'])->exists()) {
                VehicleBrand::create([
                    'name' => $marca['name'],
                    'logo' => 'logo',
                    'external_id' => $marca['id']
                ]);
            }
        }
        foreach ($models_json['data'] as $modelo) {

            if (!VehicleModel::where('external_model_id', $modelo['id'])->exists()) {
                VehicleModel::create([
                    'brand_id' => VehicleBrand::where('external_id', $modelo['brand_id'])->first()->id,
                    'name' => $modelo['name'],
                    'external_model_id' => $modelo['id'],
                ]);
            }
        }
        foreach ($types_json['data'] as $type) {
            if (!VehicleBody::where('name', $type['name'])->exists()) {
                VehicleBody::create([
                    'name' => $type['name'],
                ]);
            }
        }
        foreach ($divisas as $divisa) {
            if (!Currency::where('nombre', $divisa)->exists()) {
                Currency::create([
                    'nombre' => $divisa
                ]);
            }
        }
        ReviewStatus::create([
            'name' => 'Ocultada',
        ]);
        ReviewStatus::create([
            'name' => 'Aprobada',
        ]);
        ReviewStatus::create([
            'name' => 'Rechazada',
        ]);
    }
}