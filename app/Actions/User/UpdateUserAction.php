<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UpdateUserAction
{
    public function execute(User $user, array $validated, Request $request): void
    {
        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        unset($validated['password_confirmation']);

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');

        } elseif (!$request->hasFile('avatar') && !is_string($validated['avatar'])) {
            $validated['avatar'] = $user->avatar;

        } elseif (is_string($validated['avatar']) && str_contains($validated['avatar'], 'api')) {
            $validated['avatar'] = $request['avatar'];
        }

        $user->update($validated);
    }
}
