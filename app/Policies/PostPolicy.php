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
    public function updatePost(User $user, Post $post): Response
    {
        return ($user->can('EDIT_POST') && $user->id === $post->id_user)
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Solo VENDEDOR puede eliminar, y solo su propio post.
     */
    public function deletePost(User $user, Post $post): Response
    {
        return ($user->can('DELETE_POST') && $user->id === $post->id_user)
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
