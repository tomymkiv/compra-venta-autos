import AppFront from "@/AppFront";
import Filtro from "@/components/Filtro";
import { FilterProps } from "@/types/types";

export default function SearchIndex({ posts, loguedUser, carBrands, carType, provincias, municipios, currencies }: FilterProps) {
    return (
        <AppFront loguedUser={loguedUser}>
            <Filtro posts={posts} loguedUser={loguedUser} showPages={true} carBrands={carBrands} carType={carType} provincias={provincias} municipios={municipios} currencies={currencies} />
        </AppFront>
    );
}