<?php

use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::get('/', [UserController::class, 'welcome'])->name('welcome');
// autenticacion
Route::get('role-selector', [RegisterController::class, 'roles'])->name('auth.roles');
Route::post('role-selector', [RegisterController::class, 'storeRole'])->name('auth.storeRole');
Route::get('waiting-room', [RegisterController::class, 'waitingRoom'])->name('auth.waitingRoom');

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/post.php';
require __DIR__ . '/user.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/google.php';