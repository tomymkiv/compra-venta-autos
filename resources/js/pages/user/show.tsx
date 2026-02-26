import ProfileSection from "@/components/ProfileSection";
import { ProfileProps } from "@/types/automovil";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function show({ loguedUser, post, user }: ProfileProps) {
    return <ProfileSection loguedUser={loguedUser} post={post} user={user}>
        <div className="flex items-center gap-10 md:gap-0 justify-between m-3 flex-wrap">
            <div>
                {
                    post && post.length > 0 ?
                        <div className="flex justify-start flex-wrap w-full gap-3">
                            <p>Publicaciones: {post.length}.</p>
                            <Link href={route('user.posts', user.id)} className="text-blue-500 hover:underline">Ver publicaciones.
                            </Link>
                        </div>
                        :
                        <p>Este usuario no tiene publicaciones.</p>
                }
            </div>
            <div>
                {
                    loguedUser ? loguedUser.name === user.name &&
                        <Link href={route('user.edit')} className="text-blue-500 hover:underline w-full">Editar perfil</Link>
                        : null
                }
            </div>
        </div>
    </ProfileSection>
}