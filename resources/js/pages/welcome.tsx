import AppFront from '@/AppFront';
import CarCards from '@/components/CarCards';
import Presentaciones from '@/components/Presentaciones';
import { PageProps } from '@/types/types';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

const IMG = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F1786225.jpg&f=1&nofb=1&ipt=2b135c4bddd2bfb32c0dff63c651db0046bdf5b1d6ac630a4a0690b279ad18c5";

export default function Welcome({ posts }: PageProps) {
    const hero = (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Imagen de fondo */}
            <img src={IMG} alt=""
                className='top-0 fixed inset-0 w-full h-full object-cover object-center brightness-50' />
            {/* Difuminado de abajo hacia arriba */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" /> */}
            {/* Degradé lateral izquierdo (desktop) */}
            {/* <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/70 via-black/20 to-transparent" /> */}
            {/* Texto superpuesto */}
            <div className="relative z-20 flex flex-col justify-center h-full px-3 md:px-10">
                <div className='max-w-[388px] lg:max-w-[33%] space-y-5'>
                    <h1 className='text-4xl text-left animate-text-pulse md:text-5xl lg:text-6xl text-[#ccc] font-[200]'>Silvetti Automotores</h1>
                    <p className='text-white'>Somos un grupo de vendedores independientes dedicados a la compra, venta y permuta de vehículos, unidos por la transparencia y el trato directo.</p>
                </div>
            </div>
            {/* Transición suave hacia el contenido siguiente */}
            <div className="absolute bottom-0 left-0 right-0 h-100 bg-gradient-to-t from-[#111] to-transparent z-30" />
        </div>
    );

    return (
        <AppFront hero={hero}>
            <section className='flex flex-col gap-25 mt-20 w-full'>
                <hr className="m-0 animate-box-pulse" />
                <div className="space-y-50">
                    <Presentaciones titulo="Sobre nosotros" descripcion="Trabajamos de forma autónoma, pero compartimos un mismo objetivo: que cada compra y venta sea clara y segura. Cada vehículo es ofrecido con información real y atención personalizada." img={IMG} />
                    <Presentaciones titulo="¿Por qué elegirnos?" descripcion="Porque creemos en el trato directo, sin intermediarios innecesarios. Ofrecemos autos seleccionados, información real y un acompañamiento cercano en cada paso." img={IMG} clases="lg:-order-1" />
                </div>
                <hr className="m-0 animate-box-pulse" />
                <section id='categorias' className='flex flex-col items-center justify-center'>
                    <div className='space-y-4'>
                        <div className={`grid ${posts.data.length > 0 ? 'md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-auto'} items-center gap-4 p-1`}>
                            <div className="col-span-full flex gap-3 items-center">
                                <h2 className="text-2xl font-bold">Últimas publicaciones</h2>
                                <Link href={route('posts.index')} className='text-blue-500 hover:underline'>Ver más</Link>
                            </div>
                            {
                                posts.data.map(post => (
                                    <div key={post.id}>
                                        <CarCards post={post} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </section>
        </AppFront>
    );
}
