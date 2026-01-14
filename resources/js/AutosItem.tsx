import { useParams } from "react-router-dom";
import VehiculosItem from "./components/VehiculosItem";

function AutosItem() {
    const { id } = useParams();
    
    return <VehiculosItem categoria="autos" id={id} />
}

export default AutosItem;