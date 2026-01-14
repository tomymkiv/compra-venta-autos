import { useParams } from "react-router-dom";
import VehiculosItem from "./components/VehiculosItem";

function MotosItem() {
    const { id } = useParams();
    
    return <VehiculosItem categoria="motos" id={id} />
}

export default MotosItem;