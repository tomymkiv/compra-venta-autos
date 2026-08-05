import AppFront from '@/AppFront';
import PopUp from '@/components/PopUp';
import usePopUp from '@/hooks/use-popup';
import { ReviewsProps } from '@/types/types'
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function index({ reviews }: ReviewsProps) {
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
        <div className='max-w-6xl mx-auto py-12 mx-3'>
            <h1>index (todas las reviews)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="flex flex-col justify-between bg-[#222831bb] p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Review de: {review.reviewer.name}</h2>
                        <h2 className="text-xl font-semibold mb-2">Hacia: {review.reviewed_user.name}</h2>
                        {
                            review.comment &&
                            <p className="text-gray-300 mb-4">Comentario: {review.comment}</p>
                        }

                        <div className="flex flex-col gap-2 justify-between">
                            <label htmlFor="rating">Rating</label>
                            {
                                <div className='flex gap-3'>
                                    {[
                                        [...Array(5)].map((_i: number, i: number) => (
                                            <button key={i} type="button" className={`text-2xl ${Number(review.rating) >= i + 1 ? 'text-yellow-400' : 'text-gray-400'}`}>
                                                ★
                                            </button>
                                        ))
                                    ]}
                                </div>
                            }
                            <div className="flex gap-2">
                                <Link
                                    href={route('admin.users.reviews.edit', review.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(review.id)}
                                    className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    Eliminar
                                </button>
                            </div>
                            <p className={`${review.status_id == 1 ? 'text-orange-400' : review.status_id == 2 ? 'text-green-400' : 'text-red-400'} px-4 py-2 rounded-md font-semibold text-lg`}>{review.status_id == 1 ? 'Ocultada' : review.status_id == 2 ? 'Visible' : 'Rechazada'}</p>
                        </div>
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
                ))}
            </div>
        </div>
    </AppFront>
}
