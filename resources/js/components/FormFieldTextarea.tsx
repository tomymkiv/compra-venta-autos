import { FormFieldsInterface } from '@/types/types'
import FormFieldContainer from './FormFieldContainer'
import TextAreaComp from './ui/TextAreaComp'

export default function FormFieldTextarea({ titulo, errorsText, value, onChangeEventTextarea }: FormFieldsInterface) {
    return <FormFieldContainer titulo={titulo} errorsText={errorsText}>
        <TextAreaComp name={titulo} id={titulo} value={value.toString()} onChange={onChangeEventTextarea} />
    </FormFieldContainer>
}