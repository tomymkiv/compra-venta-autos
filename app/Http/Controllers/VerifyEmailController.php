<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    public function __invoke(EmailVerificationRequest $request)
    {
        // cuando el usuario verifica su correo, se redirige a la pagina de verificacion exitosa.
        $request->fulfill();

        return redirect()->intended(env('APP_URL') . '/email/verification/verified');
    }

    public function index()
    {
        // pagina que se encarga de redirigir al usuario a la verificación en caso de no tenerla
        return inertia('auth/email-verification');
    }

    public function resend(Request $request)
    {
        // encargado de reenviar un correo de verificacion.
        // funciona tanto para el registro como para usuarios ya logueados que no hayan verificado su correo.
        if ($request->user()->hasVerifiedEmail()) {
            return inertia('auth/email-verified');
        }

        $request->user()->sendEmailVerificationNotification();

        return inertia('auth/email-verification');
    }

    public function verified()
    {
        // pagina que indica al usuario que ya fue verificado
        return inertia('auth/email-verified');
    }
}