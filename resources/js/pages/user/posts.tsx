import { FilterProps } from '@/types/types';
import AppFront from '@/AppFront';
import Filtro from '@/components/Filtro';

export default function userPosts({ posts, loguedUser, provincias, municipios, carType, carBrands, currencies }: FilterProps) {
    return <AppFront loguedUser={loguedUser}>
        <Filtro posts={posts} loguedUser={loguedUser} provincias={provincias} municipios={municipios} carType={carType} carBrands={carBrands} currencies={currencies} />
    </AppFront>;
}