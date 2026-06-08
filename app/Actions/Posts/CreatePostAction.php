<?php

namespace App\Actions\Posts;

use App\Models\Car;
use App\Models\CarsModel;
use App\Models\CarType;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class CreatePostAction
{
    public function execute(array $validated, $mainImage, array $images): Post
    {
        $carModel = CarsModel::create([
            'id_marca' => $validated['marca'],
            'modelo' => $validated['modelo'],
        ]);

        $car = Car::create([
            'id_modelo' => $carModel->id,
            'id_type' => CarType::findOrFail($validated['tipo'])->id,
            'anio' => $validated['anio'],
            'kilometraje' => $validated['kilometraje'],
        ]);

        $post = Post::create([
            'id_user' => Auth::id(),
            'id_car' => $car->id,
            'id_currency' => $validated['moneda'],
            'id_municipio' => $validated['municipio'],
            'descripcion' => $validated['descripcion'],
            'fecha_publicacion' => now(),
            'precio' => $validated['precio'],
        ]);

        $post->postImage()->create([
            'url' => $mainImage->store('posts', 'public'),
            'orden' => 1,
        ]);

        foreach ($images as $i => $image) {
            $post->postImage()->create([
                'url' => $image->store('posts', 'public'),
                'orden' => $i + 2,
            ]);
        }

        return $post;
    }
}
