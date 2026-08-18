<?php

namespace App\Http\Controllers;

use App\Actions\User\UpdateUserAction;
use App\Http\Requests\UserEditRequest;
use App\Models\Deal;
use App\Models\Post;
use App\Models\Review;
use App\Models\User;
use Auth;
use Cache;
use Gate;

class UserController extends Controller
{
    public function welcome()
    {
        return inertia('welcome', [
            'posts' => Post::with('mainImage', 'carModel.carBrand', 'user', 'municipio.provincia', 'vehicleBody')
                ->latest()
                ->select('id', 'id_model', 'version', 'anio', 'id_municipio', 'id_currency', 'precio')
                ->paginate($this->paginateLimit),
        ]);
    }
    public function show($id)
    {
        // dd($id);
        $hasReviewed = null;
        $userReview = null;
        $userReviewAverage = null;
        $userReviewCount = null;
        $reviews = null;
        $userReviewCount = null;
        $userReview = null;
        $relationalDeals = Deal::where('seller_id', $id)
            ->where('buyer_id', auth()->id())->select('deal_status_id')
            ->where('deal_status_id', 1)
            ->exists(); // selecciono solo los deals que hayan finalizado entre ambos usuarios
        // dd($relationalDeals);
        // declaro $post como si ese usuario tuviera un posteo relacionado
        $post = Post::where('id_user', $id)
            ->with('user')
            ->select('id')
            ->get();

        // en caso de no tener ningun post, envío solo el usuario.
        $user = User::where('id', $id)->select('id', 'name', 'email_verified_at', 'avatar', 'created_at')->firstOrFail();
        if ($user->hasRole('VENDEDOR') || $user->hasRole('SUPER_USER')) {
            $hasReviewed = Review::where('reviewer_id', auth()->id())
                ->where('reviewed_user_id', $user->id)
                ->exists();
            $reviews = Review::with('reviewer')->where('reviewed_user_id', $user->id)->get();
            $reviews = $reviews->filter(fn($review) => $review->status_id == 2); // filtro solo las que están aprobadas
            $userReviewAverage = $reviews->avg('rating');
            $userReviewCount = $reviews->count();

            if (Auth::user()) {
                $userReview = Review::where('reviewer_id', Auth::user()->id)
                    ->where('reviewed_user_id', $user->id)->first();
            }
        }
        // if()
        // dd($userReview);
        return inertia('user/show', [
            'posts' => $post,
            'profileUser' => $user, // renombrado para no pisar el shared prop 'user' (usuario logueado)
            'hasReviewed' => $hasReviewed,
            'relationalDeals' => $relationalDeals,
            'userReviews' => $userReview,
            'reviewAverage' => $userReviewAverage,
            'reviews' => $reviews,
            'userReviewCount' => $userReviewCount,
        ]);
    }
    public function edit()
    {
        return inertia('user/edit');
    }
    public function update(UserEditRequest $request, UpdateUserAction $action)
    {
        $user = $this->loguedUser;
        if (!Gate::allows('update-own-user', $user)) {
            abort(403);
        }

        $action->execute($user, $request->validated(), $request);

        return redirect()->route('user.show', $user->id);
    }
    public function destroy(User $user)
    {
        if (!Gate::allows('delete-own-user', $user)) {
            abort(403);
        }

        $user->delete();
        return redirect()->route('welcome');
    }
}