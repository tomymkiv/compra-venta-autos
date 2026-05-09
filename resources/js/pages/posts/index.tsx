import { FilterProps } from '@/types/types';
import AppFront from '@/AppFront';
import Filtro from '@/components/Filtro';

export default function index({ posts, carBrands, carType, provincias, municipios, currencies }: FilterProps) {
    return <AppFront>
        <Filtro
            posts={posts}
            carBrands={carBrands}
            showPages={true}
            carType={carType}
            provincias={provincias}
            municipios={municipios}
            currencies={currencies}
        />
    </AppFront>;
}