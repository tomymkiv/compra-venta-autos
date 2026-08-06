import PopUp from '@/components/PopUp';
import ButtonPrimary from '@/components/ui/ButtonPrimary';
import usePopUp from '@/hooks/use-popup';
import { Review, ReviewStatus } from '@/types/types';
import { useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface ReviewFormProps {
    review: Review;
    allReviewStatus?: ReviewStatus[];
    updateRoute: string;
    deleteRoute?: string;
    title?: string;
    isAdmin?: boolean;
}

export default function ReviewForm({
    review,
    allReviewStatus,
    updateRoute,
    deleteRoute,
    title = 'Editar reseña',
    isAdmin = false // inicialmente es falso, porque es para modificar mi propia reseña desde /user/reviews/edit (no el panel de admin)
}: ReviewFormProps) {
    const { show, setShow, confirmDelete, setConfirmDelete } = usePopUp();
    const { data, setData, patch, errors } = useForm({
        id: review.id,
        rating: review.rating,
        comment: review.comment ?? '',
        status_id: review.status_id,
        reviewed_user_id: review.reviewed_user_id,
        reviewer_id: review.reviewer_id,
    });

    const [reviewId, setReviewId] = useState<number>();

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        patch(updateRoute);
    };

    const handleDelete = (id: number) => {
        setShow(true);
        setReviewId(id);
    };

    useEffect(() => {
        if (confirmDelete && reviewId && deleteRoute) {
            router.delete(deleteRoute);
            setShow(false);
            setReviewId(0);
            setConfirmDelete(false);
        }
    }, [confirmDelete, reviewId, deleteRoute]);

    return (
        <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-4 w-full">
            <form onSubmit={handleUpdate} className="bg-gray-800 rounded-lg p-6 shadow-xl w-full max-w-md flex flex-col gap-5 border border-gray-700/50">
                <h1 className="text-xl font-semibold text-white">{title}</h1>

                {/* Selección de estado si es administrador */}
                {isAdmin && allReviewStatus && allReviewStatus.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <label htmlFor="status_id" className="text-sm font-medium text-gray-300">
                            Estado:
                        </label>
                        <select
                            name="status_id"
                            id="status_id"
                            value={data.status_id}
                            onChange={(e) => setData('status_id', Number(e.target.value))}
                            className="w-full bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-md p-3 focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            {allReviewStatus.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                        {errors.status_id && <p className="text-red-400 text-xs">{errors.status_id}</p>}
                    </div>
                )}

                {/* Rating / Puntuación */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-300">Puntuación:</label>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_i: number, i: number) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setData('rating', i + 1)}
                                className={`text-3xl transition-colors hover:scale-110 cursor-pointer ${Number(data.rating) >= i + 1 ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-200'
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    {errors.rating && <p className="text-red-400 text-xs mt-1">{errors.rating}</p>}
                </div>

                {/* Comentario */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="comment" className="text-sm font-medium text-gray-300">
                        Comentario (opcional):
                    </label>
                    <textarea
                        name="comment"
                        id="comment"
                        rows={4}
                        value={data.comment}
                        onChange={(e) => setData('comment', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-md p-3 focus:outline-none focus:border-blue-500 transition-colors resize-y min-h-[100px]"
                    />
                    {errors.comment && <p className="text-red-400 text-xs">{errors.comment}</p>}
                </div>

                {/* Botones de acción */}
                <div className={`flex flex-col md:flex-row ${deleteRoute ? 'justify-between' : 'justify-end'} items-center pt-2 gap-2`}>
                    {deleteRoute && (
                        <ButtonPrimary
                            text="Eliminar"
                            type="button"
                            onClick={() => handleDelete(review.id)}
                            className="cursor-pointer px-4 py-2 text-sm font-medium rounded-md bg-red-700 text-white hover:bg-red-600 focus:!border-red-500 !border-red-700 transition-colors w-full md:w-auto"
                        />
                    )}
                    <ButtonPrimary
                        text="Confirmar"
                        type="submit"
                        className="cursor-pointer px-4 py-2 text-sm font-medium rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors w-full md:w-auto"
                    />
                </div>

                {show && deleteRoute && (
                    <PopUp
                        setShow={setShow}
                        title="Eliminar reseña"
                        confirmDelete={setConfirmDelete}
                        deleteButton={true}
                        mensaje="¿Estás seguro de que quieres eliminar la reseña?"
                    />
                )}
            </form>
        </div>
    );
}
