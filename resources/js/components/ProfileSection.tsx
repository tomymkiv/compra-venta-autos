import AppFront from "@/AppFront";
import { ProfileProps } from "@/types/automovil";
import { useEffect, useState } from "react";

export default function ProfileSection({ loguedUser, children, user }: ProfileProps) {
    const [isImageOpen, setIsImageOpen] = useState(false);

    // Abro o cierro la imagen, dependiendo el estado
    const toggleImg = () => setIsImageOpen(!isImageOpen);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsImageOpen(false);
        };

        document.body.classList.toggle('overflow-hidden');
        // si abro la imagen, habilito "handleEscape"
        isImageOpen && addEventListener('keydown', handleEscape);

        return () => {
            removeEventListener("keydown", handleEscape);
        };
    }, [isImageOpen]); // dependo de este valor

    return (
        <AppFront loguedUser={loguedUser}>
            <section className="max-w-4xl h-fit w-full p-3 rounded-md border flex flex-col gap-3">
                {!location.href.includes("edit") && (
                    <>
                        <div className="w-fit flex flex-col items-center gap-5 p-2 rounded-md">
                            <div onClick={toggleImg} className="cursor-pointer flex items-center">
                                {user.avatar && (
                                    <img
                                        // si la imagen tiene "api" en el src, la muestro directamente, si no, la muestro desde storage
                                        src={user.avatar?.includes("api") ? user.avatar : `/storage/${user.avatar}`}
                                        className="rounded-full object-cover w-80 h-80 transition-transform duration-300 group-hover:scale-105"
                                        alt={"Imagen del usuario"}
                                    />
                                )}
                            </div>
                            <div className="flex gap-3 text-3xl">
                                <p>{user.name}</p>
                            </div>
                        </div>
                        <hr className="animate-box-pulse" />
                    </>
                )}

                {/* Modal Overlay for Full-screen Image */}
                {isImageOpen && (
                    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                        {/* Gray "X" Close Button */}
                        <button
                            onClick={toggleImg}
                            className="absolute cursor-pointer top-8 right-8 text-gray-200 hover:text-white transition-all transform hover:scale-110 z-[110] p-2 bg-gray-200/10 rounded-full"
                            aria-label="Cerrar imagen"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Full Image Container (when i click the image) */}
                        <div className="relative max-w-full max-h-full flex items-center justify-center animate-in zoom-in-90 duration-300">
                            <img
                                src={user.avatar?.includes("api") ? user.avatar : `/storage/${user.avatar}`}
                                // Muestra la foto COMPLETA (sin rounded-full) y centrada.
                                className="rounded-md object-contain shadow-2xl border-2 border-white/20 max-w-[95vw] max-h-[90vh]"
                                alt={"Imagen del usuario ampliada"}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* Background click to close */}
                        <div className="absolute inset-0 -z-10" onClick={toggleImg}></div>
                    </div>
                )}

                <div className="w-full rounded-md p-2">{children}</div>
            </section>
        </AppFront>
    );
}
