interface InputProps {
    type: string,
    name?: string,
    id?: string,
    value?: string | number,
    maxLength?: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    className?: string,
    ref?: React.RefObject<HTMLInputElement | null>,
    max?: number,
    readOnly?: boolean,
    accept?: string,
}

export default function InputComp({ type, name, id, value, onChange, placeholder, className, ref, max, accept, readOnly }: InputProps) {
    return <input accept={accept} type={type} readOnly={readOnly} ref={ref} name={name} id={id} value={value} onChange={onChange} placeholder={placeholder} max={max} className={`${className} p-3 border rounded-md transition-colors duration-300 focus:bg-slate-800 focus:border-blue-500 outline-none`} />
}
