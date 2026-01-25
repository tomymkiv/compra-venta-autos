interface InputProps {
    type: string,
    name?: string,
    id?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    className?: string,
}

export default function InputComp({ type, name, id, value, onChange, placeholder, className }: InputProps) {
    return <input type={type} name={name} id={id} value={value} onChange={onChange} placeholder={placeholder} className={`${className} p-3 border rounded-md transition-colors duration-300 focus:bg-slate-800 focus:border-blue-500 outline-none`} />
}
