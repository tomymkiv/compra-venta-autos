import { Images } from "@/types/types";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";
import ButtonPrimary from "./ui/ButtonPrimary";

type Props = {
    step: number;
    children: React.ReactNode;
    setStep: (step: number) => void;
    errorsActive?: boolean;
    onNext?: () => void;
    loginButton?: boolean;
    maxSteps: number; // cantidad de pasos de ese formulario
    images?: File[];
    mainImage?: "" | File | Images | null;
    cancelActionBtn?: boolean;
}


export default function FormStepComponent({ cancelActionBtn, maxSteps, step, setStep, children, errorsActive, onNext, loginButton, mainImage, images }: Props) {
    const [buttonType, setButtonType] = useState<'button' | 'submit'>('button');
    const [buttonText, setButtonText] = useState('Continuar');
    const next = () => {
        if (onNext) {
            onNext();
        } else {
            setStep(step + 1);
        }
    }
    const back = () => {
        setStep(step - 1)
    }
    useEffect(() => {
        if (step === maxSteps) {
            setButtonType('submit');
            if (maxSteps > 5) {
                setButtonText('Crear publicación');
            } else {
                setButtonText('Registrarse');
            }
        } else {
            setButtonType('button');
            setButtonText('Continuar');
        }

        if (step > maxSteps) {
            setStep(maxSteps);
        }
    }, [step]);
    const cancel = () => {
        history.back();
    }
    return (
        <>
            <div className="flex flex-col gap-1.5 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-medium tracking-widest uppercase text-gray-400 letter-spacing-wide">Paso {step} de {maxSteps}</span>
                    <span className={`text-xs font-semibold ${errorsActive ? 'text-red-400' : step === maxSteps ? 'text-emerald-400' : 'text-gray-500'}`}>
                        {errorsActive ? 'Revisá los campos' : step === maxSteps ? 'Último paso' : `${Math.round((step / maxSteps) * 100)}%`}
                    </span>
                </div>
                <div className="w-full h-[3px] bg-[#333] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${errorsActive ? 'bg-red-400' : step === maxSteps
                        ? (maxSteps === 8 ? ((mainImage && images && images.length > 0) ? 'bg-emerald-400' : 'bg-blue-400') : 'bg-emerald-400')
                        : 'bg-blue-400'
                        } ${maxSteps === 5 ? `w-${step * 20}p` :
                            step === 1 ? 'w-12-5p' :
                                step === 2 ? 'w-25p' :
                                    step === 3 ? 'w-37-5p' :
                                        step === 4 ? 'w-50p' :
                                            step === 5 ? 'w-62-5p' :
                                                step === 6 ? 'w-75p' :
                                                    step === 7 ? 'w-87-5p' :
                                                        step === 8 ? 'w-100p' : 'w-0'
                        } transition-all duration-500 ease-in-out`}></div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className={`flex flex-col gap-3 ${step == 1 ? 'mb-4' : 'mb-8'}`}>
                    {children}
                </div>
                <div className="flex flex-col gap-2">
                    <ButtonPrimary
                        type={buttonType}
                        onClick={next}
                        text={buttonText}
                    />
                    {/* {buttonText}
                    </button> */}
                    {step > 1 &&
                        <ButtonPrimary
                            type='button'
                            onClick={back}
                            text="Volver"
                            className="!bg-[#2e2e2e] hover:!bg-[#383838] !text-[#eee] !border-[#3a3a3a] !hover:border-[#484848]"
                        />
                    }
                    {cancelActionBtn && step >= 1 &&
                        <ButtonPrimary
                            type='button'
                            onClick={cancel}
                            text="Cancelar"
                            className="!bg-red-900/40 hover:!bg-red-900/60 !text-red-300 !border-red-800/40 !hover:border-red-700/60"
                        />
                    }
                </div>
                {
                    loginButton &&
                    <div className="flex pt-4 w-full justify-center">
                        <Link href={route('login')} className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200">¿Ya tienes una cuenta?</Link>
                    </div>
                }
            </div >
        </>
    );
}