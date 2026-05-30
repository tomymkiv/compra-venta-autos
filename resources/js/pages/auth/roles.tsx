import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Rol } from "@/types/types";
import { useState } from "react";

export default function roles({ roles }: { roles: Rol[] }) {
    const [classes, _setClasses] = useState("flex justify-center items-center h-50 w-80 bg-transparent rounded-md transition-colors duration-300 text-white p-4 cursor-pointer w-full text-xl md:text-4xl border rounded-md");
    const handleData = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rol = e.currentTarget.value;
        router.post(route('auth.storeRole'), { rol });
    }

    return <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row justify-center gap-3.5 w-[50%]">
            {
                roles.map((rol) => (
                    <button key={rol.id} onClick={handleData} value={rol.name.at(0)} className={rol.name.at(0) === 'V' ? `bg-green-500/30 hover:bg-green-500/60 border-green-600 ${classes}` : `bg-blue-500/30 hover:bg-blue-500/60 border-blue-600 ${classes}`}>{rol.name}</button>
                ))
            }
        </div>
    </div>
}