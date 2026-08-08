<?php

use App\Http\Controllers\DealController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('posts', [PostController::class, 'store'])->name('posts.store');
    Route::patch('posts/{post}', [PostController::class, 'update'])->name('posts.update');

    Route::post('posts/{post}', [DealController::class, 'store'])->name('deals.store');
    Route::delete('posts/{post}/deal-buyer', [DealController::class, 'destroy_as_buyer'])->name('deals.destroy_as_buyer');
    Route::patch('posts/deal-accept/{deal}', [DealController::class, 'accept_deal'])->name('deals.accept');
    Route::patch('posts/deal-seller/{deal}', [DealController::class, 'update_status'])->name('deals.update_status');
    Route::delete('posts/deal-seller/{deal}', [DealController::class, 'destroy_as_seller'])->name('deals.destroy_as_seller');

    // deals referidos a un posteo (para el vendedor)
    Route::get('posts/{post}/deals', [DealController::class, 'index'])->name('deals.index');
    Route::get('posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    // todos los deals de ese usuario (para el comprador y vendedor)
    Route::get('user/{user}/deals', [DealController::class, 'user_deals'])->name('deals.user');

    Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
});

Route::get('posts', [PostController::class, 'index'])->name('posts.index');
Route::get('posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('posts/user/{user}', [PostController::class, 'userPosts'])->name('user.posts');
// rate limiting a la busqueda, para evitar saturacion 
Route::middleware('throttle:100,1')->group(function () {
    Route::get('/buscar', [SearchController::class, 'index'])->name('search.index');
});