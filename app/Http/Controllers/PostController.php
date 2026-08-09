<?php

namespace App\Http\Controllers;

use App\Actions\Posts\CreatePostAction;
use App\Actions\Posts\UpdatePostAction;
use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Currency;
use App\Models\Deal;
use App\Models\Post;
use App\Models\Municipio;
use App\Models\Provincia;
use App\Models\User;
use App\Models\VehicleBody;
use App\Models\VehicleBrand;
use Auth;
use Cache;
use Gate;
use Spatie\Permission\Models\Role;

class PostController extends Controller
{
    protected function clearCache()
    {
        Cache::forget('sidebar_currencies');
        Cache::forget('sidebar_brands');
        Cache::forget('sidebar_provincias');
        Cache::forget('sidebar_municipios');
        Cache::forget('sidebar_vehicle_bodies');
        Cache::forget('sidebar_roles');
        // para reiniciar los filtros y no tener que esperar 1 hora a que el cache se reinicie. esto provocaba que los filtros en la busqueda tengan un retraso importante
    }
    public function index()
    {
        return inertia('posts/index', [
            'posts' => Post::with('mainImage', 'municipio.provincia', 'carModel.carBrand', 'currency')
                ->latest()
                ->select('id', 'id_model', 'version', 'anio', 'id_municipio', 'id_currency', 'precio')
                ->paginate($this->paginateLimit),
            // whereHas encadenado: la DB filtra solo los registros que tienen posts asociados.
            // Funciona gracias a las relaciones hasMany correctamente definidas en cada modelo.

            // Marcas que tienen al menos un modelo → auto → post
            'carBrands' => Cache::remember(
                'sidebar_brands',
                1800,
                fn() => VehicleBrand::whereHas('carModels.posts')->orderBy('name', 'asc')->select('id', 'name')->get()
            ),
            // Tipos de auto que tienen al menos un auto → post
            'vehicleBodies' => Cache::remember(
                'sidebar_vehicle_bodies',
                1800,
                fn() => VehicleBody::whereHas('posts')->orderBy('name', 'asc')->select('id', 'name')->get()
            ),

            // Provincias que tienen al menos un municipio → post
            'provincias' => Cache::remember(
                'sidebar_provincias',
                1800,
                fn() => Provincia::whereHas('municipios.posts')->orderBy('nombre', 'asc')->select('id', 'nombre')->get()
            ),

            // Municipios que tienen al menos un post
            'municipios' => Cache::remember(
                'sidebar_municipios',
                1800,
                fn() => Municipio::whereHas('posts')->orderBy('nombre', 'asc')->select('id', 'nombre')->get()
            ),

            // Divisas que tienen al menos un post
            'currencies' => Cache::remember(
                'sidebar_currencies',
                1800,
                fn() => Currency::whereHas('posts')->select('id', 'nombre')->get(),
            ),
            'roles' => Cache::remember(
                'sidebar_roles',
                1800,
                fn() => Role::select('id', 'name')->get(),
            ),
        ]);
    }

    public function show(Post $post)
    {
        $cultdown = false;
        $hasDeals = Deal::where("post_id", $post->id)
            ->where("buyer_id", auth()->id())
            ->exists();
        $hasDealsReceived = Deal::where('seller_id', $post->id_user) // del lado del vendedor, busco si tiene un deal activo en esta publicación
            ->where('post_id', $post->id)
            ->exists();
        // $dealer = Deal::where('post_id', $post->id)
        // ->select('buyer_id')->first();
        $post->load([
            'postImage' => fn($q) => $q->orderBy('orden'),
            'carModel.carBrand',
            'user.contact',
            'municipio.provincia',
            'vehicleBody'
        ]);

        $deals = Deal::where('post_id', $post->id)
            ->where('seller_id', $post->id_user)
            ->get();
        $isPostFinalized = Deal::where('post_id', $post->id)
            ->where('deal_status_id', 1)
            ->exists();

        $lastRejectedDeal = Deal::with('post', 'buyer', 'seller')
            ->where('post_id', $post->id)
            ->where('buyer_id', auth()->id())
            ->where('deal_status_id', 2)
            ->latest('rejected_at')
            ->first();
        $myDealStatus = Deal::with('seller', 'buyer')
            ->where('buyer_id', auth()->id())
            ->where('post_id', $post->id)
            ->pluck('deal_status_id')->first();
        $dealsLimitReached = Deal::select('buyer_id', 'seller_id')
            ->where('buyer_id', auth()->id())
            ->where('seller_id', $post->id_user)
            ->where('deal_status_id', 3)
            ->orWhere('deal_status_id', 2)
            ->count() > 5;
        // solo tengo en cuenta los que están en estado "pendiente" y/o rechazados
        // los deals aceptados se descartan porque son operaciones finalizadas.

        if ($lastRejectedDeal && $lastRejectedDeal->rejected_at->gt(now()->subHours(24))) {
            $cultdown = true; // cultdown activo, por lo que todavia NO pasaron 24 horas
        }
        return inertia('posts/show', [
            'post' => $post,
            'myDealStatus' => $myDealStatus,
            'deals' => $deals,
            'hasDeals' => $hasDeals,
            'hasDealsReceived' => $hasDealsReceived,
            'lastRejectedDeal' => $lastRejectedDeal,
            'isPostFinalized' => $isPostFinalized,
            'cultdown' => $cultdown,
            'dealsLimitReached' => $dealsLimitReached,
        ]);
    }

