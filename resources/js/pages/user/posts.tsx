import { type PageProps } from '@/types/automovil';
import AppFront from '@/AppFront';
import Filtro from '@/components/Filtro';

export default function userPosts({ posts, loguedUser }: PageProps) {
    return <AppFront loguedUser={loguedUser}>
        <Filtro posts={posts} loguedUser={loguedUser} />
    </AppFront>;
}