import InputComp from './InputComp'

type FormDataTypes = {
    errorMsg: string | undefined,
    type: string,
    name: string,
    value: string,
    setData: (e: React.ChangeEvent<HTMLInputElement>) => void,
}


export default function RegisterFormData({ errorMsg, type, name, setData, value }: FormDataTypes) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-red-600">{errorMsg}</p>
            <label htmlFor={name}>{name}</label>
            <InputComp type={type} max={8} name={name} id={name} value={value} onChange={setData} placeholder={name} />
        </div>
    )
}