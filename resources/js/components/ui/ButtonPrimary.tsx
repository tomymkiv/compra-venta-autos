interface Props {
    text: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}

export default function ButtonPrimary({ text, disabled, onClick, type, className }: Props) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`py-2.5 px-4 bg-emerald-700/80 hover:bg-emerald-700 text-emerald-100 text-sm font-medium tracking-wide rounded-sm transition-all duration-200 w-full text-center cursor-pointer border border-emerald-600/50 hover:border-emerald-500 ${className}`}>
            {text}
        </button>
    )
}
