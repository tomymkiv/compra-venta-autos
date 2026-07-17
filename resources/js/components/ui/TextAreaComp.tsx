import React from 'react'

interface TextAreaCompProps {
    name?: string,
    id?: string,
    placeholder?: string,
    className?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}
export default function TextAreaComp({ name, id, placeholder, className, value, onChange }: TextAreaCompProps) {
    return (
        <textarea
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${className} p-3 border rounded-md transition-colors duration-300 focus:bg-slate-800 focus:border-blue-500 outline-none`} />
    )
}
