interface LoginProps {
    email: string,
    password: string,
}

import InputComp from "@/components/InputComp"
import AuthLayout from "@/layouts/auth-layout"
import { Link, useForm } from "@inertiajs/react"
import { route } from "ziggy-js"

export default function Login() {
    const { data, setData, post, processing, errors } = useForm<LoginProps>({
        email: '',
        password: '',
    })
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('auth.login'))
    }
    return <AuthLayout title="Inicio de sesión">
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
                <p className="text-red-500">{errors.email}</p>
                <InputComp type="email" name="email" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Correo" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-red-500">{errors.password}</p>
                <InputComp type="password" id="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Contraseña" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-3 items-center w-full">
                <Link href={route('auth.register')} className="text-blue-500 hover:underline w-full text-center">¿No tienes una cuenta?</Link>
                <button disabled={processing} type="submit" className="bg-slate-800 hover:bg-blue-500 rounded-md transition-colors duration-300 text-white p-2 cursor-pointer w-full">Iniciar sesión</button>
            </div>
        </form>
    </AuthLayout>
}
