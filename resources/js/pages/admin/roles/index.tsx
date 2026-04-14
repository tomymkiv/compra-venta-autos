import { Rol } from "@/types/types";

export default function index({ roles }: { roles: Rol[] }) {
    console.log(roles)
    return (
        <div className="bg-gray-500 p-3">
            todos los roles:
            {
                roles.map((rol) => (
                    <div key={rol.id} className="flex justify-between items-center bg-gray-700 p-3 m-2 rounded-md">
                        <p>{rol.name}</p>
                        <div className="flex flex-col gap-3">
                            <button className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-md">Editar</button>
                            <button className="bg-red-800 hover:bg-red-600 p-2 rounded-md">Eliminar</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
