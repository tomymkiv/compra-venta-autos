interface CloseButtonProps {
    onClickEvent: () => void;
}

export default function CloseButton({ onClickEvent }: CloseButtonProps) {
    return <button
        onClick={onClickEvent}
        className="absolute cursor-pointer top-8 right-8 text-gray-200 hover:text-white transition-all transform hover:scale-110 z-[110] p-2 bg-gray-200/10 rounded-full"
        aria-label="Cerrar imagen"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>

}
