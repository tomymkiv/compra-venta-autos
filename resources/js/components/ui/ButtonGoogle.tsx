interface ButtonProps {
    isLogin: boolean,
    action: React.MouseEventHandler<HTMLButtonElement>
}

export default function ButtonGoogle({ isLogin, action }: ButtonProps) {
    return (
        <button type="button" onClick={action} className="flex gap-2 items-center justify-center p-3 bg-[#888] hover:bg-gray-300 rounded-md transition-colors duration-300 text-[#000] w-full text-center cursor-pointer">
            {isLogin ? 'Iniciar sesión con Google' : 'Registrarse con Google'}
            <img className="w-6 h-6" src="/img/logos/google-logo.webp" alt="Logo de google" />
        </button>
    )
}