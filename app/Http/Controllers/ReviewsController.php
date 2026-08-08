<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewsRequest;
use App\Models\Review;
use App\Models\User;

class ReviewsController extends Controller
{
    public function edit(Review $review)
    {
        return inertia('reviews/edit', [
            'review' => $review,
        ]);
    }
    public function store(ReviewsRequest $request)
    {
        $validated = $request->validated();
        Review::create($validated);

        return redirect()->route('user.show', $validated['reviewed_user_id'])->with('success', 'Reseña guardada');
    }
    public function show(User $user)
    {
        $approvedQuery = Review::with('reviewer')
            ->where('reviewed_user_id', $user->id)
            ->where('status_id', 2);

        $reviewAverage = $approvedQuery->avg('rating') ?? 0;
        $userReviewCount = $approvedQuery->count();
        $reviews = $approvedQuery->paginate(10);

        return inertia('reviews/show', [
            'reviews' => $reviews,
            'userReviewCount' => $userReviewCount,
            'reviewAverage' => $reviewAverage,
            'user_reviewer' => $user
        ]);
    }
    public function update(ReviewsRequest $request, Review $review)
    {
        $validated = $request->validated();
        $review->update($validated);

        return redirect()->route('user.show', $review->reviewed_user_id)->with('success', 'Reseña actualizada');
    }
    public function destroy(Review $review)
    {
        $review->delete();

        return redirect()->route('user.show', $review->reviewed_user_id)->with('success', 'Reseña eliminada');
    }
}