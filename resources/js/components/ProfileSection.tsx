import AppFront from "@/AppFront";
import { ProfileProps } from "@/types/automovil";

export default function ProfileSection({ loguedUser, children, user }: ProfileProps) {
    const openImg = () => {
        // si clickeo la imagen del perfil, se agranda, dando una vista completa de la misma

    }
    return <AppFront loguedUser={loguedUser}>
        <section className="max-w-4xl h-fit w-full p-3 rounded-md border flex flex-col gap-3">
            {
                !location.href.includes('edit') &&
                <>
                    <div className="w-fit flex flex-col items-center gap-5 p-2 rounded-md">
                        <div className="flex items-center">
                            {user.avatar && <img src={user.avatar?.includes('api') ? user.avatar : `/storage/${user.avatar}`} className="rounded-full object-cover w-80 h-80" alt={"Imagen del usuario"} />}
                        </div>
                        <div className="flex gap-3 text-3xl">
                            <p>{user.name}</p>
                        </div>
                    </div>
                    <hr className="animate-box-pulse" />
                    <div className="hidden fixed inset-0 bg-black/60 flex items-center justify-center w-screen h-screen z-50">
                        <img src={user.avatar?.includes('api') ? user.avatar : `/storage/${user.avatar}`} className="rounded-full object-cover w-80 h-80" alt={"Imagen del usuario"} />
                    </div>
                </>
            }
            <div className="w-full rounded-md p-2">
                {children}
            </div>
        </section>
    </AppFront>
}