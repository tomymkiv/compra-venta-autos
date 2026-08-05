import AppFront from '@/AppFront'
import { Review, ReviewStatus } from '@/types/types'
import { Head, useForm } from '@inertiajs/react'
import { route } from 'ziggy-js'

export default function edit({ review, allReviewStatus }: { review: Review, allReviewStatus: ReviewStatus[] }) {
    const { data, setData, patch, errors } = useForm({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        status_id: review.status_id,
        reviewed_user_id: review.reviewed_user_id,
        reviewer_id: review.reviewer_id,
    })
    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.users.reviews.update', review.id));
    }
    return (
        <AppFront>
            <div>
                <h1>editar review</h1>
                <Head title='Editar reseña - Admin' />
                <form onSubmit={handleUpdate} className='flex flex-col w-full'>
                    <label htmlFor="status_id">Estado</label>
                    <select name="status_id" id="status_id" value={data.status_id} onChange={(e) => setData('status_id', Number(e.target.value))}>
                        {allReviewStatus.map((status) => (
                            <option key={status.id} value={status.id}>{status.name}</option>
                        ))}
                    </select>
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
                    <textarea name="comment" id="comment" value={data.comment ? data.comment : ''} onChange={(e) => setData('comment', e.target.value)} />
                    {errors.comment && <p>{errors.comment}</p>}
                    {errors.status_id && <p>{errors.status_id}</p>}
                    <button type="submit" className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md'>Editar</button>
                </form>
            </div>
        </AppFront>
    )
}
