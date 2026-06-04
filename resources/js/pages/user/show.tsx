import ProfileSection from "@/components/ProfileSection";
import { User } from "@/types";
import { ProfileProps } from "@/types/types";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { createPortal } from "react-dom";

export default function show({ post, profileUser }: ProfileProps) {
    const { user: UserProps } = usePage().props;
    const user = UserProps as User;
    // "user" es el usuario logueado
    // "profileUser" es el usuario del perfil

    return createPortal(
        <ProfileSection post={post} profileUser={profileUser}>
            <div className="flex items-center gap-10 md:gap-0 justify-between m-3 flex-wrap">
                <div>
                    {
                        post && post.length > 0 ?
                            <div className="flex justify-start flex-wrap w-full gap-3">
                                <p>Publicaciones: {post.length}.</p>
                                <Link href={route('user.posts', profileUser.id)} className="text-blue-500 hover:underline">Ver publicaciones.
                                </Link>
                            </div>
                            :
                            <p>Este usuario no tiene publicaciones.</p>
                    }
                </div>
                <div>
                    {
                        user && user.name === profileUser.name &&
                        <Link href={route('user.edit')} className="text-blue-500 hover:underline w-full">Editar perfil</Link>
                    }
                </div>
            </div>
        </ProfileSection>
        , document.body)
}