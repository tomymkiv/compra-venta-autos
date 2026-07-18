import ProfileSection from '@/components/ProfileSection'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { router, useForm, usePage } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { useRef, useState } from 'react'
import { User } from '@/types'
import FormFieldFile from '@/components/FormFieldFile'
import FormFieldInput from '@/components/FormFieldInput'
import FormFieldContainer from '@/components/FormFieldContainer'

export default function edit() {
    const { user } = usePage().props;
    const loguedUser = user as User;
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [mailChanged, setMailChanged] = useState(false);
    const { data, setData, patch, processing, errors, delete: destroy } = useForm<{
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
    }
    const handleDeleteNewImg = () => {
        setData('avatar', null)
        fileInputRef.current && (fileInputRef.current.value = '');
    }
    const handleDeleteActualImg = () => {
        // le pongo una imagen con las iniciales de su username
        setData('avatar', `https://ui-avatars.com/api/?name=${loguedUser.name}&background=random`);
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        patch(route('user.update', loguedUser.id), {
            forceFormData: true,
        })
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('email', e.target.value);
        setMailChanged(e.target.value !== loguedUser.email);
    }
    const handleDeleteAccount = (e: React.FormEvent) => {
        e.preventDefault();
        confirm('¿Estás seguro que quieres eliminar tu cuenta? Se eliminarán toda la información relacionada.') && destroy(route('user.destroy', loguedUser.id));
    }
    return <ProfileSection profileUser={loguedUser}>
        <section>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-center justify-center'>
                <div className='flex flex-col gap-2 w-full p-3'>
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
                    <FormFieldFile forPosts={false} image={data.avatar} errors={errors.avatar} removeImage={handleDeleteNewImg} handleImage={handleImageInput} />
                    {
                        data.avatar &&
                        <>
                            <p>Esta será tu nueva imagen</p>
                            <img src={data.avatar instanceof File ? URL.createObjectURL(data.avatar) : (data.avatar ?? '')} alt="Imagen nueva" className='w-24 h-24 rounded-full object-cover' />
                            <button className='bg-red-500/30 hover:bg-red-500/50 transition-colors duration-300 ease cursor-pointer p-2 rounded-md' type='button' onClick={handleDeleteNewImg}>Descartar imagen</button>
                        </>
                    }
                </div>
                <FormFieldInput max={32} titulo='Nombre de usuario' className='w-full p-3' value={data.name} onChangeEventInput={(e) => setData('name', e.target.value.slice(0, 32))} type='text' placeholder='Nombre de usuario' errorsText={errors.name} />
                <FormFieldInput titulo="Correo" className='w-full p-3' value={data.email} onChangeEventInput={handleEmail} type='email' placeholder='Email' errorsText={errors.email} />
                <FormFieldInput titulo='Contraseña' className='w-full p-3' value={data.password} onChangeEventInput={(e) => setData('password', e.target.value)} type='password' errorsText={errors.password} />
                <FormFieldInput titulo='Confirmar contraseña' className='w-full p-3' value={data.password_confirmation} onChangeEventInput={(e) => setData('password_confirmation', e.target.value)} type='password' errorsText={errors.password_confirmation} />
                <FormFieldContainer titulo={loguedUser.email_verified_at ? 'Email verificado' : 'Verificar email'} className='w-full p-3'>
                    {
                        loguedUser.email_verified_at === null ? (
                            // Mostrar mensaje si el email no esta verificado 
                            <div className='bg-red-500/30 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 text-sm p-3 rounded-lg border border-red-200 text-red-700 flex flex-col gap-2 w-fit'>
                                <p>Tu email no está verificado. Por favor, verificá tu email para continuar.</p>
                                <button className='bg-red-500 hover:bg-red-400 transition-colors duration-300 ease-in-out text-white cursor-pointer p-2 rounded-md w-fit' onClick={() => {
                                    router.post(route('verification.send'));
                                    alert("Se ha enviado un email de verificación a tu correo.");
                                }}>Reenviar email de verificación</button>
                            </div>
                        ) : (
                            <div className='bg-green-500/30 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300 text-sm p-3 rounded-lg border border-green-200 text-green-700 flex items-center gap-2 w-fit'>
                                <p>Cuenta verificada.</p>
                                <svg className='w-5 h-5 text-green-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path fill="currentColor" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                                </svg>
                            </div>
                        )
                    }
                    {
                        mailChanged && <p className='text-sm text-red-500'>(deberás volver a verificar el correo manualmente)</p>
                    }
                </FormFieldContainer>
                <div className='flex flex-col md:flex-row items-center justify-center gap-2 w-full px-3 py-1'>
                    <Button type="button" className='w-full cursor-pointer bg-red-500 hover:bg-red-400 transition-background duration-300 ease-in-out' disabled={processing} onClick={handleDeleteAccount}>Eliminar cuenta</Button>
                    <Button type="submit" className='w-full cursor-pointer' disabled={processing}>Actualizar</Button>
                </div>
            </form>
        </section>
    </ProfileSection>
}
