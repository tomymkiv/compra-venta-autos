import AppFront from "@/AppFront";
import { ProfileProps } from "@/types/types";
import { useEffect, useState } from "react";
import CloseButton from "./close-button";
import { usePage } from "@inertiajs/react";
import { createPortal } from "react-dom";

export default function ProfileSection({ children, profileUser }: ProfileProps) {
    const { user_role: UserRoleProp } = usePage().props;
    const user_role = UserRoleProp as string;
    const [isImageOpen, setIsImageOpen] = useState(false);
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
        <AppFront>
            <section className="max-w-4xl h-fit w-full p-3 rounded-md border flex flex-col gap-3">
                {!location.href.includes("edit") && (
                    <>
                        <div className="w-fit flex flex-col items-center gap-5 p-2 rounded-md">
                            <div onClick={toggleImg} className="cursor-pointer flex items-center">
                                {profileUser.avatar && (
                                    <img
                                        // si la imagen tiene "api" en el src, la muestro directamente, si no, la muestro desde storage
                                        src={profileUser.avatar?.includes("api") ? profileUser.avatar : `/storage/${profileUser.avatar}`}
                                        className="rounded-full object-cover w-80 h-80 transition-transform duration-300 group-hover:scale-105"
                                        alt={"Imagen del usuario"}
                                    />
                                )}
                            </div>
                            <div className="flex gap-3 text-3xl">
                                <p>{profileUser.name} <small>({user_role.toLowerCase()})</small></p>
                            </div>
                        </div>
                        <hr className="animate-box-pulse" />
                    </>
                )}

                {/* Modal Overlay for Full-screen Image */}
                {
                    createPortal(
                        isImageOpen && (
                            <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                                <CloseButton onClickEvent={toggleImg} />
                                {/* Full Image Container (when i click the image) */}
                                <div className="relative max-w-full max-h-full flex items-center justify-center animate-in zoom-in-90 duration-300">
                                    <img
                                        src={profileUser.avatar?.includes("api") ? profileUser.avatar : `/storage/${profileUser.avatar}`}
                                        // Muestra la foto COMPLETA (sin rounded-full) y centrada.
                                        className="rounded-md object-contain shadow-2xl border-2 border-white/20 max-w-[95vw] max-h-[90vh]"
                                        alt={"Imagen del usuario ampliada"}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>

                                {/* Background click to close */}
                                <div className="absolute inset-0 -z-10" onClick={toggleImg}></div>
                            </div>
                        )
                        , document.body)
                }
                <div className="w-full rounded-md p-2">{children}</div>
            </section>
        </AppFront>
    );
}
