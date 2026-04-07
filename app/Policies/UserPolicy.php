<?php

namespace App\Policies;

use \Illuminate\Auth\Access\Response;
use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewUsers(User $user): bool
    {
        return $user->can('VIEW_USER');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function viewPosts(User $user, User $model): bool
    {
        return $user->can('VIEW_POST');
    }

    /**
     * Determine whether the user can create models.
     */
    public function createUser(User $user): Response
    {
        return $user->can('CREATE_USER') ? Response::allow() : Response::denyAsNotFound();
    }

    public function createPost(User $user): Response
    {
        return $user->can('CREATE_POST') ? Response::allow() : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function updateUser(User $user, User $model): Response
    {
        return $user->can('EDIT_USER') ? Response::allow() : Response::denyAsNotFound();
    }

    public function updatePost(User $user, User $model): Response
    {
        return $user->can('EDIT_POST') ? Response::allow() : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function deleteUser(User $user, User $model): Response
    {
        return $user->can('DELETE_USER') ? Response::allow() : Response::denyAsNotFound();
    }

    public function deletePost(User $user, User $model): Response
    {
        return $user->can('DELETE_POST') ? Response::allow() : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return false;
    }
}
