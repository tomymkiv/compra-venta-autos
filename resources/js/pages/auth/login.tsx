interface LoginProps {
    email: string,
    password: string,
    remember: boolean,
}

import FormFieldCheckbox from "@/components/FormFieldCheckbox"
import FormFieldInput from "@/components/FormFieldInput"
import ButtonGoogle from "@/components/ui/ButtonGoogle"
import ButtonPrimary from "@/components/ui/ButtonPrimary"
import AuthLayout from "@/layouts/auth-layout"
import { Link, router, useForm } from "@inertiajs/react"
import { route } from "ziggy-js"

export default function Login() {
    const { data, setData, post, processing, errors } = useForm<LoginProps>({
        email: '',
        password: '',
        remember: false,
    })
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('auth.login'))
    }
    const handleGoogleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            router.visit(route('redirect.google'));
        } catch (error) {
            console.error('Error al redirigir a Google:', error);
        }
    }
    return <AuthLayout title="Inicio de sesión">
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
            <FormFieldInput type="email" titulo="Correo Electronico" errorsText={errors.email} value={data.email} onChangeEventInput={(e) => setData('email', e.target.value)} />
            <FormFieldInput type="password" titulo="Contraseña" errorsText={errors.password} value={data.password} onChangeEventInput={(e) => setData('password', e.target.value)} />
            <FormFieldCheckbox checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} titulo="Recordar sesión" name="remember" id="remember" className="flex flex-row" />
            <section className="flex flex-col gap-4">
                <div>
                    <ButtonPrimary text="Iniciar sesión" disabled={processing} type="submit" />
                </div>
                <ButtonGoogle isLogin action={handleGoogleLogin} />
                <div className="flex flex-col lg:flex-row gap-3 justify-between items-center w-full">
                    <Link href={route('auth.register')} className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200 p-4">¿No tenés una cuenta? Registrate</Link>
                    <Link href={route('auth.forgot-password')} className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200 p-4">¿Olvidaste tu contraseña?</Link>
                </div>
            </section>
        </form>
    </AuthLayout>
}
