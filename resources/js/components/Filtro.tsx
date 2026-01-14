interface Props {
    categoria?: string,
} // me sirve para limitar el filtro a cierta categoria (autos, camionetas, motos, etc)

import { url } from "../exports/Url";
import { useEffect, useRef, useState } from "react";
import type { Automovil } from "../types/automovil";
import CarCards from "./CarCards";

function Filtro(props: Props) {
    const { categoria } = props
    const filtros = ['Precio', 'Marca', 'Modelo', 'Ubicacion', 'Año'];
    const [autos, setAutos] = useState<Automovil[]>([]);
    const inputRef = useRef<HTMLInputElement>(null!);
    const filtroOpcionRef = useRef<HTMLParagraphElement>(null!);
    const filterDeleterRef = useRef<SVGSVGElement>(null!);
    const [search, setSearch] = useState('');
    const [filterOn, setFilterOn] = useState(false);
    const [opcionElegida, setOpcionElegida] = useState<keyof Automovil>('marca');

    const mostrarAutos = async () => {
        const data = await fetch(url);
        const response = await data.json();

        const autosFiltrados = categoria ? response.filter((auto: Automovil) => auto.value === categoria)
            .map((auto: Automovil) => ({
                img: auto.img,
                key: auto.key,
                value: auto.value,
                marca: auto.marca,
                modelo: auto.modelo,
                año: auto.año,
                km: auto.km,
                ubicacion: auto.ubicacion,
                precio: auto.precio,
                descripcion: auto.descripcion,
            })) : response.map((auto: Automovil) => ({
                img: auto.img,
                key: auto.key,
                value: auto.value,
                marca: auto.marca,
                modelo: auto.modelo,
                año: auto.año,
                km: auto.km,
                ubicacion: auto.ubicacion,
                precio: auto.precio,
                descripcion: auto.descripcion,
            }))
        console.log(autosFiltrados);
        setAutos(autosFiltrados);
    }
    const openFilter = () => {
        !filterOn ? setFilterOn(true) : setFilterOn(false);
    }
    /** desde esta funcion hasta la linea 83, serán comentadas para cambiar el filtro y usar backend para el mismo */
    const searcher = (e: any) => {
        setSearch(e.target.value)
    }
    const inputFocus = () => {
        openFilter();
        inputRef.current.focus();
        console.log(opcionElegida)
    }
    const closeFilter = () => {
        filterOn ? inputRef.current.classList.remove('hidden') : inputRef.current.classList.add('hidden');
        inputRef.current.classList.add('hidden');
        setOpcionElegida('marca'); // vacío el filtro
        setSearch('') // vacío el string para que no tome algun valor ingresado anteriormente
        filtroOpcionRef.current.textContent = '';
        filterDeleterRef.current.classList.add('hidden')
    }
    const opcionElegidaFunc = (e: any) => {
        inputFocus();
        setSearch('');
        setOpcionElegida(e.target.outerText.toLowerCase())
        inputRef.current.classList.remove('hidden')
        filterDeleterRef.current.classList.remove('hidden');
        filtroOpcionRef.current.textContent = `Filtrar por: ${e.target.textContent.toLowerCase()}`;
    }

    // si no se escribe nada, muestra todos los autos
    // caso contrario, se filtra con los caracteres ingresados 
    const filtroBusqueda = !search ? autos.slice(0, 8) : autos.filter(filtro => (filtro[opcionElegida].toString().toLowerCase().includes(search.toLowerCase())))
    useEffect(() => {
        mostrarAutos();
    }, [])

    return <>
        <p ref={filtroOpcionRef}></p>
        <div className="flex items-center justify-between md:gap-5">
            <input type="text" ref={inputRef} value={search} onChange={searcher} className="hidden p-3 rounded-lg bg-gray-700" tabIndex={0} />
            <div className="flex justify-between gap-4 mb-4">
                <svg onClick={inputFocus} className="fill-gray-200 w-10 cursor-pointer drop-shadow-lg hover:drop-shadow-gray-200 transition-all duration-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" tabIndex={1}>
                    <path d="M96 128C83.1 128 71.4 135.8 66.4 147.8C61.4 159.8 64.2 173.5 73.4 182.6L256 365.3L256 480C256 488.5 259.4 496.6 265.4 502.6L329.4 566.6C338.6 575.8 352.3 578.5 364.3 573.5C376.3 568.5 384 556.9 384 544L384 365.3L566.6 182.7C575.8 173.5 578.5 159.8 573.5 147.8C568.5 135.8 556.9 128 544 128L96 128z" />
                </svg>
                <svg onClick={closeFilter} ref={filterDeleterRef} className='hidden fill-gray-200 w-15 p-2 bg-red-800 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" tabIndex={2}>
                    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
                </svg>
            </div>
        </div>
        <div className={`${filterOn ? 'fixed w-full' : 'hidden w-0'} flex flex-col justify-center items-center overflow-hidden left-0 top-0 h-screen bg-gray-900 space-y-12 text-gray-200`}>
            <div className="flex items-center justify-between lg:max-w-[100%]">
                <h4 className="mx-5 text-xl font-[500]">Filtros</h4>
                <svg onClick={openFilter} className="fill-gray-200 w-15 p-2 bg-red-800 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
                </svg>
            </div>
            <div className="lg:max-w-[50%]">
                <ul className="flex flex-col gap-4">
                    {filtros.map((el, index) => (
                        <li key={index} className="text-xl py-2 px-3 rounded-lg cursor-pointer lg:hover:bg-gray-500 transition-colors duration-300" onClick={opcionElegidaFunc}>{el}</li>
                    ))}
                </ul>
            </div>
        </div>
        <section className="space-y-8">
            <section id='categorias' className='flex flex-col items-center justify-center'>
                <div className=''>
                    <div className="flex flex-col">
                        <h2 className='text-3xl text-center md:text-left mb-4 text-[#ccc]'>Catálogo principal</h2>
                    </div>
                    <div className={`flex items-center overflow-auto w-[350px] md:w-auto snap-mandatory snap-start snap-always snap-x md:grid md:grid-cols-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-1`}>
                        {filtroBusqueda.map(el => (
                            <div key={el.key}>
                                <CarCards carType={el.value} img={el.img[0]} marca={el.marca} modelo={el.modelo} año={el.año} precio={`${el.precio}`} ubicacion={el.ubicacion} src={`/categorias/${el.value}/${el.key}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    </>;
}

export default Filtro;