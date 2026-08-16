import AuthLayout from "@/layouts/auth-layout";
import { Link, router, useForm } from "@inertiajs/react"
import React, { useEffect, useRef, useState } from "react";
import { route } from "ziggy-js";
import RegisterFormData from "@/components/RegisterFormData";
import InputComp from "@/components/ui/InputComp";
import FormStepRegister from "@/components/FormStepRegister";

export default function Register({ rol: initialRol = '' }: { rol: string }) {
    const [inputBg, setInputBg] = useState('');
    const [step, setStep] = useState(1);
    const inputRef = useRef<HTMLInputElement>(null);
    const [imgBtn, setImgBtn] = useState('hidden');
    const [showContacto, setShowContacto] = useState(initialRol === 'V');
    const [showRol, setShowRol] = useState("");

    const { data, setData, post, errors, setError, clearErrors } = useForm<{
        avatar: File | null,
        rol: string,
        name: string,
        email: string,
        password: string,
        password_confirmation: string,
        contacto: number,
    }>({
        avatar: null,
        rol: initialRol,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        contacto: 0,
    })

    const handleRole = () => {
        const rol = initialRol;
        setShowContacto(rol === 'V'); // si esto es verdadero, showContacto = true
        if (rol === 'V') setShowRol("vendedor");
        if (rol === 'C') setShowRol("comprador");
    }

    const validateStep = (currentStep: number): boolean => {
        // valido cada paso
        clearErrors();
        if (currentStep === 1) {
            if (!data.rol) {
                setError('rol', 'El rol es obligatorio.');
                return false;
            }
        } else if (currentStep === 2) {
            if (!data.name.trim()) {
                setError('name', 'El nombre es obligatorio.');
                return false;
            }
            if (data.name.length > 32) {
                setError('name', 'El nombre debe tener como máximo 32 caracteres.');
                return false;
            }
        } else if (currentStep === 3) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!data.email.trim()) {
                setError('email', 'El correo es obligatorio.');
                return false;
            }
            if (!emailRegex.test(data.email)) {
                setError('email', 'El correo debe ser un correo válido.');
                return false;
            }
            if (showContacto) {
                if (!data.contacto) {
                    setError('contacto', 'El número de contacto es obligatorio para vendedores.');
                    return false;
                }
                if (data.contacto < 10000000 || data.contacto > 99999999) {
                    setError('contacto', 'El número de contacto debe tener exactamente 8 dígitos.');
                    return false;
                }
            }
        } else if (currentStep === 4) {
            if (!data.password) {
                setError('password', 'La contraseña es obligatoria.');
                return false;
            }
            if (data.password.length < 8) {
                setError('password', 'La contraseña debe tener como mínimo 8 caracteres.');
                return false;
            }
            if (data.password !== data.password_confirmation) {
                setError('password_confirmation', 'Las contraseñas no coinciden.');
                return false;
            }
        }
        return true;
    }

    const handleNextStep = () => {
        // si todas las validaciones salieron bien, devuelve true
        if (validateStep(step)) {
            setStep(step + 1); // paso siguiente
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Final sanity check of all inputs
        if (!validateStep(1)) { setStep(1); return; }
        if (!validateStep(2)) { setStep(2); return; }
        if (!validateStep(3)) { setStep(3); return; }
        if (!validateStep(4)) { setStep(4); return; }

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
    useEffect(() => {
        handleRole();
    }, [initialRol]);

    // limpio los errores (en tiempo real) al modificar los campos
    useEffect(() => {
        if (errors.name) clearErrors('name');
    }, [data.name]);

    useEffect(() => {
        if (errors.email) clearErrors('email');
    }, [data.email]);

    useEffect(() => {
        if (errors.contacto) clearErrors('contacto');
    }, [data.contacto]);

    useEffect(() => {
        if (errors.password) clearErrors('password');
    }, [data.password]);

    useEffect(() => {
        if (errors.password_confirmation) clearErrors('password_confirmation');
    }, [data.password_confirmation]);

    // Al aparecer un error, nos redirije al paso correspondiente
    useEffect(() => {
        if (errors.name) {
            setStep(2);
        } else if (errors.email || errors.contacto) {
            setStep(3);
        } else if (errors.password || errors.password_confirmation) {
            setStep(4);
        } else if (errors.avatar) {
            setStep(5);
        }
    }, [errors]);

    return <AuthLayout title={`Registro (rol: ${showRol})`}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <FormStepRegister errorsActive={Object.keys(errors).length > 0} setStep={setStep} step={step} onNext={handleNextStep}>
                {
                    step == 1 && <Link href={route('auth.roles')} className="p-3 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-300 text-white w-full text-center cursor-pointer">Elegir otro rol</Link>
                }
                {
                    step == 2 &&
                    <RegisterFormData errorMsg={errors.name} name="Nombre" type="text" setData={(e) => setData('name', e.target.value.slice(0, 32))} value={data.name} />
                }
                {
                    step == 3 && <>
                        <RegisterFormData errorMsg={errors.email} name="Correo" type="email" setData={(e) => setData('email', e.target.value)} value={data.email} />
                        {showContacto// muestro el contacto si elegí el rol "vendedor"
                            &&
                            <RegisterFormData errorMsg={errors.contacto} name="Número de contacto (sin codigo de area)" type="number" setData={handleContacto} value={String(data.contacto)} />}
                    </>
                }
                {
                    step == 4 && <>
                        <RegisterFormData errorMsg={errors.password} name="Contraseña" type="password" setData={(e) => setData('password', e.target.value)} value={data.password} />
                        <RegisterFormData errorMsg={errors.password_confirmation} name="Confirmar contraseña" type="password" setData={(e) => setData('password_confirmation', e.target.value)} value={data.password_confirmation} />
                    </>
                }
                {
                    step == 5 && <>
                        <div className="flex flex-col gap-2">
                            <p className="text-red-600">{errors.avatar}</p>
                            <label htmlFor="avatar">Avatar <small>(opcional)</small></label>
                            <InputComp ref={inputRef} type="file" name="avatar" id="avatar" onChange={handleImageInput} accept="image/*" placeholder="Avatar" className={`${inputBg} cursor-pointer w-full`} />
                            {data.avatar &&
                                <button onClick={handleRemoveImage} className={`text-red-500 w-full text-center cursor-pointer bg-red-500/30 hover:bg-red-500/60 transition-colors duration-300 p-2 rounded-md ${imgBtn} w-fit`}>
                                    Eliminar imagen
                                </button>}
                        </div>
                    </>
                }
            </FormStepRegister>
        </form>
        <div className="flex flex-col items-center justify-center">
            <button onClick={() => router.visit(route('redirect.google'))} className="p-3 bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-300 text-white w-full text-center cursor-pointer">Registrarse con Google</button>
        </div>
    </AuthLayout>
}