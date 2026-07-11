import { FilterProps } from '@/types/types';
import AppFront from '@/AppFront';
import Filtro from '@/components/Filtro';

export default function userPosts({ posts, provincias, municipios, vehicleBodies, carBrands, currencies }: FilterProps) {
    return <AppFront>
        <Filtro posts={posts} provincias={provincias} municipios={municipios} vehicleBodies={vehicleBodies} carBrands={carBrands} currencies={currencies} />
    </AppFront>;
}