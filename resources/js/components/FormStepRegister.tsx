import FormStepComponent from "./FormStepComponent"

interface Props {
    step: number
    children: React.ReactNode
    setStep: (step: number) => void
    errorsActive?: boolean;
    onNext?: () => void;
}
export default function FormStepRegister({ errorsActive, step, children, setStep, onNext }: Props) {
    return <FormStepComponent maxSteps={5} step={step} setStep={setStep} errorsActive={errorsActive} onNext={onNext} loginButton={true}>
        {children}
    </FormStepComponent>
}