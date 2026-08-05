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

Route::get('/admin/users/reviews', [AdminController::class, 'all_user_reviews'])->name('admin.users.reviews.index');
Route::get('/admin/users/reviews/{review}/edit', [AdminController::class, 'edit_user_review'])->name('admin.users.reviews.edit');
Route::patch('/admin/users/reviews/{review}/edit', [AdminController::class, 'update_user_review'])->name('admin.users.reviews.update');
Route::delete('/admin/users/reviews/{review}', [AdminController::class, 'delete_user_review'])->name('admin.users.reviews.destroy');
Route::get('/admin/users/reviews/{user}', [AdminController::class, 'show_user_reviews'])->name('admin.users.reviews.show');

// admin/posts
Route::get('/admin/posts', [AdminController::class, 'posts'])->name('admin.posts.index');
Route::get('/admin/posts/{post}/edit', [AdminController::class, 'edit_post'])->name('admin.posts.edit');
Route::patch('/admin/posts/{post}/edit', [AdminController::class, 'update_post'])->name('admin.posts.update');
Route::delete('/admin/posts/{post}', [AdminController::class, 'delete_post'])->name('admin.posts.destroy');