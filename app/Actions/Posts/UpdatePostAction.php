<?php

namespace App\Actions\Posts;

use App\Models\CarType;
use App\Models\Post;
use App\Models\PostImage;
use Illuminate\Http\Request;

class UpdatePostAction
{
    public function execute(Post $post, array $validated, Request $request): void
    {
        // Eliminar imágenes marcadas para borrar
        if (isset($validated['deleted_images'])) {
            foreach ($validated['deleted_images'] as $id) {
                PostImage::destroy($id);
            }
        }

        $carModel = $post->car->carModel;
        $carModel->update([
            'id_marca' => $validated['marca'],
            'modelo' => $validated['modelo'],
        ]);

        $car = $post->car;
        $car->update([
            'id_modelo' => $carModel->id,
            'id_type' => CarType::findOrFail($validated['tipo'])->id,
            'kilometraje' => $validated['kilometraje'],
            'anio' => $validated['anio'],
        ]);

        $post->update([
            'id_currency' => $validated['moneda'],
            'id_municipio' => $validated['municipio'],
            'precio' => $validated['precio'],
            'descripcion' => $validated['descripcion'],
        ]);

        // Imagen principal
        $mainImage = $request->file('main_image');
        $path = is_file($mainImage)
            ? $mainImage->store('posts', 'public')
            : $request['main_image']['url'];

        PostImage::where('id_post', $post->id)->where('orden', 1)->update(['url' => $path]);

        // Imágenes adicionales
        if ($request->hasFile('images')) {
            $lastOrder = PostImage::where('id_post', $post->id)->max('orden') ?? 1;
            foreach ($request->file('images') as $image) {
                $post->postImage()->create([
                    'url' => $image->store('posts', 'public'),
                    'orden' => ++$lastOrder,
                ]);
            }
        }
    }
}
