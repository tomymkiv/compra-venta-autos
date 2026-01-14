import { useParams } from "react-router-dom";
import VehiculosItem from "./components/VehiculosItem";

function CamionetasItem() {
    const { id } = useParams();
    
    return <VehiculosItem categoria="camionetas" id={id} />
}

export default CamionetasItem;