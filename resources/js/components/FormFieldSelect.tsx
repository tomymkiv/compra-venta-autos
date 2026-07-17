import type { FormFieldsSelectInterface } from '@/types/types'
import FormFieldContainer from './FormFieldContainer';
import SelectComp from './ui/SelectComp';

export default function FormFieldSelect({ options, titulo, errorsText, value, onChangeEventSelect }: FormFieldsSelectInterface) {
    return <FormFieldContainer titulo={titulo} errorsText={errorsText}>
        <SelectComp className="p-3 outline-none rounded-lg w-full bg-[#222] transition-colors duration-300" value={value} id={titulo} onChange={onChangeEventSelect}>
            <option value="">Seleccionar</option>
            {options?.map(option => (
                <option value={option.id} key={option.id}>{option.nombre}</option>
            ))}
        </SelectComp>
    </FormFieldContainer>
}