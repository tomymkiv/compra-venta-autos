import InputComp from "@/components/InputComp";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/layouts/auth-layout";
import { Link, useForm } from "@inertiajs/react"
import React, { useRef, useState } from "react";
import { route } from "ziggy-js";

export default function Register() {
    const [inputBg, setInputBg] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [imgBtn, setImgBtn] = useState('hidden');
    const { data, setData, post, processing, errors } = useForm<{
        avatar: File | null,
        name: string,
        email: string,
        password: string,
        password_confirmation: string,
    }>({
        avatar: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('auth.register'));
    }
    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('avatar', e.target.files?.[0] ?? null)
        e.target.files?.[0] && setInputBg('bg-green-500/30');
        e.target.files?.[0] && setImgBtn('');
    }
    const handleRemoveImage = () => {
        setData('avatar', null);
        setInputBg('');
        setImgBtn('hidden');
        inputRef.current && (inputRef.current.value = '');
    }
    return <AuthLayout title="Registro">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <p className="text-red-600">{errors.name}</p>
                <label htmlFor="name">Nombre de usuario</label>
                <InputComp type="text" name="name" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Nombre de usuario" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-red-600">{errors.email}</p>
                <label htmlFor="email">Correo</label>
                <InputComp type="email" name="email" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Correo" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-red-600">{errors.password}</p>
                <label htmlFor="password">Contraseña</label>
                <InputComp type="password" name="password" id="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Contraseña" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-red-600">{errors.password_confirmation}</p>
                <label htmlFor="password_confirmation">Confirmar contraseña</label>
                <InputComp type="password" name="password_confirmation" id="password_confirmation" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} placeholder="Confirmar contraseña" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-red-600">{errors.avatar}</p>
                <label htmlFor="avatar">Avatar</label>
                <div className="flex flex-col md:flex-row gap-2">
                    <Input ref={inputRef} type="file" name="avatar" id="avatar" onChange={handleImageInput} accept="image/*" placeholder="Avatar" className={`${inputBg} w-full`} />
                    {data.avatar &&
                        <button onClick={handleRemoveImage} className={`text-red-500 w-full text-center cursor-pointer bg-red-500/30 hover:bg-red-500/60 transition-colors duration-300 p-2 rounded-md ${imgBtn} w-fit`}>
                            Eliminar imagen
                        </button>}
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-3 items-center w-full">
                <Link href={route('auth.login')} className="text-blue-500 hover:underline w-full text-center">¿Ya tienes una cuenta?</Link>
                <button type="submit" disabled={processing} className="bg-slate-800 hover:bg-blue-500 rounded-md transition-colors duration-300 text-white p-2 cursor-pointer w-full">Registrarse</button>
            </div>
        </form>
    </AuthLayout>
}