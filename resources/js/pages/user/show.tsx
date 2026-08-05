import ProfileSection from "@/components/ProfileSection";
import { User } from "@/types";
import { ReviewsProps } from "@/types/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { createPortal } from "react-dom";
import FormFieldTextarea from "@/components/FormFieldTextarea";

export default function show({ posts, profileUser, hasReviewed, userReviews, reviewAverage }: ReviewsProps) {
    const { user: UserProps } = usePage().props;
    const user = UserProps as User;
    const { data, setData, post, errors, setError, clearErrors } = useForm({
        reviewed_user_id: profileUser.id, // usuario reseñado (el del perfil)
        reviewer_id: user.id, // usuario que deja la reseña (usuario logueado)
        status_id: 2, // apruebo desde el backend
        rating: 0,
        comment: ''
    })
    // "user" es el usuario logueado
    // "profileUser" es el usuario del perfil
    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.rating) {
            setError('rating', 'La puntuación es obligatoria.');
            return;
        }

        clearErrors();
        post(route('review.store', profileUser.id));
    }
    return createPortal(
        <ProfileSection hasReviewed={hasReviewed} posts={posts} profileUser={profileUser}>
            <div className="flex items-center gap-10 md:gap-0 justify-between m-3 flex-wrap">
                <div>
                    {
                        posts && posts.length > 0 ?
                            <div className="flex justify-start flex-wrap w-full gap-3">
                                <p>Publicaciones: {posts.length}.</p>
                                <Link href={route('user.posts', profileUser.id)} className="text-blue-500 hover:underline">Ver publicaciones.
                                </Link>
                            </div>
                            :
                            <p>Este usuario no tiene publicaciones.</p>
                    }
                    <div className="flex justify-start flex-wrap w-full gap-3">
                        {
                            reviewAverage ? [...Array(5)].map((_i: number, i: number) => {
                                const fillPercentage = Math.min(Math.max((Number(reviewAverage) - i) * 100, 0), 100);
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setData('rating', i + 1)}
                                        className="text-2xl inline-block bg-clip-text text-transparent select-none"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, #facc15 ${fillPercentage}%, #9ca3af ${fillPercentage}%)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}
                                    >
                                        ★
                                    </button>
                                );
                            }) : ""}
                        <p>Promedio de reseñas: {reviewAverage.toFixed(1)}</p>
                        <Link href={route('review.show', profileUser.id)} className="text-blue-500 hover:underline">Ver reseñas.</Link>
                    </div>
                </div>
                <div>
                    {
                        user && user.name === profileUser.name &&
                        <Link href={route('user.edit')} className="text-blue-500 hover:underline w-full">Editar perfil</Link>
                    }
                </div>
                <div>
                    {
                        user && user.name !== profileUser.name && !hasReviewed ?
                            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-2 w-full justify-start">
                                <label className="text-sm" htmlFor="review">Dejar una puntuacion:</label>
                                <p className="text-red-400 text-sm">{errors.rating}</p>
                                {
                                    <>
                                        {
                                            [...Array(5)].map((_i: number, i: number) => (
                                                <button key={i} type="button" onClick={() => setData('rating', i + 1)} className={`text-2xl ${Number(data.rating) >= i + 1 ? 'text-yellow-400' : 'text-gray-400'}`}>
                                                    ★
                                                </button>
                                            ))
                                        }
                                        <button type="button" onClick={() => {
                                            setData('rating', 0);
                                            setData('comment', '');
                                        }} className={`text-2xl ${Number(data.rating) >= 0 ? 'text-yellow-400' : 'text-gray-400'}`}>
                                            Cancelar reseña
                                        </button>
                                    </>
                                }

                                <FormFieldTextarea errorsText={errors.comment} titulo="Comentario (opcional)" value={data.comment} onChangeEventTextarea={(e) => setData('comment', e.target.value)} />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded w-fit" type="submit">Enviar</button>
                            </form>
                            : user && user.name !== profileUser.name && userReviews && userReviews.status_id === 2 ? <>
                                <p>
                                    ya reseñaste este usuario
                                </p>
                                <Link href={route('review.edit', userReviews && userReviews.id)} className="p-2 bg-amber-500 rounded text-white">editar reseña</Link>
                            </>
                                : user && user.name !== profileUser.name && userReviews && userReviews.status_id !== 2 &&
                                <p className={`text-xs ${userReviews?.status_id == 1 ? 'text-yellow-500' : 'text-red-500'} px-4 py-2 rounded w-fit`}>
                                    {userReviews?.status_id == 1 ? 'Tu reseña está en revisión' : 'Tu reseña fue rechazada por un administrador. Contactate con él si querés hacer algún reclamo.'}
                                </p>
                    }
                </div>
            </div>
        </ProfileSection>
        , document.body)
}