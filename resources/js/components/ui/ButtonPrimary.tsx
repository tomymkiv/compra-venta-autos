interface Props {
    text: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}

export default function ButtonPrimary({ text, disabled, onClick, type, className }: Props) {
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`text-center bg-slate-800 hover:bg-blue-500 rounded-md transition-colors duration-300 text-white p-2 cursor-pointer w-full ${className}`}>
            {text}
        </button>
    )
}
