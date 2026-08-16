<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Str;

class OAuthController extends Controller
{
    //✅
    public function redirectToGoogle()
    {
        $url = Socialite::driver("google")->redirect()->getTargetUrl();
        return Inertia::location($url);
    }

    //❌
    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->user();
        $findUser = User::where('google_id', $user->id)->first();
        if ($findUser) {
            Auth::login($findUser);
        } else {
            $newUser = User::create([
                'name' => $user->name,
                'email' => $user->email,
                'google_id' => $user->id,
                'password' => bcrypt(Str::random(32)),
            ]);
            Auth::login($newUser);
        }
        return Inertia::location(route('welcome'));
    }
}