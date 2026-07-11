<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema::create('car_types', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('tipo')->unique();
        //     $table->timestamps();
        // });
    }

    public function down(): void
    {
        // Schema::disableForeignKeyConstraints();
        // Schema::dropIfExists('cars');
        // Schema::dropIfExists('cars_models');
        // Schema::dropIfExists('cars_brands');
        // Schema::dropIfExists('car_types');
        // Schema::enableForeignKeyConstraints();
    }
};
