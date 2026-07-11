<?php

namespace App\Actions\Posts;

use App\Models\Car;
use App\Models\CarsModel;
use App\Models\CarType;
use App\Models\Post;
use App\Models\VehicleModel;
use Illuminate\Support\Facades\Auth;

class CreatePostAction
{
    public function execute(array $validated, $mainImage, array $images): Post
    {
        $post = Post::create([
            'id_user' => Auth::id(),
            'id_model' => VehicleModel::where('id', $validated['modelo'])->first()->id,
            'id_currency' => $validated['moneda'],
            'id_municipio' => $validated['municipio'],
            'id_body' => $validated['tipo'],
            'kilometraje' => $validated['kilometraje'],
            'anio' => $validated['anio'],
            'descripcion' => $validated['descripcion'],
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
