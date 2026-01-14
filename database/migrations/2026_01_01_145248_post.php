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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users')->cascadeOnDelete();
            $table->foreignId('id_car')->constrained('cars')->cascadeOnDelete();
            $table->bigInteger('precio')->default(0);
            $table->text('descripcion')->nullable();
            $table->tinyText('ubicacion')->isNotEmpty();
            $table->timestamp('fecha_publicacion')->isNotEmpty();
            $table->string('estado');
            $table->timestamps();
        });
        Schema::create('post_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_post')->constrained('posts')->cascadeOnDelete();
            $table->string('url');
            $table->tinyInteger('orden'); // es el orden con el que se verían las imagenes
            $table->unique(['id_post', 'orden']); // para que no exista más de 1 imagen del mismo post con un numero de orden repetido (post=1 y orden=1 sin duplicado)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_images');
        Schema::dropIfExists('posts');
    }
};