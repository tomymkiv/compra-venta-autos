import { Currency, Municipio, Provincia, VehicleBody, VehicleBrand } from '@/types/types'
import { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    arr: Currency[] | Provincia[] | Municipio[] | VehicleBrand[] | VehicleBody[] | number[] // enrealidad seria currency, provincias, municipios, carBrands, etc, pero si cambio algo en los tipos, tengo que cambiarlo en todos lados, por ahora lo dejo asi, para luego refactorizar
    onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
    name: string
    placeholder: string
    titulo: string
    value?: number | ""
}

export default function FilterSelect({ value, placeholder, arr, onChangeHandler, name, titulo }: SelectProps) {
    return (
        <>
            <div className="w-full my-2.5">
                <label htmlFor={name}>{titulo}: </label>
            </div>
            <select value={value} className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" name={name} onChange={onChangeHandler}>
                <option value="">{placeholder}</option>
                {arr.map(item => (
                    // pregunto si es numerico, porque tambien puedo filtrar años
                    typeof item !== 'number' ?
                        <option key={item.id} value={item.id}>
                            {'nombre' in item && item.nombre}
                            {'name' in item && item.name}
                        </option>
                        :
                        <option key={item} value={item}>{item}</option>
                ))}
            </select>
        </>
    )
}
