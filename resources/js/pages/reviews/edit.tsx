import AppFront from '@/AppFront';
import PopUp from '@/components/PopUp';
import usePopUp from '@/hooks/use-popup';
import { Review } from '@/types/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function edit({ review }: { review: Review }) {
    const { show, setShow, confirmDelete, setConfirmDelete } = usePopUp();
    const { data, setData, patch, errors } = useForm({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        status_id: review.status_id,
        reviewed_user_id: review.reviewed_user_id,
        reviewer_id: review.reviewer_id,
    })
    const [reviewId, setReviewId] = useState<number>();
    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('review.update', review.id));
    }
    const handleDelete = (id: number) => {
        setShow(true);
        setReviewId(id);
    }
    useEffect(() => {
        if (confirmDelete && reviewId) {
            router.delete(route('review.destroy', reviewId));
            setShow(false);
            setReviewId(0);
            setConfirmDelete(false);
        }
    }, [confirmDelete, reviewId]);
    return (
        <AppFront>
            <Head title='Editar reseña' />
            <form className='flex flex-col w-full'>
                {
                    <>
                        <label htmlFor="rating">Rating</label>
                        {
                            <div className='flex gap-3'>
                                {[
                                    [...Array(5)].map((_i: number, i: number) => (
                                        <button key={i} type="button" onClick={() => setData('rating', i + 1)} className={`text-2xl ${Number(data.rating) >= i + 1 ? 'text-yellow-400' : 'text-gray-400'}`}>
                                            ★
                                        </button>
                                    ))
                                ]}
                            </div>
                        }
                    </>
                }
                {errors.rating && <p>{errors.rating}</p>}
                <label htmlFor="comment">Comentario</label>
                <textarea name="comment" id="comment" value={data.comment} onChange={(e) => setData('comment', e.target.value)} />
                {errors.comment && <p>{errors.comment}</p>}
                <button type="button" onClick={handleUpdate}>Editar</button>
                <button type="button" onClick={() => handleDelete(review.id)} className={`text-2xl bg-red-500 p-3 text-gray-400`}>Eliminar reseña</button>
                {
                    show &&
                    <PopUp setShow={setShow} title='Eliminar reseña' confirmDelete={setConfirmDelete} deleteButton={true} mensaje={`¿Estás seguro de que quieres eliminar la reseña?`} />
                }
            </form>
        </AppFront>
    )
}
