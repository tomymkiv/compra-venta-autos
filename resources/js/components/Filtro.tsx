import { PageProps } from "@/types/automovil";
import { useRef, useState } from "react";
import CarCards from "./CarCards";
import Pagination from "./pagination";

export default function Filtro({ posts, loguedUser }: PageProps) {
    const filtros = ['Precio', 'Marca', 'Año'];
    // const inputRef = useRef<HTMLInputElement>(null!);
    const filtroOpcionRef = useRef<HTMLParagraphElement>(null!);
    const filterDeleterRef = useRef<SVGSVGElement>(null!);
    const [filterOn, setFilterOn] = useState(false);

    const openFilter = () => {
        !filterOn ? setFilterOn(true) : setFilterOn(false);
    }
    const inputFocus = () => {
        openFilter();
        // inputRef.current.focus();
    }
    const closeFilter = () => {
        // filterOn ? inputRef.current.classList.remove('hidden') : inputRef.current.classList.add('hidden');
        // inputRef.current.classList.add('hidden');
        filtroOpcionRef.current.textContent = '';
        filterDeleterRef.current.classList.add('hidden')
    }

    return <>

        <div className={`${filterOn ? 'fixed w-full z-50' : 'hidden w-0'} flex flex-col justify-center items-center overflow-hidden left-0 top-0 h-screen bg-gray-900 space-y-12 text-gray-200`}>
            <div className="flex items-center justify-between lg:max-w-[100%]">
                <h4 className="mx-5 text-xl font-[500]">Filtros</h4>
                <svg onClick={openFilter} className="fill-gray-200 w-15 p-2 bg-red-800 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
                </svg>
            </div>
            <div className="lg:max-w-[50%]">
                <ul className="flex flex-col gap-4">
                    {filtros.map((el, index) => (
                        <li key={index} className="text-xl py-2 px-3 rounded-lg cursor-pointer lg:hover:bg-gray-500 transition-colors duration-300 z-40">{el}</li>
                    ))}
                </ul>
            </div>
        </div>
        <section className="space-y-8">
            <section id='categorias' className='flex flex-col items-center justify-center'>
                <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                        <h2 className='text-3xl text-center md:text-left mb-4 text-[#ccc]'>Catálogo principal</h2>
                    </div>
                    <div className="flex items-center justify-between md:gap-5">
                        {/* <input type="text" ref={inputRef} className="hidden p-3 rounded-lg bg-gray-700" tabIndex={0} /> */}
                        <div className="flex justify-between gap-4 mb-4">
                            <svg onClick={inputFocus} className="fill-gray-200 w-10 cursor-pointer drop-shadow-lg hover:drop-shadow-gray-200 transition-all duration-400 z-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" tabIndex={1}>
                                <path d="M96 128C83.1 128 71.4 135.8 66.4 147.8C61.4 159.8 64.2 173.5 73.4 182.6L256 365.3L256 480C256 488.5 259.4 496.6 265.4 502.6L329.4 566.6C338.6 575.8 352.3 578.5 364.3 573.5C376.3 568.5 384 556.9 384 544L384 365.3L566.6 182.7C575.8 173.5 578.5 159.8 573.5 147.8C568.5 135.8 556.9 128 544 128L96 128z" />
                            </svg>
                            <svg onClick={closeFilter} ref={filterDeleterRef} className='hidden fill-gray-200 w-15 p-2 bg-red-800 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" tabIndex={2}>
                                <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className={`grid md:grid-cols-3 lg:grid-cols-4 items-center gap-4 p-1`}>
                        {posts.data.map(post => (
                            <div key={post.id} className="snap-center">
                                <CarCards post={post} src={`/posts/${post.id}`} loguedUser={loguedUser} />
                            </div>
                        ))}
                    </div>
                    {
                        posts.links ? <Pagination links={posts.links} /> : ''
                    }
                </div>
            </section>
        </section>
    </>;
}