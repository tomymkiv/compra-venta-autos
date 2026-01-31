import { FilterProps } from '@/types/automovil';
import AppFront from '@/AppFront';
import Filtro from '@/components/Filtro';

// NECESITA LAS PROVINCIAS
export default function userPosts({ posts, loguedUser, provincias, municipios, carType, carBrands }: FilterProps) {
    return <AppFront loguedUser={loguedUser}>
        <Filtro posts={posts} loguedUser={loguedUser} provincias={provincias} municipios={municipios} carType={carType} carBrands={carBrands} />
    </AppFront>;
}