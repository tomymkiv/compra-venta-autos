<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Car;
use App\Models\CarsBrand;
use App\Models\CarsModel;
use App\Models\CarType;
use App\Models\Currency;
use App\Models\Post;
use App\Models\Municipio;
use App\Models\PostImage;
use App\Models\Provincia;
use App\Models\User;
use Http;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use function Symfony\Component\Clock\now;

class PostController extends Controller
{
    public function index()
    {
        /**
         * muestro esta informacion en los filtros
         */
        return inertia('posts/index', [
            'posts' => Post::with('mainImage', 'car.carModel.carBrand', 'user', 'municipio.provincia', 'car.car_type')
                ->whereHas('mainImage') // mainImage = imagen con orden = 1
                ->latest()
                ->paginate($this->paginateLimit),
            // whereHas encadenado: la DB filtra solo los registros que tienen posts asociados.
            // Funciona gracias a las relaciones hasMany correctamente definidas en cada modelo.

            // Marcas que tienen al menos un modelo → auto → post
            'carBrands' => CarsBrand::whereHas('carModels.cars.post')->orderBy('marca', 'asc')->get(),

            // Tipos de auto que tienen al menos un auto → post
            'carType' => CarType::whereHas('cars.post')->orderBy('tipo', 'asc')->get(),

            // Provincias que tienen al menos un municipio → post
            'provincias' => Provincia::whereHas('municipios.posts')->orderBy('nombre', 'asc')->get(),

            // Municipios que tienen al menos un post
            'municipios' => Municipio::whereHas('posts')->orderBy('nombre', 'asc')->get(),

            'currencies' => Currency::get(),
            'roles' => Role::get(),
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
            'carBrands' => CarsBrand::whereHas('carModels.cars.post')->orderBy('marca', 'asc')->get(),
            'carType' => CarType::whereHas('cars.post')->orderBy('tipo', 'asc')->get(),
            'provincias' => Provincia::whereHas('municipios.posts')->orderBy('nombre', 'asc')->get(),
            'municipios' => Municipio::whereHas('posts')->orderBy('nombre', 'asc')->get(),
            'currencies' => Currency::get(),
        ]);
    }

    public function store(PostCreateRequest $request)
    {
        // dd($request->file('main_image'));
        $images = $request->file('images');
        $mainImage = $request->file('main_image');
        $validated = $request->validated();
        // FUNCIONA
        if (isset($images) && isset($mainImage)) {
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
                'id_currency' => $validated['moneda'],
                'id_municipio' => $validated['municipio'],
                'descripcion' => $validated['descripcion'],
                'fecha_publicacion' => now(),
                'precio' => $validated['precio'],
            ]);

            // almaceno la imagen principal con orden 1
            $path = $mainImage->store('posts', 'public');

            PostImage::create([
                'id_post' => $post->id,
                'url' => $path,
                'orden' => 1,
            ]);
            $i = 1; // contador, para ordenar las imagenes
            foreach ($images as $image) {
                $i++;
                $path = $image->store('posts', 'public');

                PostImage::create([
                    'id_post' => $post->id,
                    'url' => $path,
                    'orden' => $i,
                ]);
            }
            /**
             * envio esta info por n8n para mandar un correo informativo
             */
            // Http::post(env('N8N_WEBHOOK_BASE_URL') . '/new-post-notification', [
            //     'correo' => $this->loguedUser->email,
            //     'user' => $this->loguedUser->name,
            //     'marca' => $carModel->carBrand->marca,
            //     'modelo' => $carModel->modelo,
            //     'anio' => $car->anio,
            // ]);

            return redirect()->route('posts.index');
        } else {
            return redirect()->back()->with('error', 'Error al crear el post. Debes incluir al menos una imagen.');
        }

    }

    public function create()
    {
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
        return inertia('posts/edit', [
            'postData' => Post::with('user', 'car.carModel.carBrand', 'postImage', 'mainImage', 'municipio.provincia')
                ->findOrFail($id),
            'carBrands' => CarsBrand::orderBy('marca', 'asc')->get(),
            'car_types' => CarType::orderBy('tipo', 'asc')->get(),
            'currencies' => Currency::get(),
            'provincias' => Provincia::orderBy('nombre', 'asc')->get(),
            // 'permissions' => $this->loguedUser->getAllPermissions()->pluck('name'),
        ]);
    }

    public function update(PostUpdateRequest $request, Post $post, Car $car)
    {
        // dd(is_file($request->file('main_image')) ? true : false);
        $main_image = $request->file('main_image');
        $images = $request->file('images');
        $validated = $request->validated();
        $carModel = $post->car->carModel;

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
            'id_currency' => $validated['moneda'],
            'id_municipio' => $validated['municipio'],
            'precio' => $validated['precio'],
            'descripcion' => $validated['descripcion'],
        ]);
        // obtengo TODAS las imagenes relacionadas a ese post
        $images = $request->file('images');

        // Si se cambió la imagen principal (tiene valor), la actualizo
        if ($request['main_image']) {
            if (is_file($request->file('main_image'))) {
                // si la imagen cambió (es otra diferente a la que ya tenia), la almaceno y reemplazo
                $path_mainImage = $main_image->store('posts', 'public');
            } else {
                // si la imagen es la misma que ya estaba, la conservo.
                $path_mainImage = $request['main_image']['url'];
            }

            // busco el posteo a editar y tambien su imagen principal (orden = 1)
            PostImage::where('id_post', $post->id)
                ->where('orden', 1)
                ->update([
                    'url' => $path_mainImage,
                ]);
        } else {
            return redirect()->back();
        }

        $lastOrder = PostImage::where('id_post', $post->id)->max('orden') ?? 1;
        // si existen imagenes en el post, tomo el valor con el orden más alto (para arrancar desde ahi).
        // sino, empiezo con 1, ya que si empezara de 0 modificaria la imagen principal

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

        return redirect()->route('posts.index');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index');
    }
}