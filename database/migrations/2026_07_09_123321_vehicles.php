<?php

use Illuminate\Database\Events\SchemaDumped;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("vehicle_brands", function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('logo')->default('logo');
            $table->unsignedInteger('external_id');
            $table->string('logo')->nullable();
            $table->timestamps();
        });
        Schema::create("vehicle_bodies", function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });
        // Schema::create("vehicle_drivetrains", function (Blueprint $table) {
        //     $table->id();
        //     $table->string('name');
        //     $table->timestamps();
        // });
        // Schema::create("vehicle_transmissions", function (Blueprint $table) {
        //     $table->id();
        //     $table->string('name');
        //     $table->timestamps();
        // });
        // Schema::create("vehicle_fuels", function (Blueprint $table) {
        //     $table->id();
        //     $table->string('name');
        //     $table->timestamps();
        // });
        Schema::create("vehicle_models", function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained('vehicle_brands');
            $table->string('name');
            $table->unsignedInteger('external_model_id')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_models');
        Schema::dropIfExists('vehicle_fuels');
        Schema::dropIfExists('vehicle_transmissions');
        Schema::dropIfExists('vehicle_drivetrains');
        Schema::dropIfExists('vehicle_bodies');
        Schema::dropIfExists('vehicle_brands');
    }
};
