<?php

use App\Http\Controllers\DealController;
use App\Http\Controllers\ReviewsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('user/edit', [UserController::class, 'edit'])->name('user.edit');
    Route::patch('user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('user/{user}', [UserController::class, 'destroy'])->name('user.destroy');
    Route::post('user/{id}', [ReviewsController::class, 'store'])->name('review.store');
    Route::get('user/{user}/reviews', [ReviewsController::class, 'show'])->name('review.show');
    Route::get('user/reviews/{review}/edit', [ReviewsController::class, 'edit'])->name('review.edit');
    Route::patch('user/reviews/{review}', [ReviewsController::class, 'update'])->name('review.update');
    Route::delete('user/reviews/{review}', [ReviewsController::class, 'destroy'])->name('review.destroy');
});

Route::get('user/{user}', [UserController::class, 'show'])->name('user.show');