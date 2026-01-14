interface Props {
    categoria: string, // categoria de autos que quiero filtrar (se envía a cada componente de cada categoria por separado, ya sea autos, camionetas, motos, etc)
}

import App from "../App";
import Filtro from "./Filtro";

function Vehiculos(props: Props) {
    const { categoria } = props;

    return <>
        <App>
            <Filtro categoria={categoria} />
        </App>
    </>;
}

export default Vehiculos;