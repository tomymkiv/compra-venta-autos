import AppFront from "@/AppFront";
import Filtro from "@/components/Filtro";
import { User } from "@/types";
import { FilterProps } from "@/types/types";
import { usePage } from "@inertiajs/react";

export default function SearchIndex({ posts, carBrands, carType, provincias, municipios, currencies, roles }: FilterProps) {
    const { user: UserProps } = usePage().props;
    const user = UserProps as User;

    return (
        <AppFront loguedUser={user}>
            <Filtro
                posts={posts}
                carBrands={carBrands}
                showPages={true}
                carType={carType}
                provincias={provincias}
                municipios={municipios}
                currencies={currencies}
                roles={roles}
            />
        </AppFront>
    );
}