    public function userPosts(User $user)
    {
        return inertia('user/posts', [
            'posts' => Post::with('mainImage', 'carModel.carBrand', 'municipio.provincia')
                ->latest()
                ->select('id', 'id_model', 'id_municipio', 'version', 'anio', 'id_currency', 'precio')
                ->where('id_user', $user->id)
                ->paginate($this->paginateLimit),
            // whereHas encadenado: misma lógica que index(), la DB filtra solo lo necesario.
            'carBrands' => Cache::remember(
                'sidebar_brands',
                3600,
                fn() => VehicleBrand::whereHas('carModels.posts')->orderBy('name', 'asc')->select('id', 'name')->get()
            ),
            'vehicleBodies' => Cache::remember(
                'sidebar_vehicle_bodies',
                3600,
                fn() => VehicleBody::whereHas('posts')->orderBy('name', 'asc')->select('id', 'name')->get()
            ),
            'provincias' => Cache::remember(
                'sidebar_provincias',
                1800,
                fn() => Provincia::whereHas('municipios.posts')->orderBy('nombre', 'asc')->select('id', 'nombre')->get()
            ),
            'municipios' => Cache::remember(
                'sidebar_municipios',
                1800,
                fn() => Municipio::whereHas('posts')->orderBy('nombre', 'asc')->select('id', 'nombre')->get()
            ),
            'currencies' => Cache::remember(
                'sidebar_currencies',
                1800,
                fn() => Currency::whereHas('posts')->select('id', 'nombre')->get()
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
        $this->clearCache();
        return redirect()->route('posts.index');
    }

    public function create()
    {
        // si el gate no te autoriza, devuelve un error.
        if (!Gate::allows('create-post')) {
            abort(403);
        }

        return inertia('posts/create', [
            'car' => new Post,
            'carBrands' => VehicleBrand::orderBy('name', 'asc')->select('id', 'name')->get(),
            'vehicleBodies' => VehicleBody::orderBy('name', 'asc')->select('id', 'name')->get(),
            'currencies' => Currency::select('id', 'nombre')->select('id', 'nombre')->get(),
            'provincias' => Provincia::orderBy('nombre', 'asc')->select('id', 'nombre')->get(),
        ]);
    }

    public function edit($id)
    {
        $post = Post::with('user', 'carModel.carBrand', 'postImage', 'mainImage', 'municipio.provincia')
            ->select('id', 'id_model', 'id_user', 'id_municipio', 'id_currency', 'precio')
            ->findOrFail($id);
        // si el gate no te autoriza, devuelve un error.

        if (!Gate::allows('update-own-post', $post)) {
            abort(403);
        }
        return inertia('posts/edit', [
            'postData' => $post,
            'carBrands' => VehicleBrand::orderBy('name', 'asc')->select('id', 'name')->get(),
            'vehicleBodies' => VehicleBody::orderBy('name', 'asc')->select('id', 'name')->get(),
            'currencies' => Currency::select('id', 'nombre')->get(),
            'provincias' => Provincia::orderBy('nombre', 'asc')->select('id', 'nombre')->get(),
        ]);
    }

    public function update(PostUpdateRequest $request, Post $post, UpdatePostAction $action)
    {
        if (!Gate::allows('update-own-post', $post)) {
            abort(403);
        }

        if (!$request['main_image']) {
            return redirect()->back();
        }

        $action->execute($post, $request->validated(), $request);
        $this->clearCache();
        return redirect()->route('posts.index');
    }

    public function destroy(Post $post)
    {
        if (!Gate::allows('delete-own-post', $post)) {
            abort(403);
        }

        $post->delete();
        $this->clearCache(); // para reiniciar los filtros y no tener que esperar 1 hora a que el cache se reinicie. esto provocaba que los filtros en la busqueda tengan un retraso importante
        return redirect()->route('posts.index');
    }
}