<?php

namespace App\Http\Controllers;

use App\Models\CarsBrand;
use App\Models\CarType;
use App\Models\Post;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        // tengo 2 caminos:
        // si no filtro nada y selecciono filtrar O busco en el buscador, me envía acá.
        if ($request->filled('q')) { // si se trata de una búsqueda...
            $query = $request->input('q'); // lo que recibo del buscador
            $posts = Post::query()
                ->when($query, function ($qBuilder) use ($query) {
                    $qBuilder->whereHas('car.carModel', function ($q) use ($query) {
                        $q->where('modelo', 'like', "%{$query}%")
                            ->orWhereHas('carBrand', function ($q) use ($query) {
                                $q->where('marca', 'like', "%{$query}%");
                            });
                    });
                })
                ->with([
                    'car.carModel.carBrand',
                    'postImage',
                    'mainImage',
                ])
                ->paginate($this->paginateLimit)
                ->withQueryString();
            return inertia('search/index', [
                'loguedUser' => $this->loguedUser,
                'posts' => $posts,
                'carBrands' => CarsBrand::get(),
                'carType' => CarType::get(),
            ]);
        } else { // si se trata de un filtro...
            $posts = Post::query()
                ->when($request->priceFrom, function ($qBuilder) use ($request) {
                    $qBuilder->where('precio', '>=', $request->priceFrom);
                    // precio desde...
                })
                ->when($request->priceTo, function ($qBuilder) use ($request) {
                    $qBuilder->where('precio', '<=', $request->priceTo);
                    // precio hasta...
                })
                ->when($request->brandId, function ($qBuilder) use ($request) {
                    $qBuilder->whereHas('car.carModel.carBrand', function ($q) use ($request) {
                        $q->where('id', $request->brandId);
                    });
                })
                ->when($request->yearFrom, function ($qBuilder) use ($request) {
                    $qBuilder->whereHas('car', function ($q) use ($request) {
                        $q->where('anio', '>=', $request->yearFrom);
                    });
                })
                ->when($request->yearTo, function ($qBuilder) use ($request) {
                    $qBuilder->whereHas('car', function ($q) use ($request) {
                        $q->where('anio', '<=', $request->yearTo);
                    });
                })
                ->when($request->typeId, function ($qBuilder) use ($request) {
                    // $qBuilder es un parámetro, el cual tiene la funcionalidad de $request. 
                    // por eso está "use ($request)"
                    $qBuilder->whereHas('car', function ($q) use ($request) {
                        $q->where('id_type', $request->typeId);
                    });
                })
                ->with([
                    'car.carModel.carBrand',
                    'postImage',
                    'mainImage',
                ])
                ->paginate($this->paginateLimit)
                ->withQueryString();
            return inertia('search/index', [
                'loguedUser' => $this->loguedUser,
                'posts' => $posts,
                'carBrands' => CarsBrand::get(),
                'carType' => CarType::get(),
            ]);
        }
    }
}
