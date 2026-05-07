import { FilterProps } from '@/types/types';
import AppFront from '@/AppFront';
import Filtro from '@/components/Filtro';
import { usePage } from '@inertiajs/react';
import { User } from '@/types';

export default function index({ posts, carBrands, carType, provincias, municipios, currencies, roles }: FilterProps) {
    const { user } = usePage().props;
    console.log(user);
    return <AppFront loguedUser={user as User}>
        <Filtro posts={posts} loguedUser={user as User} carBrands={carBrands} showPages={true} carType={carType} provincias={provincias} municipios={municipios} currencies={currencies} roles={roles} />
    </AppFront>;
}