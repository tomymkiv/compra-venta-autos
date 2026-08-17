import { Head, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { route } from 'ziggy-js';

export default function WaitingRoom() {
    const [seconds, setSeconds] = useState(5);
    useEffect(() => {
        if (seconds <= 0) {
            router.visit(route('auth.roles'));
            return;
        }
        const interval = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds]);
    return (
        <>
            <Head title='Sala de Espera' />
            <div className='flex text-center flex-col items-center justify-center h-screen'>
                <h1 className='text-center text-4xl font-bold mb-4'>No tenés una cuenta registrada con ese correo.</h1>
                <h2>Redireccionando al registro. Espera {seconds} segundos</h2>
            </div>
        </>
    )
}