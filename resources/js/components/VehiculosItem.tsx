import React, { useEffect, useRef, useState } from "react";
import { CarCardsProps } from "@/types/automovil";
import AppFront from "@/AppFront";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function VehiculosItem({ post, loguedUser }: CarCardsProps) {
    const blueDolarUrl = 'https://api.bluelytics.com.ar/v2/latest';
    const [USDPrice, setUSDPrice] = useState(post.precio);
    const [ARSPrice, setARSPrice] = useState(post.precio);
    const [priceBtnActive, setPriceBtnActive] = useState(false);
    const limit = 6;
    const minHeightWidthCards = 60;
    const imgContainerRef = useRef<HTMLDivElement>(null);
    const [indexImg, setIndexImg] = useState(0); // contador para saber por cuál imagen estoy
    const [slide, setSlide] = useState(false); // verifico si el slide fue abierto o no
    const [translateX, setTranslateX] = useState(0);

    const handleDots = (precio: string) => {
        const raw = precio.replace(/\D/g, "");
        return raw ? Number(raw).toLocaleString("es-AR") : "";
    }

    const openSlide = () => {
        setSlide(true);
        document.body.classList.toggle('overflow-hidden')
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
        document.body.classList.toggle('overflow-hidden')
        imgContainerRef.current?.classList.add('hidden')
    }
    const convertUSDPrice = () => {
        !priceBtnActive ? setPriceBtnActive(true) : setPriceBtnActive(false);

        fetch(blueDolarUrl)
            .then(data => data.json())
            .then(data => {
                const blueDolarValue = data.blue.value_avg;

                if (post.id_currency == 1) {
                    const USD_TO_ARS = blueDolarValue * post.precio;
                    setARSPrice(USD_TO_ARS);
                } else if (post.id_currency == 2) {
                    const ARS_TO_USD = Number(post.precio) / blueDolarValue;
                    setUSDPrice(ARS_TO_USD);
                }
            })
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

    // slider para mobile
    let startX = 0;

    const onTouchStart = (e: React.TouchEvent) => {
        startX = e.touches[0].clientX; // posicion de inicio en x
    }
    const onTouchMove = (e: React.TouchEvent) => {
        const currentX = e.touches[0].clientX; // posicion actual en x
        // startX > currentX, siguiente slide
        // startX < currentX, anterior slide
        setTranslateX(currentX - startX); // realizo el movimiento entre imagenes
    }
    const onTouchEnd = () => {
        const threshold = 50; // minimo de pixeles que debo mover para pasar a la siguiente imagen

        if (translateX > threshold) {
            prevSlide();
        } else if (translateX < -threshold) {
            nextSlide();
        }

        setTranslateX(0);
    }
    return <AppFront loguedUser={loguedUser}>
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
                            <img src={`/${post.post_image[indexImg].url}`} alt="" className="max-w-[90vw] md:min-w-[700px] md:min-h-[700px] md:max-h-[700px] md:max-w-[700px] object-contain cursor-pointer" onClick={openSlide} />
                        </div>
                        <div className='xl:w-[33%] space-y-2 md:mt-3 mx-3 lg:mx-6 md:flex flex-col gap-5'>
                            <div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">{post.car.car_model.car_brand.marca} {post.car.car_model.modelo}</h2>
                                <p className="text-md md:text-lg lg:text-xl"><b>Año:</b> {post.car.anio}</p>
                                <p className="text-md md:text-lg lg:text-xl"><b>Kilometraje:</b> {handleDots(post.car.kilometraje.toString())} km</p>
                                <p className="text-md md:text-lg lg:text-xl"><b>Precio: </b>
                                    {post.id_currency == 1 ? (priceBtnActive ? `$ ${handleDots(ARSPrice.toFixed(0))}` : `U$S ${handleDots(USDPrice.toFixed(0))}`) : (priceBtnActive ? `U$S ${handleDots(USDPrice.toFixed(0))}` : `$ ${handleDots(ARSPrice.toFixed(0))}`)}
                                </p>
                                <p className="text-md md:text-lg lg:text-xl"><b>Ubicación:</b> {post.municipio.nombre}, {post.municipio.provincia.nombre}</p>
                            </div>
                            <div>
                                <p className="text-md"><b>Descripción:</b> {post.descripcion}</p>
                            </div>
                            <div className="">
                                <button className={`bg-cover bg-center bg-no-repeat rounded-lg text-black cursor-pointer transition-background shadow-md hover:shadow-gray-400 duration-300 text-center font-[700] ${post.id_currency == 1 ? (priceBtnActive ? 'bg-[url("/public/img/billete-100-dolares.webp")]' : 'bg-[url("/public/img/billete-1000-pesos.webp")]') : (priceBtnActive ? 'bg-[url("/public/img/billete-1000-pesos.webp")]' : 'bg-[url("/public/img/billete-100-dolares.webp")]')}`} onClick={convertUSDPrice}> <p className="p-3 bg-white/40 rounded-md">{post.id_currency == 1 ? (priceBtnActive ? 'Convertir a dólares (USD)' : 'Convertir a pesos (ARS)') : (priceBtnActive ? 'Convertir a pesos (ARS)' : 'Convertir a dólares (USD)')}</p></button>
                            </div>
                            <hr className="my-5 lg:hidden" />
                        </div>
                    </div>
                    <div ref={imgContainerRef} className="hidden fixed inset-0 bg-black/60 flex items-center justify-center w-screen h-screen z-50">
                        <div>
                            {/* esto es la imagen que aparece cuando abro el slider */}
                            <img src={`/${post.post_image[indexImg].url}`} alt="" className={`transition-transform duration-300 max-w-[100vw] max-h-[100vh] md:max-w-[75vw] object-contain`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove}
                                style={{
                                    transform: `translateX(${translateX}px)`
                                }}
                            />
                        </div>
                        <div onClick={closeSlide} className="absolute cursor-pointer top-10 right-10 bg-red-500/70 p-2">
                            <svg className="fill-gray-200 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z" />
                            </svg>
                        </div>
                        <div className="absolute top-10 right-25 p-4 bg-black/65">
                            <h6>{indexImg + 1}/{post.post_image.length}</h6>
                        </div>
                        <div onClick={prevSlide} className={`${post.post_image.length == 1 ? 'hidden' : 'hidden md:block'} absolute left-0 bg-black/60`}>
                            <svg className="w-12 cursor-pointer fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" />
                            </svg>
                        </div>
                        <div onClick={nextSlide} className={`${post.post_image.length == 1 ? 'hidden' : 'hidden md:block'} absolute right-0 bg-black/60`}>
                            <svg className="w-12 cursor-pointer fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" />
                            </svg>
                        </div>
                    </div>
                </div>
                {
                    loguedUser ? <div className="w-[50%] flex flex-col lg:flex-row gap-4 items-center justify-center">
                        <a href={`https://wa.me/541123124430?text=Hola, ¿como te va?. Me interesa saber más información acerca del vehiculo ${post.car.car_model.car_brand.marca} ${post.car.car_model.modelo} ${post.car.anio}`} target="_blank" className="p-3 bg-gray-800 rounded-lg hover:bg-gray-300 hover:text-gray-700 cursor-pointer transition-colors duration-300 w-[90vw] sm:w-[50%] lg:w-[40%] text-center font-[500]">Consultar</a>
                        {
                            loguedUser?.id === post.user.id ? <Link href={`/posts/${post.id}/edit`} className="p-3 bg-gray-800 rounded-lg hover:bg-blue-600 hover:text-gray-200 cursor-pointer transition-colors duration-300 w-[90vw] sm:w-[50%] lg:w-[40%] text-center font-[500]">Editar publicación</Link> : ''
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