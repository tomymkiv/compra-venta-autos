import { User } from '@/types'
import { Head, Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js';

export default function EmailVerification({ user }: { user: User }) {
    return (
        <>
            <Head title="Verificar email" />
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#222]">
                <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl dark:bg-[#0005]">
                    <div className="mb-6 flex justify-center">
                        <div className="bg-blue-100 flex h-16 w-16 items-center justify-center rounded-full text-blue-600 dark:bg-green-900/45 dark:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25px" height="25px" className='fill-[#4b4]'><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" /></svg>
                            {/* <IconMail className="h-8 w-8" strokeWidth={1.5} /> */}
                        </div>
                    </div>

                    <h2 className="mb-3 text-center text-2xl font-bold text-gray-900 dark:text-white">
                        Verificar dirección de correo
                    </h2>

                    <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
                        Antes de continuar, por favor verificá tu casilla de correo electrónico para activar la cuenta.
                    </p>

                    <div className="space-y-4">
                        {/* Mensaje de estado si lo necesitas */}
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                            <p className="text-sm text-green-700 dark:text-green-300">
                                ¡Email enviado! Revisá tu bandeja de entrada.
                            </p>
                        </div>

                        <button onClick={() => {
                            router.post(route('verification.send'));
                        }} className="w-full bg-blue-600 hover:bg-blue-700 flex justify-center items-center gap-2 text-white font-medium px-4 py-3 rounded-lg transition cursor-pointer">
                            Reenviar email de verificación
                        </button>

                        <Link
                            href="/"
                            className="w-full text-gray-600 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-700 flex justify-center items-center gap-2 px-4 py-3 rounded-lg transition text-sm font-medium"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}