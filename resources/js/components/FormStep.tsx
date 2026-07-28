import { Link } from "@inertiajs/react"
import { useEffect, useState } from "react"
import { route } from "ziggy-js"

interface Props {
    step: number
    children: React.ReactNode
    setStep: (step: number) => void
    errorsActive?: boolean;
    onNext?: () => void;
}
export default function FormStep({ errorsActive, step, children, setStep, onNext }: Props) {
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
        if (step === 5) {
            setButtonType('submit');
            setButtonText('Registrarse');
        } else {
            setButtonType('button');
            setButtonText('Continuar');
        }

        if (step > 5) {
            setStep(5);
        }
    }, [step]);
    return (
        <>
            <div className="flex gap-2 items-center mb-4">
                <h4 className="text-sm text-gray-200">Paso {step}/5</h4>
                <div className="w-full h-0.5 bg-gray-600 rounded-full">
                    <div className={`h-full ${errorsActive ? 'bg-red-500' : (step === 5 ? 'bg-green-400' : 'bg-blue-500')} w-${step * 20}p transition-all duration-600`}></div>
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
                <div className="flex p-3 w-full">
                    <Link href={route('login')} className="text-blue-500 hover:underline w-full text-center">¿Ya tienes una cuenta?</Link>
                </div>
            </div>
        </>
    )
}