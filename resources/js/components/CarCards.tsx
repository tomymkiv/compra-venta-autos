import { Link } from "@inertiajs/react";
import { type CarCardsProps } from "@/types/types";
import { route } from "ziggy-js";

export default function CarCards({ post }: CarCardsProps) {
    const handleDots = (precio: string) => {
        const raw = precio.replace(/\D/g, "");
        return raw ? Number(raw).toLocaleString("es-AR") : "";
    }
    return <>
        <Link href={route('posts.show', post.id)} className={`flex flex-col justify-around bg-[#222] shadow-sm transition-shadow duration-200 hover:shadow-blue-400 min-h-[550px] text-gray-200 p-3.5 rounded-xl gap-0.5 my-3.5 md:my-0 min-w-auto`} title="Ver vehiculo">
            <div className="flex items-center justify-center">
                <img src={`/${post.main_image.url}`} alt="Imagen del vehiculo" className="rounded-xl object-contain w-full max-h-[300px] min-h-[300px]" />
            </div>
            <div className="mb-6 mt-2 space-y-1.5">
                <h4 className="font-medium text-lg text-wrap">{`${post.car.car_model.car_brand.marca} ${post.car.car_model.modelo} ${post.car.anio}`}</h4>
                <h6 className="font-semibold">📍{post.municipio.nombre}, {post.municipio.provincia.nombre}</h6>
            </div>
            <hr className="text-gray-500/30" />
            <div className="flex flex-col justify-center gap-2 my-2">
                <h3 className="text-xl font-bold">Precio:</h3><h4 className="font-[700] text-2xl"> {post.id_currency == 1 ? 'U$S' : '$'} {handleDots(post.precio.toString())}</h4>
            </div>
        </Link>
    </>;
}