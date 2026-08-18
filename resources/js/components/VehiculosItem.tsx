import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CarCardsProps } from "@/types/types";
import AppFront from "@/AppFront";
import { Link, router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import CloseButton from "./close-button";
import { usePage } from '@inertiajs/react';
import { User } from "@/types";
import CarPostData from "./ui/car-post-data";
import usePriceConverter from "@/hooks/use-price-converter";
import UserAvatar from "./UserAvatar";
import ButtonPrimary from "./ui/ButtonPrimary";
import usePopUp from "@/hooks/use-popup";
import PopUp from "./PopUp";
import DealAlertCard from "./ui/DealAlertCard";

function useCountdown(rejectedAt: string | null | undefined) {
    const getTimeLeft = () => {
        if (!rejectedAt) return null;
        const expiresAt = new Date(new Date(rejectedAt).getTime() + 24 * 60 * 60 * 1000);
        const diff = expiresAt.getTime() - Date.now();
        if (diff <= 0) return null;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return { hours, minutes, seconds, diff };
    };
    const [timeLeft, setTimeLeft] = useState(getTimeLeft);
    useEffect(() => {
        if (!rejectedAt) return;
        const interval = setInterval(() => {
            const t = getTimeLeft();
            setTimeLeft(t);
            if (!t) clearInterval(interval);
        }, 1000);
        return () => clearInterval(interval);
    }, [rejectedAt]);
    return timeLeft;
}

export default function VehiculosItem({ post, hasDeals, hasDealsReceived, deals, lastRejectedDeal, cultdown, myDealStatus, isPostFinalized, dealsLimitReached }: CarCardsProps) {
    const { user: UserProps } = usePage().props;
    const user = UserProps as User;
    const { convertPrice, priceBtnActive, USDPrice, ARSPrice } = usePriceConverter({ post });
    const { show, setShow, confirmation, setConfirmation } = usePopUp();
    const [dealFinalized, setDealFinalized] = useState<boolean>(false);
    const { post: submitPost, delete: destroy } = useForm();
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [postId, setPostId] = useState<number>(0);
    const timeLeft = useCountdown(cultdown ? lastRejectedDeal?.rejected_at : null);
    const limit = 6;
    const minHeightWidthCards = 60;
    const imgContainerRef = useRef<HTMLDivElement>(null);
    const [indexImg, setIndexImg] = useState(0); // contador para saber por cuál imagen estoy
    const [slide, setSlide] = useState(false); // verifico si el slide fue abierto o no

    const handleDots = (precio: string) => {
        const raw = precio.replace(/\D/g, "");
        return raw ? Number(raw).toLocaleString("es-AR") : "";
    }
    const readDealsStatuses = () => {
        deals?.map(d => {
            if (d.deal_status_id === 1) {
                setDealFinalized(true);
            }
        })
    }
    useEffect(() => {
        readDealsStatuses();
    }, [deals])
    useEffect(() => {
        if (show || slide || showSuccess) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [show, slide, showSuccess]);
    const openSlide = () => {
        setSlide(true);
        imgContainerRef.current?.classList.remove('hidden')
    }
    const showImg = (numImg: number) => {
        setIndexImg(numImg); // establezco el índice de la imagen que clickeo
    }
    const nextSlide = () => {
        indexImg == post.post_image.length - 1 ? setIndexImg(0) : setIndexImg(indexImg + 1);
    }
    const prevSlide = () => {
        indexImg == 0 ? setIndexImg(post.post_image.length - 1) : setIndexImg(indexImg - 1)
    }
    const closeSlide = () => {
        setSlide(false);
        imgContainerRef.current?.classList.add('hidden')
    }
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key == 'ArrowRight') nextSlide();
            if (e.key == 'ArrowLeft') prevSlide();
            if (e.key == 'Escape') closeSlide();
        }
        slide ? addEventListener("keydown", handleKey) : '';

        return () => removeEventListener("keydown", handleKey);
    }, [slide, indexImg]) // ambas dependencias sirven para que funcione el soporte para teclado
    // si el slide está activado y el índice de la imagen es verdadero (existe), se podrá usar todo el useEffect

    const handleDeal = async (e: React.FormEvent) => {
        e.preventDefault();
        setShow(true);
        setPostId(post.id);
    }
    const handleRedirect = () => {
        open(`https://wa.me/5411${post.user.contact.contacto}?text=Hola, ¿como te va?. Me interesa saber más información acerca del vehiculo ${post.car_model.car_brand.name} ${post.car_model.name} ${post.anio}`, '_blank');
    }
    useEffect(() => {
        if (confirmation) {
            // inicia el deal
            if (!hasDeals && user.id !== post.user.id) {
                submitPost(route('deals.store', postId), {
                    onSuccess: () => {
                        setShowSuccess(true);
                        setConfirmation(false);
                        setShow(false);
                    },
                    onError: () => {
                        setConfirmation(false);
                        setShow(false);
                    }
                });
            }

            if (hasDeals && user.id !== post.user.id) { // si ya tiene un deal activo, voy a la opcion para cancelarlo
                destroy(route('deals.destroy_as_buyer', postId), {
                    onSuccess: () => {
                        setConfirmation(false);
                        setShow(false);
                    },
                    onError: () => {
                        setConfirmation(false);
                        setShow(false);
                    }
                });
            }
        }
    }, [confirmation])

    return <AppFront>
        {
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="flex lg:items-center flex-col lg:flex-row gap-5 max-w-2xl lg:max-w-7xl">
                    <div className={`order-2 mb-6 flex lg:flex-col px-3 gap-1.5 lg:w-[180px] flex-wrap md:flex-nowrap`}>
                        <>
                            {/* thumbnails de las imagenes*/}
                            {
                                post.post_image.slice(0, limit).map((img, i) => (
                                    <div key={i}>
                                        {i !== limit - 1 ?
                                            <div className={`rounded-md max-w-[${minHeightWidthCards}px] min-w-[${minHeightWidthCards}px] md:min-w-[${minHeightWidthCards}px] min-h-[${minHeightWidthCards}px]`}>
                                                <img src={`/${img.url}`} alt={"imagen " + i} className={`rounded-lg object-cover cursor-pointer w-[60px] p-0.5 h-[60px] max-h-[60px] max-w-[60px] ${indexImg === i ? 'border border-blue-400' : ''}`} onMouseEnter={() => { showImg(i) }} onClick={openSlide} />
                                            </div> :
                                            <div className={`relative rounded-md max-w-[${minHeightWidthCards}px] min-w-[${minHeightWidthCards}px] md:min-w-[${minHeightWidthCards}px] min-h-[${minHeightWidthCards}px]`}>
                                                <div className="absolute bg-white/50 w-full h-full text-gray-800 text-xl flex items-center justify-center font-[500] rounded-lg cursor-pointer" onMouseEnter={() => { showImg(i) }} onClick={openSlide}>
                                                    +{(post.post_image.length - 1) - i}
                                                </div>
                                                <img src={`/${img.url}`} alt={"imagen " + i} className={`rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform w-[60px] p-0.5 h-[60px] max-h-[60px] max-w-[60px] ${indexImg === i ? 'border border-blue-400' : ''}`} onMouseEnter={() => { showImg(i) }} />
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </>
                    </div>
                    <div className="order-1 lg:order-2 xl:flex justify-center">
                        <div className="mx-3 mb-8 flex justify-center">
                            {/* esto es la imagen principal (la que está siendo mostrada en grande) */}
                            <img src={`/${post.post_image[indexImg].url}`} alt={`imagen ${indexImg}`} className="max-w-[90vw] min-h-[300px] max-h-[300px] md:min-w-[700px] md:min-h-[700px] md:max-h-[700px] md:max-w-[700px] object-contain cursor-pointer" onClick={openSlide} />
                        </div>
                        <div className='xl:w-[33%] space-y-2 md:mt-3 mx-3 lg:mx-6 md:flex flex-col gap-5'>
                            {
                                isPostFinalized &&
                                <p className="text-white p-2 text-sm md:text-lg text-center bg-gradient-to-r from-red-700/80 to-red-600/80 p-3 rounded-md shadow-md tracking-wide">Publicación finalizada</p>
                            }
                            <h2 className="text-2xl font-bold mb-8">{post.car_model.car_brand.name} {post.car_model.name} {post.version}</h2>
                            <div>
                                <CarPostData title="Año" data={`${post.anio}`} />
                                <CarPostData title="Kilometraje" data={`${handleDots(post.kilometraje.toString())} km`} />
                                <CarPostData title="Precio" data={`${post.id_currency == 1 ? (priceBtnActive ? `$ ${handleDots(ARSPrice.toFixed(0))}` : `U$S ${handleDots(USDPrice.toFixed(0))}`) : (priceBtnActive ? `U$S ${handleDots(USDPrice.toFixed(0))}` : `$ ${handleDots(ARSPrice.toFixed(0))}`)}`} />
                            </div>
                            <div className="">
                                <button className={`bg-cover bg-center bg-no-repeat rounded-lg text-black cursor-pointer transition-background shadow-md hover:shadow-gray-400 duration-300 text-center font-[700] ${post.id_currency == 1 ? (priceBtnActive ? 'bg-[url("/public/img/billete-100-dolares.webp")]' : 'bg-[url("/public/img/billete-1000-pesos.webp")]') : (priceBtnActive ? 'bg-[url("/public/img/billete-1000-pesos.webp")]' : 'bg-[url("/public/img/billete-100-dolares.webp")]')}`} onClick={convertPrice}> <p className="p-3 bg-white/40 rounded-md">{post.id_currency == 1 ? (priceBtnActive ? 'Convertir a dólares (USD)' : 'Convertir a pesos (ARS)') : (priceBtnActive ? 'Convertir a pesos (ARS)' : 'Convertir a dólares (USD)')}</p></button>
                            </div>
                            <hr className="my-5 lg:hidden" />
                            {
                                user && post.user.id !== user.id && (
                                    cultdown && timeLeft ? (
                                        <DealAlertCard title="Deal rechazado" text="El vendedor rechazó tu solicitud. Podrás iniciar un nuevo Deal cuando expire el período de espera." redBackground >
                                            <div className="flex gap-2 justify-center">
                                                {[{ label: 'Horas', value: timeLeft.hours }, { label: 'Min', value: timeLeft.minutes }, { label: 'Seg', value: timeLeft.seconds }].map(({ label, value }) => (
                                                    <div key={label} className="bg-red-500/10 border border-red-500/25 rounded-lg py-2 px-3 text-center min-w-[56px]">
                                                        <p className="text-red-500 text-xl font-bold tabular-nums m-0 leading-none">
                                                            {String(value).padStart(2, '0')}
                                                        </p>
                                                        <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-1 mb-0">{label}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </DealAlertCard>
                                    ) : !cultdown && !timeLeft && (
                                        <>
                                            {
                                                !dealFinalized ? (
                                                    <form onSubmit={handleDeal}>
                                                        {
                                                            !hasDeals && !dealsLimitReached ?
                                                                <ButtonPrimary type="submit" text="Comenzar Deal" className="!bg-teal-700 hover:!bg-teal-500" />
                                                                : !hasDeals && dealsLimitReached ?
                                                                    <DealAlertCard title="Limite de Deals alcanzado" text="Tenés 5 deals activos con este usuario. Si querés ampliar el límite, finaliza las negociaciones con esta persona." yellowBackground />
                                                                    : hasDeals && myDealStatus !== 1 &&
                                                                    <ButtonPrimary type="submit" text="Cancelar Deal" className="!bg-red-700 hover:!bg-red-500 !border-red-700" />
                                                        }
                                                    </form>
                                                ) : myDealStatus !== 1 && (
                                                    <DealAlertCard title="Deals finalizados" text="Un comprador completó un Deal con el vendedor." yellowBackground />
                                                )
                                            }
                                            {
                                                dealFinalized && hasDeals && myDealStatus === 1 && (
                                                    <DealAlertCard greenBackground title="Deals finalizados" text="Tu Deal se completó con éxito. Contactate con el vendedor para coordinar la entrega del vehiculo." />
                                                )
                                            }
                                            {
                                                // solo puedo consultar si soy un usuario ajeno al post y si no se aceptó ningún Deal.
                                                user.id !== post.user.id && !dealFinalized && (
                                                    <ButtonPrimary onClick={handleRedirect} text="Consultar" className="!bg-cyan-700 hover:!bg-cyan-500" />
                                                )
                                            }
                                        </>
                                    )
                                )
                            }
                            {
                                hasDealsReceived && user && user.id === post.user.id &&
                                <ButtonPrimary onClick={() => router.get(route('deals.index', post.id))} text="Ver deals de este posteo" />
                            }
                            {
                                show && !hasDeals && !cultdown &&
                                <PopUp setShow={setShow} title="Empezar negociación" mensaje="Al confirmar, se creará un nuevo Deal para este auto, y el vendedor recibirá una notificación. ¿Deseas continuar?" deleteButton={false} confirmButtonText="Confirmar" confirmation={setConfirmation} />
                            }
                            {
                                show && hasDeals &&
                                <PopUp setShow={setShow} title="Cancelar negociación" mensaje="Al confirmar, se cancelará el Deal. ¿Deseas continuar?" deleteButton={false} confirmButtonText="Confirmar" confirmation={setConfirmation} />
                            }
                            {
                                showSuccess && <PopUp setShow={setShowSuccess} title="Deal iniciado" mensaje="¡Deal iniciado correctamente! Ahora espera que el vendedor lo confirme." deleteButton={false} />
                            }
                            <div className="flex flex-col gap-2">
                                <p>Usuario: <b>{post.user.name}</b></p>
                                <p>Fecha de publicacion:
                                    <br />
                                    {new Date(post.created_at).toLocaleString('es-AR', {
                                        timeZone: 'America/Argentina/Buenos_Aires',
                                        year: 'numeric', month: '2-digit', day: '2-digit',
                                        hour: '2-digit', minute: '2-digit'
                                    })} (UTC-3)</p>
                            </div>
                            <div className="flex items-center w-full gap-2">
                                <UserAvatar center={false} avatar={post.user.avatar && post.user.avatar || ""} userId={post.user.id} />
                            </div>
                            <hr className="my-5 lg:hidden" />
                        </div>
                    </div>
                    {/* este portal sirve para que, al abrir una imagen del post, el contenedor con fondo color "bg-black/60" esté forzado a mostrarse por encima (eje z, 3D) de cualquier elemento de la página */}
                    {createPortal(
                        <div ref={imgContainerRef} className="hidden fixed inset-0 bg-black/60 flex items-center justify-center w-screen h-screen z-[9999]">
                            <div>
                                {/* esto es la imagen que aparece cuando abro el slider */}
                                <img src={`/${post.post_image[indexImg].url}`} alt="" className={`transition-transform duration-300 max-w-[100vw] max-h-[100vh] md:max-w-[75vw] object-contain`} />
                            </div>
                            <CloseButton onClickEvent={closeSlide} />
                            <div className="absolute top-10 right-25 p-4 bg-black/65">
                                <h6>{indexImg + 1}/{post.post_image.length}</h6>
                            </div>
                            <div onClick={prevSlide} className={`${post.post_image.length == 1 && 'hidden'} absolute left-0 bg-black/30 p-4`}>
                                <svg className="w-6 cursor-pointer fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" />
                                </svg>
                            </div>
                            <div onClick={nextSlide} className={`${post.post_image.length == 1 && 'hidden'} absolute right-0 bg-black/30 p-4`}>
                                <svg className="w-6 cursor-pointer fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" />
                                </svg>
                            </div>
                        </div>,
                        document.body
                    )}
                </div>
                <div className="xl:flex flex-col justify-center gap-10 w-full mt-25 max-w-5xl space-y-4 px-6 md:px-0">
                    <section id="info">
                        <h2 className="text-2xl font-bold">Información general</h2>
                    </section>
                    <div className="w-full bg-[#1c1c1c] border border-[#2e2e2e] rounded-sm overflow-hidden">
                        <p className="text-xs tracking-[0.25em] uppercase text-gray-600 px-4 pt-4 pb-2">Especificaciones</p>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr className="border-b border-[#2e2e2e] hover:bg-[#242424] transition-colors duration-150">
                                    <th className="text-left text-xs tracking-widest uppercase text-gray-500 font-normal px-4 py-3 w-2/5">Marca</th>
                                    <td className="text-left text-sm text-gray-300 font-light px-4 py-3">{post.car_model.car_brand.name}</td>
                                </tr>
                                <tr className="border-b border-[#2e2e2e] hover:bg-[#242424] transition-colors duration-150">
                                    <th className="text-left text-xs tracking-widest uppercase text-gray-500 font-normal px-4 py-3 w-2/5">Modelo</th>
                                    <td className="text-left text-sm text-gray-300 font-light px-4 py-3">{post.car_model.name}</td>
                                </tr>
                                <tr className="border-b border-[#2e2e2e] hover:bg-[#242424] transition-colors duration-150">
                                    <th className="text-left text-xs tracking-widest uppercase text-gray-500 font-normal px-4 py-3 w-2/5">Año</th>
                                    <td className="text-left text-sm text-gray-300 font-light px-4 py-3">{post.anio}</td>
                                </tr>
                                <tr className="border-b border-[#2e2e2e] hover:bg-[#242424] transition-colors duration-150">
                                    <th className="text-left text-xs tracking-widest uppercase text-gray-500 font-normal px-4 py-3 w-2/5">Versión</th>
                                    <td className="text-left text-sm text-gray-300 font-light px-4 py-3">{post.version}</td>
                                </tr>
                                <tr className="border-b border-[#2e2e2e] hover:bg-[#242424] transition-colors duration-150">
                                    <th className="text-left text-xs tracking-widest uppercase text-gray-500 font-normal px-4 py-3 w-2/5">Tipo de carrocería</th>
                                    <td className="text-left text-sm text-gray-300 font-light px-4 py-3">{post.vehicle_body.name}</td>
                                </tr>
                                <tr className="border-b border-[#2e2e2e] hover:bg-[#242424] transition-colors duration-150">
                                    <th className="text-left text-xs tracking-widest uppercase text-gray-500 font-normal px-4 py-3 w-2/5">Kilometraje</th>
                                    <td className="text-left text-sm text-gray-300 font-light px-4 py-3">{handleDots(String(post.kilometraje))} km</td>
                                </tr>
                                <tr className="hover:bg-[#242424] transition-colors duration-150">
                                    <th className="text-left text-xs tracking-widest uppercase text-gray-500 font-normal px-4 py-3 w-2/5">Ubicación</th>
                                    <td className="text-left text-sm text-gray-300 font-light px-4 py-3">{post.municipio.nombre}, {post.municipio.provincia.nombre}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 border rounded-md p-4">
                        <p className="mb-2"><strong>Descripción:</strong></p>
                        <p>{post.descripcion}</p>
                    </div>
                </div>
                {
                    user ? <div className="w-[50%] flex flex-col lg:flex-row gap-4 items-center justify-center">
                        {
                            user.id === post.user.id ? <Link href={`/posts/${post.id}/edit`} className="p-3 bg-gray-800 rounded-lg hover:bg-blue-600 hover:text-gray-200 cursor-pointer transition-colors duration-300 w-full lg:w-[40%] text-center font-[500]">Editar publicación</Link> : ''
                        }
                    </div> :
                        <div>
                            <p>Para consultar sobre este vehículo, debes {' '}
                                <Link href={route('auth.login')} className="text-blue-500 hover:underline">iniciar sesión.</Link>
                            </p>
                        </div>
                }
            </div>
        }
    </AppFront>
}