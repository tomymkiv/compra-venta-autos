import { Link } from "@inertiajs/react";
import { type CarCardsProps } from "@/types/automovil";

export default function CarCards({post, src}: CarCardsProps) {
    return <>
        <Link href={src} className={`flex flex-col justify-around bg-[#222] shadow-sm transition-shadow duration-200 hover:shadow-gray-200 min-h-[550px] text-gray-200 p-3.5 rounded-xl gap-0.5 my-3.5 md:my-0 min-w-[350px] md:min-w-auto`} title="Ver vehiculo">
            <div className="flex items-center justify-center">
                <img src={`/${post.main_image.url}`} alt="Imagen del vehiculo" className="rounded-xl object-contain w-full max-h-[300px] min-h-[300px]" />
            </div>
            <div className="mb-6 mt-2 space-y-3">
                <h4 className="font-medium text-lg text-wrap">{`${post.car.car_model.car_brand.marca} ${post.car.car_model.modelo} ${post.car.anio}`}</h4>
                <h6 className="font-semibold">Lugar: {post.ubicacion}</h6>
            </div>
            <hr className="text-gray-500/30" />
            <div className="flex flex-col justify-center gap-2 my-2">
                <h3 className="text-xl font-bold">Precio:</h3><h4 className="font-[700] text-2xl">$ {post.precio}</h4>
            </div>
        </Link>
    </>;
}