type Filters = {
    priceFrom?: number;
    priceTo?: number;
    brandId?: number;
    yearFrom?: number;
    yearTo?: number;
    typeId?: number;
};

import { FilterProps } from "@/types/automovil";
import React, { useState } from "react";
import CarCards from "./CarCards";
import Pagination from "./pagination";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Filtro({ posts, loguedUser, showPages, carBrands, carType }: FilterProps) {
    const filtros = ['Precio', 'Marca', 'Año', 'Tipo'];
    const [filters, setFilters] = useState<Filters>({}); // filtro elegido, para enviar al backend
    const [filterOn, setFilterOn] = useState(false); // abrir y cerrar el filtro
    const [selectedFilter, setSelectedFilter] = useState(''); // detecto el filtro seleccionado

    const handleOpenFilter = () => {
        if (!filterOn) {
            setFilterOn(true)
        } else {
            setFilterOn(false);
            setSelectedFilter('');
        }
    }
    const filterDetected = (e: string) => {
        setSelectedFilter(e);
        setFilters({}); // reinicio los filtros en caso de seleccionar otro filtro
    }
    const handleClearFilters = (e: React.FormEvent) => {
        setFilters({}); // quito los filtros para que el backend no envíe ninguno
        setSelectedFilter(''); // limpio la vista de los filtros elegidos

        !filters ? handleSubmit(e) : ''; // si no tengo filtros, ejecuto el submit. si los tengo, no hago nada
    }
    const handleSubmit = (e: React.FormEvent) => {
        setFilterOn(false);
        e.preventDefault();

        router.get(route('search.index'), // o index
            filters,
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }

    return <>
        <div className={`${filterOn ? `fixed ${innerWidth > 1024 ? 'w-[25%]' : 'w-full'}` : 'hidden w-0'} flex flex-col justify-center items-center overflow-hidden left-0 z-50 top-0 h-screen bg-black/85 space-y-12 text-gray-200 transition-all duration-300`}>
            <div className="flex items-center justify-between w-[80%] mx-2">
                <h4 className="mx-5 text-xl font-[500]">Filtros</h4>
                <svg onClick={handleOpenFilter} className="fill-gray-200 w-15 p-2 bg-red-800 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
                </svg>
            </div>
            <div className="w-[80%] mx-2">
                <ul className="flex flex-col gap-4">
                    <form action="" onSubmit={handleSubmit}>
                        {filtros.map((el, index) => (
                            <div key={index} className={`my-3 ${index == filtros.length - 1 ? 'mb-14' : ''} `}>
                                <li onClick={() => filterDetected(el)} className="text-xl py-2 border border-gray-700 px-3 rounded-lg cursor-pointer lg:hover:bg-gray-500 transition-colors duration-300 z-40">{el}</li>
                            </div>
                        ))}
                        <div>
                            {
                                selectedFilter === 'Precio' ?
                                    <div className="flex flex-col gap-2">
                                        <input type="number" name="priceFrom" className="p-2 border rounded-md outline-none transition-colors duration-300 focus:border-blue-500" placeholder="Precio (desde):" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({ ...prev, priceFrom: Number(e.target.value) }))} />
                                        <input type="number" name="priceTo" className="p-2 border rounded-md outline-none transition-colors duration-300 focus:border-blue-500" placeholder="Precio (hasta):" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({ ...prev, priceTo: Number(e.target.value) }))} />
                                    </div>
                                    : ''
                            }
                            {
                                selectedFilter === 'Marca' ?
                                    <div>
                                        <h4>Elige una marca para filtrar</h4>
                                        <select name="marca" className="border border-gray-600 rounded-md mb-5 mt-2 p-3 w-full" onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                            setFilters(prev => ({ ...prev, brandId: Number(e.target.value) }))
                                        }>
                                            <option value="" className="bg-black/90">Todas</option>
                                            {
                                                carBrands ? carBrands.map(e => (
                                                    <option key={e.id} value={e.id} className="bg-black/90">{e.marca}</option>
                                                )) : ''
                                            }
                                        </select>
                                    </div>
                                    : ''
                            }
                            {
                                selectedFilter === 'Año' ? <div className="flex flex-col gap-2">
                                    <input type="number" className="p-2 border rounded-md outline-none transition-colors duration-300 focus:border-blue-500" placeholder="Año (desde)" name="yearFrom" onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFilters(prev => ({ ...prev, yearFrom: Number(e.target.value) }))
                                    } />  {/** año (desde) */}
                                    <input type="number" className="p-2 border rounded-md outline-none transition-colors duration-300 focus:border-blue-500" placeholder="Año (hasta)" name="yearTo" onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFilters(prev => ({ ...prev, yearTo: Number(e.target.value) }))
                                    } />
                                </div>
                                    : ''
                            }
                            {
                                selectedFilter === 'Tipo' ?
                                    <div>
                                        <h4>Elige el tipo de vehiculo a filtrar</h4>
                                        <select className="border border-gray-600 rounded-md mb-5 mt-2 p-3 w-full" onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                            setFilters(prev => ({ ...prev, typeId: Number(e.target.value) }))
                                        }>
                                            <option value="" className="bg-black/90">Todos</option>
                                            {
                                                carType ? carType.map(e => (
                                                    <option key={e.id} value={e.id} className="bg-black/90">{e.tipo}</option>
                                                )) : ''
                                            }
                                        </select>
                                    </div>
                                    : ''
                            }
                        </div>
                        <button type="submit" className="mt-10 border border-blue-500 p-3 w-full rounded-md lg:hover:bg-blue-500 lg:hover:text-gray-200 cursor-pointer transition-colors duration-300">Filtrar</button>
                        <button id="clearFilters" type="submit" onClick={handleClearFilters} className="mt-10 border border-red-500 p-3 w-full rounded-md lg:hover:bg-red-500 lg:hover:text-gray-200 cursor-pointer transition-colors duration-300">Limpiar filtros</button>
                    </form>
                </ul>
            </div>
        </div>
        <section className="space-y-8">
            <section id='categorias' className='flex flex-col items-center justify-center'>
                <div className={`flex ${posts.data.length > 0 ? 'justify-start' : 'justify-center'} gap-5 w-full`}>
                    <div className="flex flex-col">
                        {posts.data.length > 0 ?
                            <h2 className='text-3xl text-center md:text-left mb-4 text-[#ccc]'>Catálogo principal</h2>
                            :
                            <h2 className='text-3xl text-center md:text-center mb-4 text-[#ccc]'>Sin resultados</h2>
                        }
                    </div>
                    <div className="flex items-center justify-between md:gap-5">
                        {
                            (location.href.includes('buscar') || location.href.includes('posts')) && posts.data.length > 0 ? <div className="flex justify-between gap-4 mb-4">
                                <svg onClick={handleOpenFilter} className="fill-gray-200 w-10 cursor-pointer drop-shadow-lg hover:drop-shadow-gray-200 transition-all duration-400 z-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" tabIndex={1}>
                                    <path d="M96 128C83.1 128 71.4 135.8 66.4 147.8C61.4 159.8 64.2 173.5 73.4 182.6L256 365.3L256 480C256 488.5 259.4 496.6 265.4 502.6L329.4 566.6C338.6 575.8 352.3 578.5 364.3 573.5C376.3 568.5 384 556.9 384 544L384 365.3L566.6 182.7C575.8 173.5 578.5 159.8 573.5 147.8C568.5 135.8 556.9 128 544 128L96 128z" />
                                </svg>
                            </div> : ''
                        }
                    </div>
                </div>
                <div className=''>
                    <div className={`grid ${posts.data.length > 0 ? 'md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-auto'} items-center gap-4 p-1`}>
                        {
                            posts.data.length > 0 ? posts.data.map(post => (
                                <div key={post.id} className="snap-center">
                                    <CarCards post={post} src={`/posts/${post.id}`} loguedUser={loguedUser} />
                                </div>
                            )) :
                                <>
                                    <p className="text-xl">No hay publicaciones disponibles en este momento</p>
                                    <Link href={'/posts/create'} className="text-center hover:underline text-blue-500 font-md">Crear una publicación</Link>
                                </>
                        }
                    </div>
                    {
                        posts.links && showPages && posts.data.length > 0 ? <Pagination links={posts.links} /> : ''
                    }
                </div>
            </section>
        </section>
    </>;
}