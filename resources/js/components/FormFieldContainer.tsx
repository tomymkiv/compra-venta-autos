// encargado de contener la base para el formulario de creacion de posts
// contiene:
// - label
// - input
// - textarea
// - select

import React from 'react'
import { Label } from './ui/label'

interface FormFieldContainerProps {
    children: React.ReactNode
    titulo: string
    errorsText?: string

}
export default function FormFieldContainer({ children, titulo, errorsText }: FormFieldContainerProps) {
    return <div className="mt-5 flex flex-col gap-2">
        {
            errorsText && (
                <p className='text-red-500 font-[500] text-sm'>{errorsText}</p>
            )
        }
        <Label htmlFor={titulo}>{titulo}</Label>
        {children}
    </div>
}
