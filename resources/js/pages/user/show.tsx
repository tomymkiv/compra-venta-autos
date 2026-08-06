import ProfileSection from "@/components/ProfileSection";
import { User } from "@/types";
import { ReviewsProps } from "@/types/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { createPortal } from "react-dom";
import FormFieldTextarea from "@/components/FormFieldTextarea";
import { useState } from "react";
import ButtonPrimary from "@/components/ui/ButtonPrimary";

export default function show({ posts, profileUser, hasReviewed, userReviews, reviewAverage, userReviewCount }: ReviewsProps) {
    console.log(userReviewCount)
    const { user: UserProps } = usePage().props;
    const user = UserProps as User;
    const { data, setData, post, errors, setError, clearErrors } = useForm({
        reviewed_user_id: profileUser.id, // usuario reseñado (el del perfil)
        reviewer_id: user && user.id, // usuario que deja la reseña (usuario logueado)
        status_id: 2, // apruebo desde el backend
        rating: 0,
        comment: ''
    })
    const [showReviewContainer, setShowReviewContainer] = useState(false);
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
        setShowReviewContainer(false);
    }
    const handleReview = () => {
        setShowReviewContainer(!showReviewContainer);
        setData({
            reviewed_user_id: profileUser.id,
            reviewer_id: user.id,
            status_id: 2,
            rating: 0,
            comment: ''
        });
        clearErrors();
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
                    <div className="flex items-center gap-3 flex-wrap mt-2 bg-gray-800/60 backdrop-blur-xs p-3 rounded-lg border border-gray-700/50">
                        <div className="flex items-center gap-1">
                            {
                                reviewAverage ? [...Array(5)].map((_i: number, i: number) => {
                                    const fillPercentage = Math.min(Math.max((Number(reviewAverage) - i) * 100, 0), 100);
                                    return (
                                        <span
                                            key={i}
                                            className="text-xl inline-block bg-clip-text text-transparent select-none"
                                            style={{
                                                backgroundImage: `linear-gradient(to right, #facc15 ${fillPercentage}%, #4b5563 ${fillPercentage}%)`,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }}
                                        >
                                            ★
                                        </span>
                                    );
                                }) : ""
                            }
                        </div>
                        {
                            userReviewCount >= 1 &&
                            <>
                                <span className="text-sm font-semibold text-gray-200">
                                    {reviewAverage.toFixed(1)}
                                </span>
                                <span className="text-gray-500">•</span>
                                <Link href={route('review.show', profileUser.id)} className="text-sm text-amber-400 hover:text-amber-300 transition-colors hover:underline">
                                    Ver reseñas
                                </Link>
                            </>
                        }
                        {
                            userReviewCount === 0 &&
                            <span className="text-sm font-semibold text-gray-200">Sin reseñas</span>
                        }

                    </div>
                </div>
                <div>
                    {
                        user && user.name === profileUser.name &&
                        <Link href={route('user.edit')} className="text-blue-500 hover:underline w-full">Editar perfil</Link>
                    }
                </div>
                {
                    !hasReviewed ? (
                        <ButtonPrimary text="Dejar reseña" className="!w-fit !bg-amber-500 hover:!bg-amber-600 !border-amber-500 !text-white font-medium px-4 py-2 rounded-md transition-colors cursor-pointer shadow-md" onClick={() => setShowReviewContainer(true)} />
                    ) : (
                        user && user.name !== profileUser.name && userReviews && (
                            <div className="flex items-center gap-3 flex-wrap">
                                {userReviews.status_id === 1 && (
                                    <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-2 rounded-md">
                                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                                        Tu reseña está en revisión
                                    </div>
                                )}
                                {userReviews.status_id === 3 && (
                                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2 rounded-md">
                                        <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                        Tu reseña fue rechazada por un administrador. Contactate con él si querés hacer algún reclamo.
                                    </div>
                                )}
                                {userReviews.status_id === 2 && (
                                    <div className="flex flex-col justify-between items-start gap-3 bg-gray-800/80 border border-gray-700/60 px-3 py-2 rounded-md">
                                        <span className="text-sm text-gray-300">Ya reseñaste a este usuario</span>
                                        <Link
                                            href={route('review.edit', userReviews.id)}
                                            className="px-3 py-1 text-sm font-medium rounded-md bg-amber-500 text-gray-800 hover:bg-amber-600 transition-colors shadow-xs w-full text-center"
                                        >
                                            Editar reseña
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )
                    )
                }
                {
                    showReviewContainer &&
                    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                        {
                            user && user.name !== profileUser.name && !hasReviewed &&
                            <form onSubmit={handleReviewSubmit} className="bg-gray-800 rounded-lg p-6 shadow-xl w-full max-w-md flex flex-col gap-4">
                                <h2 className="text-lg font-semibold text-white">Dejar una reseña</h2>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-300">Puntuación:</label>
                                    <div className="flex items-center gap-1">
                                        {
                                            [...Array(5)].map((_i: number, i: number) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => setData('rating', i + 1)}
                                                    className={`text-3xl transition-colors hover:scale-110 cursor-pointer ${Number(data.rating) >= i + 1 ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-200'}`}
                                                >
                                                    ★
                                                </button>
                                            ))
                                        }
                                    </div>
                                    {errors.rating && <p className="text-red-400 text-xs mt-1">{errors.rating}</p>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <FormFieldTextarea
                                        className="border border-blue-500"
                                        errorsText={errors.comment}
                                        titulo="Comentario (opcional)"
                                        value={data.comment}
                                        onChangeEventTextarea={(e) => setData('comment', e.target.value)}
                                    />
                                </div>

                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={handleReview}
                                        className="cursor-pointer px-4 py-2 text-sm font-medium rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="cursor-pointer px-4 py-2 text-sm font-medium rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        }
                    </div>
                }
            </div>
        </ProfileSection>
        , document.body)
}