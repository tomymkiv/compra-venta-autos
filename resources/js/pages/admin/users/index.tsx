import AppFront from "@/AppFront";
import AdminCard from "@/components/AdminCard";
import Pagination from "@/components/pagination";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import { User } from "@/types";
import { type Paginated } from "@/types/types";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function index({ users }: { users: Paginated<User> }) {
    return (
        <AppFront>
            <div className="flex flex-col w-full">
                <ButtonPrimary onClick={() => router.visit(route('admin.index'))} text="Volver atrás" className="!w-fit hidden md:block mx-5 max-w-[15%] !text-gray-800 !bg-gray-300 hover:!bg-gray-500 hover:!text-gray-300 !border-gray-300" />
                {
                    users.data.length > 0 ?
                        <div className="flex flex-col w-full">
                            <AdminCard
                                users={users.data}
                                title="Usuarios"
                                hasReviews={true}
                            />
                            <Pagination links={users.links} />
                        </div>

                        :
                        <div className="min-h-screen w-full p-6 rounded-xl">
                            <h1 className="text-xl font-semibold text-gray-100 mb-6">Admin panel</h1>
                            <p className="text-gray-400">No hay usuarios registrados.</p>
                        </div>
                }
            </div>

        </AppFront>
    )
}