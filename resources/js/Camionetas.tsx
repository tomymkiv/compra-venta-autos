import Vehiculos from "./components/Vehiculos";
// la categoria tambien se exporta al filtro, por lo que si esta categoria es de "camionetas", el filtro tambien va a filtrar por camionetas.
function Camionetas() {
    return <>
        <Vehiculos categoria="camionetas" />
    </>
}

export default Camionetas;