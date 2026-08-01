import { Images } from "@/types/types"
import FormStepComponent from "./FormStepComponent"

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
    return <FormStepComponent cancelActionBtn={true} maxSteps={8} step={step} setStep={setStep} errorsActive={errorsActive} onNext={onNext} images={images} mainImage={mainImage}>
        {children}
    </FormStepComponent>
}