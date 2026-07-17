
interface SelectCompInterface {
    name?: string,
    id?: string,
    value: string | number,
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    className?: string,
    children: React.ReactNode,
}

export default function SelectComp({ name, id, value, onChange, className, children }: SelectCompInterface) {
    return <select name={name} id={id} value={value} onChange={onChange} className={className}>
        {children}
    </select>
}
