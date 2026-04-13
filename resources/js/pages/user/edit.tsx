import ProfileSection from '@/components/ProfileSection'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ProfileProps } from '@/types/types'
import { Button } from '@/components/ui/button'
import { useForm } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { useRef, useState } from 'react'
export default function edit({ loguedUser }: ProfileProps) {
    const [inputBg, setInputBg] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { data, setData, put, processing, errors, delete: destroy } = useForm<{
        avatar: File | string | null,
        name: string,
        email: string,
        password: string,
        password_confirmation: string,
    }>({
        avatar: null,
        name: loguedUser.name,
        email: loguedUser.email,
        password: '',
        password_confirmation: '',
    })
    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('avatar', e.target.files?.[0] ?? null)
        e.target.files?.[0] && setInputBg('bg-green-500/30');
    }
    const handleDeleteNewImg = () => {
        setData('avatar', null)
        setInputBg('')
        fileInputRef.current && (fileInputRef.current.value = '');
    }
    const handleDeleteActualImg = () => {
        // le pongo una imagen con las iniciales de su username
        setData('avatar', `https://api.dicebear.com/7.x/initials/svg?seed=${loguedUser.name}`);
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('user.update', loguedUser.id), {
            forceFormData: true,
        })
    }
    const handleDeleteAccount = (e: React.FormEvent) => {
        e.preventDefault();
        confirm('¿Estás seguro que quieres eliminar tu cuenta? Se eliminarán toda la información relacionada.') && destroy(route('user.destroy', loguedUser.id));
    }
    return <ProfileSection loguedUser={loguedUser} user={loguedUser}>
        <section>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center justify-center'>
                <div className='flex flex-col gap-2 w-full p-3'>
                    {
                        errors.avatar && (
                            <p className='text-red-500'>{errors.avatar}</p>
                        )
                    }
                    <Label htmlFor="avatar">Elegí tu nueva imagen de perfil <b>(max 2MB)</b>:</Label>
                    {/* Mostrar imagen actual */}
                    <p>Imagen actual</p>
                    <img
                        src={loguedUser.avatar?.includes('api') ? loguedUser.avatar : `/storage/${loguedUser.avatar}`}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    {
                        !loguedUser.avatar?.includes('api') && (
                            <button className='bg-red-500/30 hover:bg-red-500/50 transition-colors duration-300 ease cursor-pointer p-2 rounded-md' type='button' onClick={handleDeleteActualImg}>Eliminar imagen actual</button>
                        )
                    }
                    {/* Input solo para cambiarla */}
                    <Input
                        type="file" className={`${inputBg}`}
                        onChange={handleImageInput} ref={fileInputRef} accept='image/*'
                    />
                    {
                        data.avatar &&
                        <>
                            <p>Esta será tu nueva imagen</p>
                            <img src={data.avatar instanceof File ? URL.createObjectURL(data.avatar) : (data.avatar ?? '')} alt="Imagen nueva" className='w-24 h-24 rounded-full object-cover' />
                            <button className='bg-red-500/30 hover:bg-red-500/50 transition-colors duration-300 ease cursor-pointer p-2 rounded-md' type='button' onClick={handleDeleteNewImg}>Descartar imagen</button>
                        </>
                    }
                </div>
                <div className='flex flex-col gap-2 w-full p-3'>
                    {
                        errors.name && (
                            <p className='text-red-500'>{errors.name}</p>
                        )
                    }
                    <Label htmlFor="name">Usuario:</Label>
                    <Input type="text" name="name" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                </div>
                <div className='flex flex-col gap-2 w-full p-3'>
                    {
                        errors.email && (
                            <p className='text-red-500'>{errors.email}</p>
                        )
                    }
                    <Label htmlFor="email">Email:</Label>
                    <Input type="email" name="email" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                </div>
                <div className='flex flex-col gap-2 w-full p-3'>
                    {
                        errors.password && (
                            <p className='text-red-500'>{errors.password}</p>
                        )
                    }
                    <Label htmlFor="password">Contraseña:</Label>
                    <Input type="password" name="password" id="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                </div>
                <div className='flex flex-col gap-2 w-full p-3'>
                    {
                        errors.password_confirmation && (
                            <p className='text-red-500'>{errors.password_confirmation}</p>
                        )
                    }
                    <Label htmlFor="password_confirmation">Confirmar contraseña:</Label>
                    <Input type="password" name="password_confirmation" id="password_confirmation" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                </div>
                <div className='flex flex-col gap-2 w-full px-3 py-1'>
                    <Button type="button" className='w-full cursor-pointer bg-red-500 hover:bg-red-400 transition-background duration-300 ease-in-out' disabled={processing} onClick={handleDeleteAccount}>Eliminar cuenta</Button>
                </div>
                <div className='flex flex-col gap-2 w-full px-3 py-1'>
                    <Button type="submit" className='w-full cursor-pointer' disabled={processing}>Actualizar</Button>
                </div>
            </form>
        </section>
    </ProfileSection>
}
