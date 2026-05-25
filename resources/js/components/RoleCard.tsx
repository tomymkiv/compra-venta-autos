import { useEffect, useState } from "react"
import { route } from "ziggy-js";

type RoleCard = {
    userType: string,
}

export default function RoleCard({ userType }: RoleCard) {
    const [containerClass, setContainerClass] = useState('');
    const [rol, setRol] = useState('');

    useEffect(() => {
        if (userType == 'COMPRADOR') {// cambiar cuando se creen los roles y hacer que reciba desde la BBDD
            setContainerClass("hover:bg-green-500/30 text-green-500 font-thin border-green-500 right-100 transition-background duration-300")
            setRol("Comprador");
        } else if (userType == 'VENDEDOR') {
            setContainerClass("hover:bg-blue-500/30 text-blue-500 font-thin border-blue-500 left-100 transition-background duration-300")
            setRol("Vendedor");
        }
    }, [userType])

    return (
        <div className="flex flex-col items-center justify-center w-[33%] h-[33%] absolute top-[33%] left-[33%]">
            <a href={route('auth.register')} className={`flex items-center justify-center absolute w-full h-full border p-3 rounded-md ${containerClass} `}>
                <p className="text-5xl">{rol}</p>
            </a>
        </div>
    )
}