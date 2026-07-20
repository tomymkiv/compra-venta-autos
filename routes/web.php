<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerifyEmailController;
use App\Http\Middleware\ForceRoleSelected;
use Illuminate\Support\Facades\Route;

// autenticacion
Route::get('role-selector', [RegisterController::class, 'roles'])->name('auth.roles');
Route::post('role-selector', [RegisterController::class, 'storeRole'])->name('auth.storeRole');
// no me puedo registrar si previamente no seleccioné un rol en "auth.roles".

// para el registro, obligatoriamente tuve que haber elegido un rol anteriormente
Route::get('register', [RegisterController::class, 'index'])
    ->middleware(ForceRoleSelected::class)
    ->name('auth.register');
Route::post('register', [RegisterController::class, 'register'])
    ->middleware(ForceRoleSelected::class)
    ->name('auth.register');
Route::get('/', [UserController::class, 'welcome'])->name('welcome');
Route::delete('logout', [LoginController::class, 'logout']);
Route::get('index', [LoginController::class, 'index'])->name('auth.login');
Route::post('login', [LoginController::class, 'login'])->name('auth.login');

// Route::middleware(['auth', 'verified'])->group(function () {});
Route::get('user/edit', [UserController::class, 'edit'])->name('user.edit');
Route::patch('user/{user}', [UserController::class, 'update'])->name('user.update');
Route::delete('user/{user}', [UserController::class, 'destroy'])->name('user.destroy');
Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');
Route::post('posts', [PostController::class, 'store'])->name('posts.store');
Route::patch('posts/{post}', [PostController::class, 'update'])->name('posts.update');
Route::get('posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

// verificacion de correo
Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)->name('verification.verify');
Route::get('/email/verification', [VerifyEmailController::class, 'index'])->middleware(['auth'])->name('auth.verification');
Route::post('/email/verification-notification', [VerifyEmailController::class, 'resend'])
    ->middleware(['auth', 'throttle:5,1'])->name('verification.send'); // encargado de reenviar el codigo de verificacion (3 intentos en 1 minuto)
Route::get('/email/verification/verified', [VerifyEmailController::class, 'verified'])->middleware(['auth'])->name('auth.verification.verified');

// recuperar contraseña
Route::middleware('guest')->group(function () {
    Route::get('/forgot-password', [ForgotPasswordController::class, 'index'])->name('auth.forgot-password');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'send'])->name('auth.forgot-password.send')->middleware('throttle:5,3');
    Route::get('/reset-password', [ForgotPasswordController::class, 'reset'])->name('auth.reset-password');
    Route::put('/reset-password', [ForgotPasswordController::class, 'update'])->name('auth.reset-password.update')->middleware('throttle:5,3');
});


// posteos
Route::get('posts', [PostController::class, 'index'])->name('posts.index');
Route::get('posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('posts/user/{user}', [PostController::class, 'userPosts'])->name('user.posts');
Route::get('/buscar', [SearchController::class, 'index'])->name('search.index');

// usuarios
Route::get('user/{user}', [UserController::class, 'show'])->name('user.show');

// roles/admin
Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
Route::get('/admin/roles', [AdminController::class, 'roles'])->name('admin.roles');

// Route::post('/admin/roles/store', [RolesController::class, 'store'])->name('admin.roles.store');
// Route::put('/admin/roles/update', [RolesController::class, 'update'])->name('admin.roles.update');
require __DIR__ . '/settings.php';