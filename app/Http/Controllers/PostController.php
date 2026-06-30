<?php

namespace App\Http\Controllers;

use App\Actions\Posts\CreatePostAction;
use App\Actions\Posts\UpdatePostAction;
use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Car;
use App\Models\CarsBrand;
use App\Models\CarType;
use App\Models\Currency;
use App\Models\Post;
use App\Models\Municipio;
use App\Models\Provincia;
use App\Models\User;
use Cache;
use Gate;
use Spatie\Permission\Models\Role;

class PostController extends Controller
{
    public function index()
    {
        return inertia('posts/index', [
            'posts' => Post::with('mainImage', 'car.carModel.carBrand', 'user', 'municipio.provincia', 'car.car_type')
                ->whereHas('mainImage') // mainImage = imagen con orden = 1
                ->latest()
                ->paginate($this->paginateLimit),
            // whereHas encadenado: la DB filtra solo los registros que tienen posts asociados.
            // Funciona gracias a las relaciones hasMany correctamente definidas en cada modelo.

            // Marcas que tienen al menos un modelo → auto → post
            'carBrands' => Cache::remember(
                'sidebar_brands',
                3600,
                fn() => CarsBrand::whereHas('carModels.cars.post')->orderBy('marca', 'asc')->get()
            ),

            // Tipos de auto que tienen al menos un auto → post
            'carType' => Cache::remember(
                'sidebar_car_types',
                3600,
                fn() => CarType::whereHas('cars.post')->orderBy('tipo', 'asc')->get()
            ),

            // Provincias que tienen al menos un municipio → post
            'provincias' => Cache::remember(
                'sidebar_provincias',
                3600,
                fn() => Provincia::whereHas('municipios.posts')->orderBy('nombre', 'asc')->get()
            ),

            // Municipios que tienen al menos un post
            'municipios' => Cache::remember(
                'sidebar_municipios',
                3600,
                fn() => Municipio::whereHas('posts')->orderBy('nombre', 'asc')->get()
            ),

            // Divisas que tienen al menos un post
            'currencies' => Cache::remember(
                'sidebar_currencies',
                3600,
                fn() => Currency::whereHas('post')->select('id')->get()
            ),
            'roles' => Cache::remember(
                'sidebar_roles',
                3600,
                fn() => Role::get()
            ),
        ]);
    }

    public function show(Post $post)
    {
        $post->load([
            'postImage' => fn($q) => $q->orderBy('orden'),
            'car.carModel.carBrand',
            'user.contact',
            'municipio.provincia',
        ]);

        return inertia('posts/show', [
            'post' => $post,
        ]);
    }

    public function userPosts(User $user)
    {
        return inertia('user/posts', [
            'posts' => Post::with('mainImage', 'car.carModel.carBrand', 'user', 'municipio.provincia')
                ->whereHas('mainImage')
                ->latest()
                ->where('id_user', $user->id)
                ->paginate($this->paginateLimit),
            // whereHas encadenado: misma lógica que index(), la DB filtra solo lo necesario.
            'carBrands' => Cache::remember(
                'sidebar_brands',
                3600,
                fn() => CarsBrand::whereHas('carModels.cars.post')->orderBy('marca', 'asc')->get()
            ),
            'carType' => Cache::remember(
                'sidebar_car_types',
                3600,
                fn() => CarType::whereHas('cars.post')->orderBy('tipo', 'asc')->get()
            ),
            'provincias' => Cache::remember(
                'sidebar_provincias',
                3600,
                fn() => Provincia::whereHas('municipios.posts')->orderBy('nombre', 'asc')->get()
            ),
            'municipios' => Cache::remember(
                'sidebar_municipios',
                3600,
                fn() => Municipio::whereHas('posts')->orderBy('nombre', 'asc')->get()
            ),
            'currencies' => Cache::remember(
                'sidebar_currencies',
                3600,
                fn() => Currency::whereHas('post')->select('id')->get()
            ),
        ]);
    }

    public function store(PostCreateRequest $request, CreatePostAction $action)
    {
        if (!Gate::allows('create-post', $this->loguedUser)) {
            abort(403);
        }

        $images = $request->file('images');
        $mainImage = $request->file('main_image');

        if (!$images || !$mainImage) {
            return redirect()->back()->with('error', 'Error al crear el post. Debes incluir al menos una imagen.');
        }

        $action->execute($request->validated(), $mainImage, $images);

        return redirect()->route('posts.index');
    }

    public function create()
    {
        // si el gate no te autoriza, devuelve un error.

        if (!Gate::allows('create-post', $this->loguedUser)) {
            abort(403);
        }
        return inertia('posts/create', [
            'car' => new Post,
            'carBrands' => CarsBrand::orderBy('marca', 'asc')->get(),
            'car_types' => CarType::orderBy('tipo', 'asc')->get(),
            'currencies' => Currency::get(),
            'provincias' => Provincia::orderBy('nombre', 'asc')->get(),
        ]);
    }

    public function edit($id)
    {
        $post = Post::with('user', 'car.carModel.carBrand', 'postImage', 'mainImage', 'municipio.provincia')
            ->findOrFail($id);
        // si el gate no te autoriza, devuelve un error.
        if (!Gate::allows('update-post', $post)) {
            abort(403);
        }
        return inertia('posts/edit', [
            'postData' => $post,
            'carBrands' => CarsBrand::orderBy('marca', 'asc')->get(),
            'car_types' => CarType::orderBy('tipo', 'asc')->get(),
            'currencies' => Currency::get(),
            'provincias' => Provincia::orderBy('nombre', 'asc')->get(),
        ]);
    }

    public function update(PostUpdateRequest $request, Post $post, UpdatePostAction $action)
    {
        if (!Gate::allows('update-post', $post)) {
            abort(403);
        }

        if (!$request['main_image']) {
            return redirect()->back();
        }

        $action->execute($post, $request->validated(), $request);

        return redirect()->route('posts.index');
    }

    public function destroy(Post $post)
    {
        if (!Gate::allows('delete-post', $post)) {
            abort(403);
        }

        $post->delete();

        return redirect()->route('posts.index');
    }
}