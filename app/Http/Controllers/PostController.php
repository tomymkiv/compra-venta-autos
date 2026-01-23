<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Car;
use App\Models\CarsBrand;
use App\Models\CarsModel;
use App\Models\CarType;
use App\Models\Post;
use App\Models\PostImage;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use function Symfony\Component\Clock\now;

class PostController extends Controller
{
    public function index()
    {
        return inertia('posts/index', [
            'posts' => $this->paginatedCarPosts,
            'loguedUser' => $this->loguedUser,
            'carBrands' => CarsBrand::get(),
            'carType' => CarType::get(),
        ]);
    }

    public function show($id)
    {
        $post = Post::with([
            'postImage' => fn($query) => $query->orderBy('orden'),
            'car.carModel.carBrand',
            'user',
        ])->where('id_car', $id)->firstOrFail(); // first() o firstOrFail() traen un solo registro, mientras que get() trae una colección

        return inertia('posts/show', [
            'post' => $post,
            'loguedUser' => $this->loguedUser,
        ]);
    }

    public function userPosts(User $user)
    {
        return inertia('user/posts', [
            'posts' => Post::with('mainImage', 'car.carModel.carBrand', 'user')
                ->whereHas('mainImage', fn($query) => $query->where('orden', 1)) // limito a los posts que tienen una imagen principal con orden = 1
                ->latest()
                ->where('id_user', $user->id)
                ->paginate($this->paginateLimit),
            'loguedUser' => $this->loguedUser
        ]);
    }

    public function store(PostCreateRequest $request)
    {
        $images = $request->file('images');
        $validated = $request->validated();

        // FUNCIONA
        $carModel = CarsModel::create([
            'id_marca' => $validated['marca'],
            'modelo' => $validated['modelo'],
        ]);
        // dd($validated['tipo']);
        // FUNCIONA
        $type_id = CarType::where('id', $validated['tipo'])
            ->firstOrFail()
            ->id;

        $car = Car::create([
            'id_modelo' => $carModel->id,
            'id_type' => $type_id,
            'anio' => $validated['anio'],
            'kilometraje' => $validated['kilometraje'],
        ]);

        // FUNCIONA
        $post = Post::create([
            'id_user' => Auth::user()->id,
            'id_car' => $car->id,
            'descripcion' => $validated['descripcion'],
            'fecha_publicacion' => now(),
            'precio' => $validated['precio'],
            'ubicacion' => $validated['ubicacion'],
        ]);

        // FUNCIONA
        $i = 0; // contador, para ordenar las imagenes
        foreach ($images as $image) {
            $i++;
            $path = $image->store('posts', 'public');

            PostImage::create([
                'id_post' => $post->id,
                'url' => $path,
                'orden' => $i,
            ]);
        }

        return redirect()->route('posts.index');
    }

    public function create()
    {
        return inertia('posts/create', [
            'car' => new Post,
            'carBrands' => CarsBrand::get(),
            'car_types' => CarType::get(),
            'loguedUser' => $this->loguedUser,
        ]);
    }

    public function edit($id)
    {
        return inertia('posts/edit', [
            'postData' => Post::with('user', 'car.carModel.carBrand', 'postImage', 'mainImage')
                ->findOrFail($id),
            'carBrands' => CarsBrand::get(),
            'loguedUser' => $this->loguedUser,
            'car_types' => CarType::get(),
        ]);
    }

    public function update(PostUpdateRequest $request, Post $post, Car $car)
    {
        $images = $request->file('images');
        $validated = $request->validated();
        $carModel = $post->car->carModel;
        // dd($validated['deleted_images']);
        // $images_to_delete = PostImage::find($validated['deleted_images']);
        if (isset($validated['deleted_images'])) {
            foreach ($validated['deleted_images'] as $deleted_images) {
                PostImage::destroy($deleted_images);
            }
        }

        $carModel->update([
            'id_marca' => $validated['marca'],
            'modelo' => $validated['modelo'],
        ]);

        $car = $post->car;

        $type_id = CarType::where('id', $validated['tipo'])
            ->get()
            ->firstOrFail()
            ->id;

        $car->update([
            'id_modelo' => $carModel->id,
            'id_type' => $type_id,
            'kilometraje' => $validated['kilometraje'],
            'anio' => $validated['anio'],
        ]);

        $post->update([
            'id_user' => Auth::user()->id,
            'id_car' => $car->id,
            'precio' => $validated['precio'],
            'descripcion' => $validated['descripcion'],
            'ubicacion' => $validated['ubicacion'],
        ]);
        // obtengo TODAS las imagenes relacionadas a ese post
        $images = $request->file('images');

        $lastOrder = PostImage::where('id_post', $post->id)->max('orden') ?? 0;
        // si existen imagenes en el post, tomo el valor con el orden más alto (para arrancar desde ahi).
        // sino, empiezo con 0

        if ($images) {
            foreach ($images as $image) {
                $lastOrder++;

                $path = $image->store('posts', 'public');

                $post->postImage()->create([
                    'url' => $path,
                    'orden' => $lastOrder,
                ]);
            }
        }
        // dd($img);

        return redirect()->route('posts.index');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index');
    }
}
