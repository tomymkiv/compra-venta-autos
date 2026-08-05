import { Head } from '@inertiajs/react'
import AppFront from '@/AppFront'
import { ReviewsProps } from '@/types/types'

export default function show({ reviews, userReviewCount, reviewAverage, user }: ReviewsProps) {
    return (
        <AppFront>
            <Head title={`Reseñas de ${user?.name}`} />
            <section className='flex flex-col space-y-6'>
                <div className='flex flex-col w-full'>
                    <p>Este usuario tiene {userReviewCount} {userReviewCount == 1 ? `reseña` : `reseñas`}</p>
                    <p>Promedio: {reviewAverage.toFixed(1)}</p>
                </div>
                {
                    reviews.map(review => (
                        review.status_id == 2 && <div key={review.id} className='flex w-full bg-white p-4 rounded-lg shadow-md'>
                            {
                                //  && // verifico que la reseña esté aprobada
                                <div key={review.id}>
                                    <p>{review.comment && `Comentario: ${review.comment}`}</p>
                                    {/* <label htmlFor="rating">Rating</label> */}
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
                                    <p>Usuario: {review.reviewer.name}</p>
                                </div>

                            }
                        </div>
                    ))
                }
            </section>
        </AppFront>
    )
}
