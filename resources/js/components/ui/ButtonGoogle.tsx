import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function ButtonGoogle() {
    const handleGoogleRedirect = () => {
        router.visit(route('redirect.google'));
    }
    return (
        <button type="button" onClick={handleGoogleRedirect} className="flex gap-2 items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-300 text-white w-full text-center cursor-pointer">
            Iniciar sesión con Google
            <img className="w-6 h-6" src="/img/logos/google-logo.webp" alt="Logo de google" />
        </button>
    )
}