interface LoginProps {
    email: string,
    password: string,
    remember: boolean,
}

import FormFieldCheckbox from "@/components/FormFieldCheckbox"
import FormFieldInput from "@/components/FormFieldInput"
import AuthLayout from "@/layouts/auth-layout"
import { Link, useForm } from "@inertiajs/react"
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
    return <AuthLayout title="Inicio de sesión">
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
            <FormFieldInput type="email" titulo="Correo Electronico" errorsText={errors.email} value={data.email} onChangeEventInput={(e) => setData('email', e.target.value)} />
            <FormFieldInput type="password" titulo="Contraseña" errorsText={errors.password} value={data.password} onChangeEventInput={(e) => setData('password', e.target.value)} />
            <FormFieldCheckbox checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} titulo="Recordar sesión" name="remember" id="remember" className="flex flex-row" />
            <div className="flex flex-col lg:flex-row justify-between gap-3 items-center w-full">
                <Link href={route('auth.register')} className="text-blue-500 hover:underline w-full text-center">¿No tienes una cuenta?</Link>
                <Link href={route('auth.forgot-password')} className="text-blue-500 hover:underline w-full text-center">¿Olvidaste tu contraseña?</Link>
                <button disabled={processing} type="submit" className="bg-slate-800 hover:bg-blue-500 rounded-md transition-colors duration-300 text-white p-2 cursor-pointer w-full">Iniciar sesión</button>
            </div>
        </form>
    </AuthLayout>
}
