import InputComp from "@/components/InputComp";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/layouts/auth-layout";
import { Link, useForm } from "@inertiajs/react"
import React, { useRef, useState } from "react";
import { route } from "ziggy-js";
import RegisterFormData from "@/components/RegisterFormData";

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
        contacto: number,
    }>({
        avatar: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        contacto: 0,
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
    const handleContacto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 8) {
            e.target.value = e.target.value.slice(0, 8);
        }
        setData('contacto', Number(e.target.value));
    }
    return <AuthLayout title="Registro">
        {/* <div className="absolute left-0 top-0 z-50 bg-[#111] h-screen w-screen flex flex-col items-center justify-center">
            <h2 className="text-center text-xl">Elegí tu rol</h2>
            <RoleCard userType="COMPRADOR" />
            <RoleCard userType="VENDEDOR" />
        </div> */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <RegisterFormData errorMsg={errors.name} name="Nombre" type="text" setData={(e) => setData('name', e.target.value)} value={data.name} />
            <RegisterFormData errorMsg={errors.email} name="Correo" type="email" setData={(e) => setData('email', e.target.value)} value={data.email} />
            <RegisterFormData errorMsg={errors.contacto} name="Número de contacto (sin codigo de area)" type="number" setData={handleContacto} value={String(data.contacto)} />
            <RegisterFormData errorMsg={errors.password} name="Contraseña" type="password" setData={(e) => setData('password', e.target.value)} value={data.password} />
            <RegisterFormData errorMsg={errors.password_confirmation} name="Confirmar contraseña" type="password" setData={(e) => setData('password_confirmation', e.target.value)} value={data.password_confirmation} />
            <div className="flex flex-col gap-2">
                <p className="text-red-600">{errors.avatar}</p>
                <label htmlFor="avatar">Avatar <small>(opcional)</small></label>

                <Input ref={inputRef} type="file" name="avatar" id="avatar" onChange={handleImageInput} accept="image/*" placeholder="Avatar" className={`${inputBg} w-full`} />
                {data.avatar &&
                    <button onClick={handleRemoveImage} className={`text-red-500 w-full text-center cursor-pointer bg-red-500/30 hover:bg-red-500/60 transition-colors duration-300 p-2 rounded-md ${imgBtn} w-fit`}>
                        Eliminar imagen
                    </button>}
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-3 items-center w-full">
                <Link href={route('auth.login')} className="text-blue-500 hover:underline w-full text-center">¿Ya tienes una cuenta?</Link>
                <button type="submit" disabled={processing} className="bg-slate-800 hover:bg-blue-500 rounded-md transition-colors duration-300 text-white p-2 cursor-pointer w-full">Registrarse</button>
            </div>
        </form>
    </AuthLayout>
}