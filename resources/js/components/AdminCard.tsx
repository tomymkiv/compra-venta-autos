import { Link, router, usePage } from "@inertiajs/react"
import { route } from "ziggy-js"
import { User } from "@/types"
import { Post } from "@/types/types"
import { useEffect, useState } from "react"
import PopUp from "./PopUp"
import usePopUp from "@/hooks/use-popup"

interface Props {
    posts?: Post[]
    users?: User[]
    title: string // indico si estoy en los usuarios o posts
    hasReviews: boolean
}

export default function AdminCard({ posts, users, title, hasReviews }: Props) {
    const { user } = usePage().props;
    const adminUser = user as User;
    const { show, setShow, confirmDelete, setConfirmDelete } = usePopUp();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handlePopUp = (id: number) => (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();
        setSelectedId(id); // guardo el id del elemento a eliminar
        setShow(true);
    }
    useEffect(() => {
        if (confirmDelete && selectedId) {
            if (posts) {
                router.delete(route('admin.posts.destroy', selectedId));
            }
            if (users) {
                router.delete(route('admin.users.destroy', selectedId));
            }
            setSelectedId(null); // limpio el id, despues de eliminar (o no) un post/user
        }
        setShow(false);
        setConfirmDelete(false);
    }, [confirmDelete]);
    return <>
        <div className="h-full w-full p-6 rounded-xl">
            <h1 className="text-xl font-semibold text-gray-100 mb-6">{title}</h1>
            <div className="overflow-auto rounded-xl border border-gray-800 shadow-lg">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="bg-gray-900 text-gray-400 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Imagen</th>
                            <th className="px-6 py-4">Usuario</th>
                            <th className="px-6 py-4">Correo</th>
                            <th className="px-6 py-4">{users ? 'Rol' : 'Vehiculo'}</th>
                            <th className="px-6 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {
                            posts ? posts.map((post) => (
                                <tr
                                    key={post.id}
                                    className="hover:bg-gray-900/60 transition-colors"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-100">
                                        <Link href={route('posts.show', post.id)}>
                                            <img
                                                src={`/storage/${post.main_image.url}`}
                                                alt='Imagen principal del posteo'
                                                className="object-cover w-8 h-8 rounded-full"
                                            />
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-100">
                                        <Link className="hover:underline" href={route('user.show', post.user.id)}>
                                            {post.user.name}
                                        </Link>
                                        {
                                            post.user.name === adminUser.name && <span className="text-xs text-gray-200/50"> (vos)</span>
                                        }
                                    </td>

                                    <td className="px-6 py-4 text-gray-400">
                                        {post.user.email}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {post.car_model.car_brand.name} {post.car_model.name} {post.anio}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('admin.posts.edit', post.id)}
                                                className="text-center px-3 py-1.5 text-xs font-medium rounded-md bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition"
                                            >
                                                Editar post
                                            </Link>

                                            <Link
                                                onClick={handlePopUp(post.id)}
                                                className="text-center cursor-pointer px-3 py-1.5 text-xs font-medium rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                                            >
                                                Eliminar post
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                                :
                                users?.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-900/60 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-100">
                                            <Link
                                                href={route('user.show', user.id)}
                                            >
                                                <img
                                                    src={user.avatar?.includes('https') ? user.avatar : `/storage/${user.avatar}`}
                                                    alt='Avatar del usuario'
                                                    className="w-8 h-8 object-cover rounded-full"
                                                />
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-100">
                                            <Link className="hover:underline" href={route('user.show', user.id)}>
                                                {user.name}
                                            </Link>
                                            {
                                                user.email_verified_at ? <span className="text-xs text-green-500/50"> (verificado)</span>
                                                    :
                                                    <span className="text-xs text-red-500/50"> (no verificado)</span>
                                            }
                                        </td>

                                        <td className="px-6 py-4 text-gray-400">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {user.rol[0].name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('admin.users.edit', user.id)}
                                                    className="text-center px-3 py-1.5 text-xs font-medium rounded-md bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition"
                                                >
                                                    Editar usuario
                                                </Link>
                                                {
                                                    hasReviews &&
                                                    <Link
                                                        href={route('admin.users.reviews.show', user.id)}
                                                        className="text-center cursor-pointer px-3 py-1.5 text-xs font-medium rounded-md bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                                                    >
                                                        Ver reseñas escritas
                                                    </Link>
                                                }
                                                <Link
                                                    onClick={handlePopUp(user.id)}
                                                    className="text-center cursor-pointer px-3 py-1.5 text-xs font-medium rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                                                >
                                                    Eliminar usuario
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
            {
                show && posts &&
                <PopUp deleteButton={true}
                    setShow={setShow}
                    confirmDelete={setConfirmDelete}
                    title={`Eliminar publicación`} mensaje={`¿Estás seguro de que quieres eliminar esta publicación?`}
                />
            }
            {
                show && users &&
                <PopUp deleteButton={true} setShow={setShow} confirmDelete={setConfirmDelete} title={`Eliminar usuario`} mensaje={`¿Estás seguro de que quieres eliminar este usuario?`} />
            }
        </div>
    </>;
}