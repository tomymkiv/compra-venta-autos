import AppFront from '@/AppFront';
import ReviewForm from '@/components/ReviewForm';
import { Review } from '@/types/types';
import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function edit({ review }: { review: Review }) {
    return (
        <AppFront>
            <Head title='Editar reseña' />
            <ReviewForm
                review={review}
                updateRoute={route('review.update', review.id)}
                deleteRoute={route('review.destroy', review.id)}
            />
        </AppFront>
    )
}
