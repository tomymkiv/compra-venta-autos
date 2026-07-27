<?php

namespace App\Policies;

use \Illuminate\Auth\Access\Response;
use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function updateUser(User $user, User $model): Response
    {
        return ($user->can('EDIT_OWN_USER') && $user->id === $model->id)
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function deleteUser(User $user, User $model): Response
    {
        return ($user->can('DELETE_OWN_USER') && $user->id === $model->id)
            ? Response::allow()
            : Response::denyAsNotFound();
    }
    /**
     * Permiso para el admin: puede eliminar cualquier usuario
     */
    public function deleteAnyUser(User $user): Response
    {
        return $user->can('DELETE_ANY_USER') ? Response::allow() : Response::denyAsNotFound();
    }
    /**
     * Permiso para el admin: puede editar cualquier usuario
     */
    public function editAnyUser(User $user): Response
    {
        return $user->can('EDIT_ANY_USER') ? Response::allow() : Response::denyAsNotFound();
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
