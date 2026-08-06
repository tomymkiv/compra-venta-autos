import AppFront from '@/AppFront'
import ReviewForm from '@/components/ReviewForm'
import { Review, ReviewStatus } from '@/types/types'
import { Head } from '@inertiajs/react'
import { route } from 'ziggy-js'

export default function edit({ review, allReviewStatus }: { review: Review, allReviewStatus: ReviewStatus[] }) {
    return (
        <AppFront>
            <Head title='Editar reseña - Admin' />
            <ReviewForm
                title="Editar reseña - Admin"
                review={review}
                allReviewStatus={allReviewStatus}
                updateRoute={route('admin.users.reviews.update', review.id)}
                deleteRoute={route('admin.users.reviews.destroy', review.id)}
                isAdmin={true}
            />
        </AppFront>
    )
}
