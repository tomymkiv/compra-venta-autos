<?php

namespace App\Http\Controllers;

use App\Actions\Posts\UpdatePostAction;
use App\Actions\User\UpdateUserAction;
use App\Http\Requests\PostUpdateRequest;
use App\Http\Requests\ReviewsRequest;
use App\Http\Requests\UserEditRequest;
use App\Models\Currency;
use App\Models\Post;
use App\Models\Provincia;
use App\Models\Review;
use App\Models\ReviewStatus;
use App\Models\User;
use App\Models\VehicleBody;
use App\Models\VehicleBrand;
use Auth;
use Cache;
use Gate;

class AdminController extends Controller
{
    protected function clearCache()
    {
        Cache::forget('sidebar_currencies');
        Cache::forget('sidebar_brands');
        Cache::forget('sidebar_provincias');
        Cache::forget('sidebar_municipios');
        Cache::forget('sidebar_vehicle_bodies');
        Cache::forget('sidebar_roles');
    }
    public function index()
    {
        $user = Auth::user();

        if ($user && $user->hasRole('SUPER_USER') && $user->email_verified_at != null) {
            return inertia('admin/index');
        } else if ($user && $user->hasRole('SUPER_USER') && $user->email_verified_at == null) {
            return abort(403);
        }
        return abort(404);
    }

    public function users()
    {
        // si el usuario logueado tiene el rol de admin, puede ingresar
        // cambiar por "SUPER_USER" cuando este rol esté bien configurado
        $user = Auth::user();

        if ($user && $user->hasRole('SUPER_USER') && $user->email_verified_at != null) {
            return inertia('admin/users/index', [
                'users' => User::with('rol')->orderBy('name', 'asc')
                    ->select('id', 'name', 'email', 'email_verified_at', 'avatar')
                    ->where('id', '!=', $user->id)
                    ->paginate($this->paginateLimit),
                // que no muestre el usuario que está logueado
                // faltan los roles de estos usuarios
            ]);
        } else if ($user && $user->hasRole('SUPER_USER') && $user->email_verified_at == null) {
            return abort(403);
        }
        // caso contrario, muestro un error, dando a entender que la página no existe
        return abort(404);
    }

    public function posts()
    {
        // si el usuario logueado tiene el rol de admin, puede ingresar
        // cambiar por "SUPER_USER" cuando este rol esté bien configurado
        $user = Auth::user();

        if ($user && $user->hasRole('SUPER_USER') && $user->email_verified_at != null) {
            return inertia('admin/posts/index', [
                'posts' => Post::with('user', 'mainImage', 'carModel.carBrand')
                    ->orderBy('created_at', 'asc')
                    ->select('id', 'id_user', 'id_model', 'anio')
                    ->paginate($this->paginateLimit),
            ]);
        } else if ($user && $user->hasRole('SUPER_USER') && $user->email_verified_at == null) {
            return abort(403);
        }
        // caso contrario, muestro un error, dando a entender que la página no existe
        return abort(404);
    }
    public function edit_post($id)
    {
        $post = Post::with('user', 'carModel.carBrand', 'postImage', 'mainImage', 'municipio.provincia')
            ->findOrFail($id);
        if (!Gate::allows('update-post', $post)) {
            abort(403);
        }
        return inertia('admin/posts/edit', [
            'postData' => $post,
            'carBrands' => VehicleBrand::orderBy('name', 'asc')->select('id', 'name')->get(),
            'vehicleBodies' => VehicleBody::orderBy('name', 'asc')->select('id', 'name')->get(),
            'currencies' => Currency::select('id', 'nombre')->get(),
            'provincias' => Provincia::orderBy('nombre', 'asc')->select('id', 'nombre')->get(),
        ]);
    }
    public function update_post(PostUpdateRequest $request, Post $post, UpdatePostAction $updatePostAction)
    {
        if (!Gate::allows('update-any-post', $post)) {
            abort(403);
        }

        if (!$request['main_image']) {
            return redirect()->back();
        }

        $updatePostAction->execute($post, $request->validated(), $request);
        $this->clearCache();
        return redirect()->route('admin.posts.index');
    }
    public function edit_user(User $user)
    {
        if (Gate::allows('update-any-user', $user)) {
            return inertia('admin/users/edit', [
                'profile_user' => $user,
            ]);
        }
        return abort(404);
    }
    public function update_user(UserEditRequest $request, UpdateUserAction $action, $id)
    {
        $user = User::findOrFail($id);

        if (!Gate::allows('update-any-user', $user)) {
            abort(403);
        }

        $action->execute($user, $request->validated(), $request);

        return redirect()->route('admin.users.index');
    }
    public function delete_post(Post $post)
    {
        if (!Gate::allows('delete-any-post', $post)) {
            abort(403);
        }
        $post->delete();
    }
    public function delete_user(User $user)
    {
        if (!Gate::allows('delete-any-user', $user)) {
            abort(403);
        }
        $user->delete();
    }
    public function all_user_reviews()
    {
        return inertia('admin/users/reviews/index', [
            'reviews' => Review::with('reviewer', 'reviewed_user')->get(),
        ]);
    }
    public function show_user_reviews(User $user)
    {
        if (!Gate::allows('view-any-review', $user)) {
            abort(403);
        }
        $reviews = Review::where('reviewer_id', $user->id)->with('reviewed_user')->get();
        return inertia('admin/users/reviews/show', [
            'user' => $user,
            'reviews' => $reviews,
        ]);
    }
    public function edit_user_review(Review $review)
    {
        if (!Gate::allows('update-any-review', $review)) {
            abort(403);
        }
        $status = $review->status;
        $allReviewStatus = ReviewStatus::select('id', 'name')->get();

        return inertia('admin/users/reviews/edit', [
            'review' => $review,
            'status' => $status,
            'allReviewStatus' => $allReviewStatus,
        ]);
    }
    public function update_user_review(ReviewsRequest $request, Review $review)
    {
        if (!Gate::allows('update-any-review', $review)) {
            abort(403);
        }

        $validated = $request->validated();
        $review->update($validated);
        return redirect()->route('admin.users.reviews.index');
    }
    public function delete_user_review(Review $review)
    {
        if (!Gate::allows('delete-any-review', $review)) {
            abort(403);
        }
        $review->delete();
        return redirect()->route('admin.users.reviews.index');
    }
}