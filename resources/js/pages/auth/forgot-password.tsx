// Components
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import InputComp from '@/components/ui/InputComp';
import { route } from 'ziggy-js';
import { useForm } from "@inertiajs/react";
import { useState } from 'react';
import ButtonPrimary from '@/components/ui/ButtonPrimary';

export default function ForgotPassword() {
    const [mailSended, setMailSended] = useState(false);
    const { data, setData, post, errors, processing } = useForm({
        email: '',
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('auth.forgot-password.send'), {
            onSuccess: () => {
                setMailSended(true);
            }
        });
    }
    return (
        <AuthLayout>
            <Head title="Recuperar contraseña" />
            <div className="space-y-6">
                <form onSubmit={handleSubmit}>
                    <h3 className='text-md text-green-500 font-medium my-3'>{mailSended && 'Se ha enviado un correo electrónico. Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.'}</h3>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className='text-md'>Correo electrónico</Label>
                        <InputComp
                            id="email"
                            type="email"
                            name="email"
                            placeholder="tucorreo@example.com"
                            onChange={(e) => setData('email', e.target.value)}
                            value={data.email}
                        />
                        {errors.email && (
                            <p className="text-red-500">{errors.email}</p>
                        )}
                    </div>
                    <div className="my-6 flex items-center justify-start">
                        <ButtonPrimary type="submit" text="Enviar link" disabled={processing} />
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
