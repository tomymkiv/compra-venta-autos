import FormFieldContainer from "./FormFieldContainer";

interface Props {
    titulo: string,
    name: string;
    id: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export default function FormFieldCheckbox({ titulo, name, id, checked, onChange, className }: Props) {
    return <FormFieldContainer titulo={titulo} className={className}>
        <input className="outline-none border-none rounded-md cursor-pointer transition duration-300 ease-in-out hover:scale-130 focus:ring-none focus:border-transparent" type="checkbox" name={name} id={id} checked={checked} onChange={onChange} />
    </FormFieldContainer>
}