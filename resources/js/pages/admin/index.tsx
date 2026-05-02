import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import { User } from "@/types";
import AppFront from "@/AppFront";

export default function index({ users }: { users: User[] }) {
    return (
        <AppFront>
            {
                users.length > 0 &&
                <div className="min-h-screen w-full p-6 rounded-xl">
                    <h1 className="text-xl font-semibold text-gray-100 mb-6">Admin panel</h1>

                    <div className="overflow-auto rounded-xl border border-gray-800 shadow-lg">
                        <table className="w-full text-sm text-left text-gray-300">
                            <thead className="bg-gray-900 text-gray-400 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Usuario</th>
                                    <th className="px-6 py-4">Correo</th>
                                    <th className="px-6 py-4">Acciones</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-800">
                                {
                                    users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-900/60 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-100">
                                                {user.name}
                                            </td>

                                            <td className="px-6 py-4 text-gray-400">
                                                {user.email}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={route('user.edit', user.id)}
                                                        className="px-3 py-1.5 text-xs font-medium rounded-md bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition"
                                                    >
                                                        Editar usuario
                                                    </Link>

                                                    <Link
                                                        href={route('user.destroy', user.id)}
                                                        method="delete"
                                                        className="cursor-pointer px-3 py-1.5 text-xs font-medium rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                                                    >
                                                        Eliminar usuario
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6">
                        <Link
                            href={route('admin.roles')}
                            className="inline-block px-4 py-2 text-sm font-medium rounded-md bg-green-500/10 text-green-400 hover:bg-green-500/20 transition"
                        >
                            Roles
                        </Link>
                    </div>
                </div>
            }
            {
                users.length <= 0 &&
                <div className="min-h-screen w-full p-6 rounded-xl">
                    <h1 className="text-xl font-semibold text-gray-100 mb-6">Admin panel</h1>
                    <p className="text-gray-400">No hay usuarios registrados.</p>
                    <div className="mt-6">
                        <Link
                            href={route('admin.roles')}
                            className="inline-block px-4 py-2 text-sm font-medium rounded-md bg-green-500/10 text-green-400 hover:bg-green-500/20 transition"
                        >
                            Roles
                        </Link>
                    </div>
                </div>
            }
        </AppFront>
    )
}
