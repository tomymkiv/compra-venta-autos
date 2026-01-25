<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         // 'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

// autenticacion
Route::get('register', [RegisterController::class, 'index'])->name('auth.register');
Route::post('register', [RegisterController::class, 'register'])->name('auth.register');
Route::get('/', [UserController::class, 'welcome'])->name('welcome');
Route::delete('logout', [LoginController::class, 'logout']);
Route::get('index', [LoginController::class, 'index'])->name('auth.login');
Route::post('login', [LoginController::class, 'login'])->name('auth.login');

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
Route::get('/buscar', [SearchController::class, 'index'])->name('search.index');
require __DIR__ . '/settings.php';
