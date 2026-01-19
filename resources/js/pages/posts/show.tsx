import VehiculosItem from '@/components/VehiculosItem';
import { CarCardsProps } from '@/types/automovil';

export default function show({ post, loguedUser }: CarCardsProps) {
    return <VehiculosItem post={post} loguedUser={loguedUser} />
}