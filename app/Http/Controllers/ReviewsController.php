<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewsRequest;
use App\Models\Review;
use App\Models\User;
use Cache;

class ReviewsController extends Controller
{
    public function clearCache(User $user)
    {
        Cache::forget('reviews' . $user->id);
        Cache::forget('reviewAverage' . $user->id);
        Cache::forget('userReviewCount' . $user->id);
    }
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
        $reviews = Review::with('reviewer')->where('reviewed_user_id', $user->id)->get();
        $reviews = $reviews->filter(function ($review) {
            return $review->status_id == 2; // filtro solo las que están aprobadas
        });
        $reviewAverage = $reviews->avg('rating');
        $userReviewCount = $reviews->count();

        return inertia('reviews/show', [
            'reviews' => $reviews,
            'userReviewCount' => $userReviewCount,
            'reviewAverage' => $reviewAverage,
            'user' => $user
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