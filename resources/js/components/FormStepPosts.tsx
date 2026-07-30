import { Images } from "@/types/types"
import { router } from "@inertiajs/react"
import { useEffect, useState } from "react"
import { route } from "ziggy-js"

interface Props {
    step: number
    children: React.ReactNode
    setStep: (step: number) => void
    errorsActive?: boolean;
    onNext?: () => void;
    images?: File[];
    mainImage?: "" | File | Images | null;
}
export default function FormStepPosts({ images, mainImage, errorsActive, step, children, setStep, onNext }: Props) {
    const [buttonType, setButtonType] = useState<'button' | 'submit'>('button');
    const [buttonText, setButtonText] = useState('Continuar');

    const next = () => {
        if (onNext) {
            // si las validaciones salieron bien, paso al siguiente
            onNext();
        } else {
            // paso al siguiente paso
            setStep(step + 1);
        }
    }
    const back = () => {
        setStep(step - 1)
    }
    useEffect(() => {
        if (step == 8) {
            setButtonType('submit');
            setButtonText('Crear publicación');
        } else {
            setButtonType('button');
            setButtonText('Continuar');
        }

        if (step > 8) {
            setStep(8);
        }
    }, [step]);
    const cancel = () => {
        router.get(route('posts.index'));
    }
    return (
        <>
            <div className="flex gap-2 items-center mb-4">
                <h4 className="text-sm text-gray-200">Paso {step}/8</h4>
                <div className="w-full h-0.5 bg-gray-600 rounded-full">
                    {/* 12.5-25-37.5-50-62.5-75-87.5-100. este es el patron que debe seguir
                    la propiedad de css es w-valor-5p o w-valorp 
                     */}
                    <div className={`h-full ${step === 8
                        ? errorsActive
                            ? 'bg-red-500'
                            : (mainImage && images && images.length > 0)
                                ? 'bg-green-400'
                                : 'bg-blue-500'
                        : errorsActive
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                        } ${
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
                        <button type='button' onClick={back} className="p-3 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-300 text-white w-full text-center cursor-pointer">Volver</button>
                    }
                    <button type='button' onClick={cancel} className="p-3 bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-300 text-white w-full text-center cursor-pointer">Cancelar</button>
                </div>
            </div>
        </>
    )
}