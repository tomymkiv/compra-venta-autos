interface Props {
    titulo: string,
    descripcion: string,
    clases?: string, // para ordenar las imagenes (si van antes o despues de )
    img: string,
}

import Images from "./Images";
import Titulo from "./Titulo";

function Presentaciones(props: Props) {
    const { clases, img, titulo, descripcion } = props;
    return <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-20">
            <div className="flex flex-col max-w-[full]">
                <Titulo titulo={titulo} />
                <p>{descripcion}</p>
            </div>
            <div className={clases}>
                <Images src={img} alt="Imagen de presentación" />
            </div>
        </div>
    </div>
}

export default Presentaciones;