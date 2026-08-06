import AppFront from '@/AppFront';
import Pagination from '@/components/pagination';
import PopUp from '@/components/PopUp';
import usePopUp from '@/hooks/use-popup';
import { PaginatedReviewsProps } from '@/types/types'
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function index({ reviews }: PaginatedReviewsProps) {
    const { show, setShow, confirmDelete, setConfirmDelete } = usePopUp();
    const [reviewId, setReviewId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setShow(true);
        setReviewId(id);
    }

    useEffect(() => {
        if (confirmDelete && reviewId) {
            router.delete(route('admin.users.reviews.destroy', reviewId));
            setReviewId(null);
        }
        setShow(false);
        setConfirmDelete(false);
    }, [confirmDelete])

    return <AppFront>
        <div className='max-w-6xl mx-auto py-8 px-4 flex flex-col gap-6'>
            <div className="flex justify-between items-center bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700/50">
                <div>
                    <h1 className="text-2xl font-bold text-white">Todas las reseñas</h1>
                    <p className="text-sm text-gray-400 mt-1">Gestión y moderación de reseñas de usuarios</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {reviews.data.map((review) => (
                    <div key={review.id} className="flex flex-col justify-between bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700/50 gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between gap-2 border-b border-gray-700/50 pb-3">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">De: <span className="font-semibold text-gray-200">{review.reviewer.name}</span></span>
                                    <span className="text-xs text-gray-400">Para: <span className="font-semibold text-gray-200">{review.reviewed_user.name}</span></span>
                                </div>

                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${review.status_id === 1 ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                    review.status_id === 2 ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                        'bg-red-500/10 text-red-400 border-red-500/30'
                                    }`}>
                                    {review.status_id === 1 ? 'En revisión' : review.status_id === 2 ? 'Visible' : 'Rechazada'}
                                </span>
                            </div>

                            <div className="flex items-center gap-1 my-1">
                                {[...Array(5)].map((_i: number, i: number) => (
                                    <span
                                        key={i}
                                        className={`text-lg ${Number(review.rating) >= i + 1 ? 'text-yellow-400' : 'text-gray-600'}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            {review.comment ? (
                                <p className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded-md border border-gray-700/30 whitespace-pre-line">
                                    {review.comment}
                                </p>
                            ) : (
                                <p className="text-gray-500 text-xs italic">Sin comentario adicional.</p>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-700/50">
                            <Link
                                href={route('admin.users.reviews.edit', review.id)}
                                className="px-3 py-1.5 text-xs font-medium rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                            >
                                Editar
                            </Link>
                            <button
                                onClick={() => handleDelete(review.id)}
                                className="cursor-pointer px-3 py-1.5 text-xs font-medium rounded-md bg-red-700 text-white hover:bg-red-600 transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination links={reviews.links} />

            {
                show &&
                <PopUp
                    deleteButton={true}
                    title='Eliminar reseña'
                    mensaje="¿Estás seguro de que quieres eliminar esta reseña?"
                    confirmDelete={setConfirmDelete}
                    setShow={setShow}
                />
            }
        </div>
    </AppFront>
}
