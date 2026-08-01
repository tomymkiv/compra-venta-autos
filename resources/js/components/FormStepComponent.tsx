import { Images } from "@/types/types";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";

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
            setButtonText('Registrarse');
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
            <div className="flex gap-2 items-center mb-4">
                <h4 className="text-sm text-gray-200">Paso {step}/{maxSteps}</h4>
                <div className="w-full h-0.5 bg-gray-600 rounded-full">
                    <div className={`h-full ${errorsActive ? 'bg-red-500' : maxSteps === 5 && step === 5 ? 'bg-green-400' :
                        step === 8
                            ? errorsActive
                                ? 'bg-red-500'
                                : (mainImage && images && images.length > 0)
                                    ? 'bg-green-400'
                                    : 'bg-blue-500'
                            : errorsActive
                                ? 'bg-red-500'
                                : 'bg-blue-500'
                        } ${maxSteps === 5 ? `w-${step * 20}p` :
                            step === 1 ? 'w-12-5p' :
                                step === 2 ? 'w-25p' :
                                    step === 3 ? 'w-37-5p' :
                                        step === 4 ? 'w-50p' :
                                            step === 5 ? 'w-62-5p' :
                                                step === 6 ? 'w-75p' :
                                                    step === 7 ? 'w-87-5p' :
                                                        step === 8 ? 'w-100p' : 'w-0'
                        } transition-all duration-600`}></div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className={`flex flex-col gap-2 ${step == 1 ? 'mb-2' : 'mb-8'}`}>
                    {children}
                </div>
                <div className="flex flex-col gap-2.5">
                    <button type={buttonType} onClick={next} className="p-3 bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-300 text-white w-full text-center cursor-pointer">{buttonText}</button>
                    {step > 1 &&
                        <button type='button' onClick={back} className="p-3 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-300 text-white w-full text-center cursor-pointer">Volver</button>}
                </div>
                <div className="flex flex-col gap-2.5">
                    {cancelActionBtn && step >= 1 &&
                        <button type='button' onClick={cancel} className="mt-2 p-3 bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-300 text-white w-full text-center cursor-pointer">Cancelar</button>
                    }
                </div>
                {
                    loginButton &&
                    <div className="flex p-3 w-full">
                        <Link href={route('login')} className="text-blue-500 hover:underline w-full text-center">¿Ya tienes una cuenta?</Link>
                    </div>
                }
            </div>
        </>
    );
}