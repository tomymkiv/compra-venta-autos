import { FilterProps } from '@/types/automovil';
import AppFront from '@/AppFront';
import Filtro from '@/components/Filtro';

export default function index({ posts, loguedUser, carBrands, carType, provincias, municipios, currencies }: FilterProps) {
    return <AppFront loguedUser={loguedUser}>
        <Filtro posts={posts} loguedUser={loguedUser} carBrands={carBrands} showPages={true} carType={carType} provincias={provincias} municipios={municipios} currencies={currencies} />
    </AppFront>;
}