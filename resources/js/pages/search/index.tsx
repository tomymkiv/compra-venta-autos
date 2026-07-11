import AppFront from "@/AppFront";
import Filtro from "@/components/Filtro";
import { FilterProps } from "@/types/types";


export default function SearchIndex({ posts, carBrands, vehicleBodies, provincias, municipios, currencies }: FilterProps) {

    return (
        <AppFront >
            <Filtro
                posts={posts}
                carBrands={carBrands}
                showPages={true}
                vehicleBodies={vehicleBodies}
                provincias={provincias}
                municipios={municipios}
                currencies={currencies}
            />
        </AppFront>
    );
}