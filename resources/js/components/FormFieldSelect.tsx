import { type FormFieldsInterface } from '@/types/types'
import { Select } from "@headlessui/react";
import FormFieldContainer from './FormFieldContainer';

export default function FormFieldSelect({ options, titulo, errorsText, value, onChangeEventSelect }: FormFieldsInterface) {
    return <FormFieldContainer titulo={titulo} errorsText={errorsText}>
        <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" value={value} id={titulo} onChange={onChangeEventSelect}>
            <option value="" disabled>Seleccionar</option>
            {options?.map(option => (
                <option value={option.id} key={option.id}>{option.nombre}</option>
            ))}
        </Select>
    </FormFieldContainer>
}