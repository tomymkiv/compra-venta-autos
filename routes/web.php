<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        // 'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/', [UserController::class, 'welcome'])->name('home');
Route::delete('logout',[LoginController::class, 'logout']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
});
Route::get('posts', [PostController::class, 'index'])->name('posts.index');
Route::get('posts/user/{user}', [PostController::class, 'userPosts'])->name('user.posts');
Route::get('posts/{post}', [PostController::class, 'show'])->name('posts.show');
require __DIR__.'/settings.php';
