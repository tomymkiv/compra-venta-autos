import AppFront from '@/AppFront'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import { User } from '@/types'
import { Review } from '@/types/types'
import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js'

export default function show({ user, reviews }: { user: User, reviews: Review[] }) {
    return (
        <AppFront>
            <section>
                <div className='flex flex-col mb-4'>
                    <Link href={route('admin.users.index')}><ButtonPrimary text='Volver atrás' className='!bg-cyan-700 hover:!bg-cyan-500 border-cyan-500 !w-fit' /></Link>
                </div>
                <div className="flex flex-col w-full items-center justify-center">
                    <h1 className="text-2xl font-semibold text-gray-100 mb-6">Reseñas de {user.name}</h1>
                    {reviews.length > 0 ? (
                        <div className="flex flex-col w-full">
                            {reviews.map((review) => (
                                <div key={review.id} className="flex flex-col w-full">
                                    <h2>Hacia: {review.reviewed_user.name}</h2>
                                    <h4>{review.comment ? 'Comentario: ' : 'Sin comentario'}</h4>
                                    <p className="text-gray-400">{review.comment}</p>
                                    <div className='flex gap-3'>
                                        {[
                                            [...Array(5)].map((_i: number, i: number) => (
                                                <button key={i} type="button" className={`text-2xl ${Number(review.rating) >= i + 1 ? 'text-yellow-400' : 'text-gray-400'}`}>
                                                    ★
                                                </button>
                                            ))
                                        ]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No hay reseñas escritas por {user.name}.</p>
                    )}
                </div>
            </section>

        </AppFront>
    )
}