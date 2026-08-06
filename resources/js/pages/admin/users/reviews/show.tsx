import AppFront from '@/AppFront'
import Pagination from '@/components/pagination'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import { PaginatedReviewsProps } from '@/types/types'
import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js'

export default function show({ reviews, user_reviewer }: PaginatedReviewsProps) {
    return (
        <AppFront>
            <section className="max-w-4xl mx-auto w-full flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-4">
                    <Link href={route('admin.users.index')}>
                        <ButtonPrimary text="Volver atrás" className="!w-fit !bg-cyan-700 hover:!bg-cyan-500 !border-cyan-500 text-white font-medium px-4 py-2 rounded-md transition-colors shadow-md" />
                    </Link>

                    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700/50 flex flex-col gap-2">
                        <h1 className="text-xl font-bold text-white">Reseñas realizadas por {user_reviewer?.name}</h1>
                        <p className="text-sm text-gray-400">
                            Listado de reseñas escritas por este usuario hacia otros usuarios de la plataforma.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {reviews.data.length > 0 ? (
                        <>
                            {reviews.data.map((review) => (
                                <div key={review.id} className="bg-gray-800 rounded-lg p-5 shadow-lg border border-gray-700/50 flex flex-col gap-3">
                                    <div className="flex items-center justify-between gap-2 flex-wrap border-b border-gray-700/50 pb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">Hacia:</span>
                                            <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-amber-400 font-semibold text-xs border border-gray-600">
                                                {review.reviewed_user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-gray-200 text-sm">{review.reviewed_user.name}</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_i: number, i: number) => (
                                                    <span
                                                        key={i}
                                                        className={`text-lg ${Number(review.rating) >= i + 1 ? 'text-yellow-400' : 'text-gray-600'}`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>

                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                                                review.status_id === 1 ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                                review.status_id === 2 ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                                'bg-red-500/10 text-red-400 border-red-500/30'
                                            }`}>
                                                {review.status_id === 1 ? 'En revisión' : review.status_id === 2 ? 'Visible' : 'Rechazada'}
                                            </span>
                                        </div>
                                    </div>

                                    {review.comment ? (
                                        <p className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded-md border border-gray-700/30 whitespace-pre-line">
                                            {review.comment}
                                        </p>
                                    ) : (
                                        <p className="text-gray-500 text-xs italic">Sin comentario adicional.</p>
                                    )}
                                </div>
                            ))}
                            <Pagination links={reviews.links} />
                        </>
                    ) : (
                        <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700/40 text-gray-400">
                            No hay reseñas escritas por {user_reviewer?.name}.
                        </div>
                    )}
                </div>
            </section>
        </AppFront>
    )
}