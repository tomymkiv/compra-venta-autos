<?php


use App\Http\Controllers\OAuthController;
use Illuminate\Support\Facades\Route;

Route::get('auth/google', [OAuthController::class, 'redirectToGoogle'])->name('redirect.google');
Route::get('auth/google/callback', [OAuthController::class, 'handleGoogleCallback']);