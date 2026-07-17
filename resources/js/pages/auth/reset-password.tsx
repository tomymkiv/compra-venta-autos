import { Head, router, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import InputComp from '@/components/ui/InputComp';
import { route } from 'ziggy-js';
import ButtonPrimary from '@/components/ui/ButtonPrimary';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, put, errors, processing } = useForm({
        email: email,
        token: token,
        password: '',
        password_confirmation: '',
    });
    const handleSubmit = () => {
        put(route('auth.reset-password.update'), {
            onSuccess: () => {
                // redireccionar a login
                router.get(route('auth.login'));
            }
        });
    }
    return (
        <AuthLayout
            title="Restablecer contraseña"
        >
            <Head title="Restablecer contraseña" />
            <form>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <InputComp
                            readOnly={true}
                            id="email"
                            type="email"

                            name="email"
                            value={email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <span className="text-red-500">{errors.email}</span>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <InputComp
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <span className="text-red-500">{errors.password}</span>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Confirmar contraseña
                        </Label>
                        <InputComp
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            className="mt-1 block w-full"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        {errors.password_confirmation && <span className="text-red-500">{errors.password_confirmation}</span>}
                    </div>
                    <ButtonPrimary disabled={processing}
                        type="submit"
                        className="mt-4 w-full"
                        onClick={handleSubmit}
                        text='Restablecer contraseña' />
                </div>
            </form>
        </AuthLayout>
    );
}
