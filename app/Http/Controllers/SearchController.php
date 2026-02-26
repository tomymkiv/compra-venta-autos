<?php

namespace App\Http\Controllers;

use App\Models\CarsBrand;
use App\Models\CarType;
use App\Models\Currency;
use App\Models\Municipio;
use App\Models\Post;
use App\Models\Provincia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Unique;

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
                    'municipio.provincia',
                ])
                ->paginate($this->paginateLimit)
                ->withQueryString();

            return inertia('search/index', [
                'loguedUser' => $this->loguedUser,
                'posts' => $posts,
                'carBrands' => CarsBrand::get(),
                'carType' => Post::with('car.car_type')
                    ->get()
                    ->pluck('car.car_type')
                    ->filter()
                    ->unique('id')
                    ->values(),
                Post::with('municipio.provincia')
                    ->get()
                    ->pluck('municipio.provincia')
                    ->filter()
                    ->unique('id')
                    ->values(),
                'municipios' => Post::with('municipio')
                    ->get()
                    ->pluck('municipio')
                    ->flatten()
                    ->filter()
                    ->unique('id')
                    ->values(),
            ]);
        } else { // si se trata de un filtro...
            $posts = Post::query()
                ->when($request->priceFrom, function ($qBuilder) use ($request) {
                    $qBuilder->where('precio', '>=', $request->priceFrom)
                        ->where('id_currency', $request->currencyId); // filtro segun la divisa
                    // precio desde...
                })
                ->when($request->priceTo, function ($qBuilder) use ($request) {
                    $qBuilder->where('precio', '<=', $request->priceTo)
                        ->where('id_currency', $request->currencyId); // filtro segun la divisa
                    // precio hasta...
                })
                ->when($request->currencyId, function ($qBuilder) use ($request) {
                    $qBuilder->where('id_currency', $request->currencyId);
                    // filtro segun la divisa (sin tener en cuenta "desde" ni "hasta")
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
                ->when($request->provinciaId, function ($qBuilder) use ($request) {
                    $qBuilder->whereHas('municipio', function ($q) use ($request) {
                        $q->where('id_provincia', $request->provinciaId);
                    });
                })
                ->when($request->municipioId, function ($qBuilder) use ($request) {
                    $qBuilder->whereHas('municipio', function ($q) use ($request) {
                        $q->where('id', $request->municipioId);
                    });
                })
                ->with([
                    'car.carModel.carBrand',
                    'car.car_type',
                    'municipio.provincia',
                    'postImage',
                    'mainImage',
                ])
                ->paginate($this->paginateLimit)
                ->withQueryString();

            return inertia('search/index', [
                'loguedUser' => $this->loguedUser,
                'posts' => $posts,
                'carBrands' => Post::with('car.carModel.carBrand')
                    ->get()
                    ->pluck('car.carModel.carBrand')
                    ->unique('id')
                    ->values(),
                'carType' => Post::with('car.car_type')
                    ->get()
                    ->pluck('car.car_type')
                    ->filter()
                    ->unique('id')
                    ->values(),
                'provincias' => Post::with('municipio.provincia')
                    ->get()
                    ->pluck('municipio.provincia')
                    ->filter()
                    ->unique('id')
                    ->values(),
                'municipios' => Post::with('municipio')
                    ->get()
                    ->pluck('municipio')
                    ->flatten()
                    ->filter()
                    ->unique('id')
                    ->values(),
                'currencies' => Currency::get(),
            ]);
        }
    }
}
