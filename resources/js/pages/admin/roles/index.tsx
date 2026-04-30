import AppFront from "@/AppFront";
import { Rol } from "@/types/types";

export default function index({ roles }: { roles: Rol[] }) {
    return (
        <AppFront>
            <div className="p-6 rounded-xl w-full min-h-screen border border-gray-300/20">
                <h2 className="text-lg font-semibold text-gray-100 mb-4">
                    Todos los roles
                </h2>

                <div className="space-y-3">
                    {roles.map((rol) => (
                        <div
                            key={rol.id}
                            className="flex justify-between items-center bg-gray-900/60 border border-gray-800 rounded-lg px-4 py-3 hover:bg-gray-900 transition"
                        >
                            <p className="text-gray-200 font-medium">
                                {rol.name}
                            </p>

                            {/* <div className="flex gap-2">
                                <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition">
                                    Editar
                                </button>

                                <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">
                                    Eliminar
                                </button>
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </AppFront>
    )
}
