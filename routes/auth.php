<?php
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\VerifyEmailController;
use App\Http\Middleware\ForceRoleSelected;
use Illuminate\Support\Facades\Route;


Route::get('register', [RegisterController::class, 'index'])
    ->middleware(ForceRoleSelected::class) // si o si debo elegir un rol antes de ingresar al registro
    ->name('auth.register');
Route::post('register', [RegisterController::class, 'register'])
    ->middleware(ForceRoleSelected::class)
    ->name('auth.register');

Route::delete('logout', [LoginController::class, 'logout']);
Route::get('index', [LoginController::class, 'index'])->name('auth.login');
Route::post('login', [LoginController::class, 'login'])->name('auth.login');



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