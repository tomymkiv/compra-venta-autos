<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;


// main
Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');


// admin/users
Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users.index');
Route::get('/admin/users/{user}/edit', [AdminController::class, 'edit_user'])->name('admin.users.edit');
Route::patch('/admin/users/{user}/edit', [AdminController::class, 'update_user'])->name('admin.users.update');
Route::delete('/admin/users/{user}', [AdminController::class, 'delete_user'])->name('admin.users.destroy');

// admin/posts
Route::get('/admin/posts', [AdminController::class, 'posts'])->name('admin.posts.index');
Route::get('/admin/posts/{post}/edit', [AdminController::class, 'edit_post'])->name('admin.posts.edit');
Route::patch('/admin/posts/{post}/edit', [AdminController::class, 'update_post'])->name('admin.posts.update');
Route::delete('/admin/posts/{post}', [AdminController::class, 'delete_post'])->name('admin.posts.destroy');