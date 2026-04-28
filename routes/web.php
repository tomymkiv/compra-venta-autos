<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\N8nController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use KayedSpace\N8n\Facades\N8nClient;

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
    Route::get('user/edit', [UserController::class, 'edit'])->name('user.edit');
    Route::put('user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('user/{user}', [UserController::class, 'destroy'])->name('user.destroy');
    Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('posts', [PostController::class, 'store'])->name('posts.store');
    Route::put('posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::get('posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
});

// posteos
Route::get('posts', [PostController::class, 'index'])->name('posts.index');
Route::get('posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('posts/user/{user}', [PostController::class, 'userPosts'])->name('user.posts');
Route::get('/buscar', [SearchController::class, 'index'])->name('search.index');

// usuarios
Route::get('user/{user}', [UserController::class, 'show'])->name('user.show');

// apis
Route::get('/api/municipios/{provincia}', [LocationController::class, 'municipios']);

// roles/admin
Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
Route::get('/admin/roles/index', [RolesController::class, 'index'])->name('admin.roles.index');

// Route::post('/admin/roles/store', [RolesController::class, 'store'])->name('admin.roles.store');
// Route::put('/admin/roles/update', [RolesController::class, 'update'])->name('admin.roles.update');
require __DIR__ . '/settings.php';