<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars_brands', function (Blueprint $table) {
            $table->id();
            $table->string('marca')->unique();
            $table->timestamps();
        });

        Schema::create('cars_models', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_marca')->constrained('cars_brands')->cascadeOnDelete();
            $table->string('modelo');
            $table->timestamps();
        });

        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_modelo')->constrained('cars_models')->cascadeOnDelete();
            $table->unsignedMediumInteger('kilometraje');
            $table->unsignedSmallInteger('anio');
            $table->tinyInteger('tipo');
            $table->timestamps();
        });
        // en caso de que el sistema crezca, esta tabla reemplazará el campo "tipo" de la tabla "cars".
        // habria que crearle su modelo y demas
        // Schema::create('car_type', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('tipo')->unique();
        // });
    }

    public function down(): void
    {
        Schema::dropIfExists('cars_brands');
        Schema::dropIfExists('cars_models');
        Schema::dropIfExists('cars');
    }
};
