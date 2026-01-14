import { Link } from "react-router-dom";

interface Props {
    img: string,
    marca: string,
    modelo: string,
    año: string,
    km?: string,
    precio: string,
    ubicacion: string,
    carType: string,
    src: string,
}

function CarCards(props: Props) {
    const { img, marca, modelo, año, ubicacion, precio, src } = props;

    return <>
        <Link to={src} className={`flex flex-col justify-around bg-[#222] shadow-sm transition-shadow duration-200 hover:shadow-gray-200 min-h-[550px] text-gray-200 p-3.5 rounded-xl gap-0.5 my-3.5 md:my-0 min-w-[350px] md:min-w-auto snap-center`} title="Ver vehiculo">
            <div className="flex items-center justify-center">
                <img src={img} alt="Imagen del vehiculo" className="rounded-xl object-contain w-full max-h-[300px] min-h-[300px]" />
            </div>
            <div className="mb-6 mt-2 space-y-3">
                <h4 className="font-medium text-lg text-wrap">{`${marca} ${modelo} ${año}`}</h4>
                <h6 className="font-semibold">Lugar: {ubicacion}</h6>
            </div>
            <hr className="text-gray-500/30" />
            <div className="flex flex-col justify-center gap-2 my-2">
                <h3 className="text-xl font-bold">Precio:</h3><h4 className="font-[700] text-2xl">{precio}</h4>
            </div>
        </Link>
    </>;
}

export default CarCards;