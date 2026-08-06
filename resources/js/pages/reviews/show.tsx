import { Head } from '@inertiajs/react'
import AppFront from '@/AppFront'
import { PaginatedReviewsProps } from '@/types/types'
import Pagination from '@/components/pagination'

export default function show({ reviews, userReviewCount, reviewAverage, user_reviewer }: PaginatedReviewsProps) {
    return (
        <AppFront>
            <Head title={`Reseñas de ${user_reviewer?.name}`} />
            <section className='max-w-4xl mx-auto w-full flex flex-col gap-6 p-4'>
                {/* Header informativo */}
                <div className='bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-xl font-bold text-white'>Reseñas de {user_reviewer?.name}</h1>
                        <p className='text-sm text-gray-400 mt-1'>
                            {userReviewCount} {userReviewCount === 1 ? 'reseña recibida' : 'reseñas recibidas'}
                        </p>
                    </div>

                    <div className='flex items-center gap-3 bg-gray-900/60 px-4 py-3 rounded-lg border border-gray-700/50 w-fit'>
                        <div className='flex items-center gap-1'>
                            {[...Array(5)].map((_i: number, i: number) => {
                                const fillPercentage = Math.min(Math.max((Number(reviewAverage) - i) * 100, 0), 100);
                                return (
                                    <span
                                        key={i}
                                        className='text-xl inline-block bg-clip-text text-transparent select-none'
                                        style={{
                                            backgroundImage: `linear-gradient(to right, #facc15 ${fillPercentage}%, #4b5563 ${fillPercentage}%)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}
                                    >
                                        ★
                                    </span>
                                );
                            })}
                        </div>
                        <span className='text-base font-bold text-white'>
                            {reviewAverage ? Number(reviewAverage).toFixed(1) : "0.0"}
                        </span>
                    </div>
                </div>

                {/* Listado de reseñas */}
                <div className='flex flex-col gap-4'>
                    {reviews.data.length > 0 ? (
                        <>
                            {reviews.data.map(review => (
                                <div key={review.id} className='bg-gray-800 rounded-lg p-5 shadow-lg border border-gray-700/50 flex flex-col gap-3'>
                                    <div className='flex items-center justify-between gap-2 flex-wrap'>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-amber-400 font-semibold text-sm border border-gray-600'>
                                                {review.reviewer.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className='font-medium text-gray-200 text-sm'>{review.reviewer.name}</span>
                                        </div>
                                        <div className='flex gap-1'>
                                            {[...Array(5)].map((_i: number, i: number) => (
                                                <span
                                                    key={i}
                                                    className={`text-lg ${Number(review.rating) >= i + 1 ? 'text-yellow-400' : 'text-gray-600'}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {review.comment && (
                                        <p className='text-gray-300 text-sm bg-gray-900/50 p-3 rounded-md border border-gray-700/30 whitespace-pre-line'>
                                            {review.comment}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <Pagination links={reviews.links} />
                        </>
                    ) : (
                        <div className='bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700/40 text-gray-400'>
                            Aún no hay reseñas aprobadas para mostrar de este usuario.
                        </div>
                    )}
                </div>
            </section>
        </AppFront>
    )
}
