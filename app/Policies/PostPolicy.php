<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{
    /**
     * Solo VENDEDOR puede crear posts.
     */
    public function createPost(User $user): Response
    {
        return $user->can('CREATE_POST')
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Solo VENDEDOR puede editar, y solo su propio post.
     */
    public function updateOwnPost(User $user, Post $post): Response
    {
        return ($user->id === $post->id_user) || $user->can('EDIT_OWN_POST')
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Solo VENDEDOR puede eliminar, y solo su propio post.
     */
    public function deleteOwnPost(User $user, Post $post): Response
    {
        return ($user->id === $post->id_user) || $user->can('DELETE_OWN_POST')
            ? Response::allow()
            : Response::denyAsNotFound();
    }
    /**
     * Admin puede editar cualquier post.
     */
    public function updateAnyPost(User $user): Response
    {
        return $user->can('EDIT_ANY_POST')
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Admin puede eliminar cualquier post.
     */
    public function deleteAnyPost(User $user): Response
    {
        return $user->can('DELETE_ANY_POST')
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
