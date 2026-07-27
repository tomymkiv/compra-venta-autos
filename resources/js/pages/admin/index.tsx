import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppFront from "@/AppFront";
import ButtonPrimary from "@/components/ui/ButtonPrimary";

export default function index() {
    return (
        <AppFront>
            <div className="min-h-screen w-full p-6 rounded-xl">
                <div className="flex flex-col items-center justify-center min-h-[50dvh] w-full gap-4">
                    <Link href={route('admin.users.index')}>
                        <ButtonPrimary className="p-8 text-2xl" text="Ver todos los usuarios" />
                    </Link>
                    <Link href={route('admin.posts.index')}>
                        <ButtonPrimary className="p-8 text-2xl" text="Ver todos los posteos" />
                    </Link>
                </div>
            </div>
        </AppFront>
    )
}
