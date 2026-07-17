import { type FormFieldsInterface } from '@/types/types'
import FormFieldContainer from './FormFieldContainer'
import InputComp from './ui/InputComp'

export default function FormFieldInput({ type, titulo, placeholder, errorsText, value, onChangeEventInput, className }: FormFieldsInterface) {
    return <FormFieldContainer titulo={titulo} errorsText={errorsText} className={className}>
        <InputComp type={type as string} value={value} placeholder={placeholder} id={titulo} onChange={onChangeEventInput} />
    </FormFieldContainer>
}