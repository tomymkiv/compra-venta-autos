import { type FormFieldsInterface } from '@/types/types'
import { Input } from '@/components/ui/input'
import FormFieldContainer from './FormFieldContainer'

export default function FormFieldInput({ type, max, titulo, placeholder, errorsText, value, onChangeEventInput }: FormFieldsInterface) {
    return <FormFieldContainer titulo={titulo} errorsText={errorsText}>
        <Input type={type} maxLength={max} className="outline-none rounded-lg w-full max-w-[400px] focus:bg-slate-700 transition-colors duration-300" value={value} placeholder={placeholder} id={titulo} onChange={onChangeEventInput} />
    </FormFieldContainer>
}