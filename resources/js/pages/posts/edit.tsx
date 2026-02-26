import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditProps, Municipio } from "@/types/automovil";
import { Select } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import React, { useEffect, useState } from "react";
import { type Images } from '@/types/automovil';

export default function edit({ carBrands, postData, loguedUser, car_types, currencies, provincias }: EditProps) {
    const [newImg, setNewImg] = useState<File[]>([]);
    const [deletedImg, setDeletedImg] = useState<Number[]>([]); // solo para enviar los id's de las imagenes EXISTENTES que se deseen eliminar
    const [provinciaId, setProvinciaId] = useState<number | ''>(postData.municipio.provincia.id);
    const [municipiosState, setMunicipiosState] = useState<Municipio[]>([]);
    const [municipioId, setMunicipioId] = useState<number | ''>('');
    const [existingImg, setExistingImg] = useState<Images[]>(postData.post_image)
    const { data, setData, put, processing, errors, delete: destroy } = useForm({
        marca: postData.car.car_model.car_brand.id,
        modelo: postData.car.car_model.modelo,
        anio: postData.car.anio,
        kilometraje: postData.car.kilometraje,
        precio: postData.precio.toString().replace(/\D/g, ""),
        descripcion: postData.descripcion,
        tipo: postData.car.id_type,
        provincia: postData.municipio.provincia.id,
        municipio: postData.municipio.id,
        moneda: postData.id_currency,
        images: [] as File[],
        deleted_images: [] as number[],
    })
    const altProvinciaMunicipio = () => {
        if (!provinciaId) { // si no elijo ninguna, dejo los estados vacíos.
            setMunicipiosState([]);
            setMunicipioId('');
            return;
        }
        //  Si elijo una, hago la petición.
        fetch(`/api/municipios/${provinciaId}`)
            .then(res => res.json())
            .then(data => {
                setMunicipiosState(data);
                setMunicipioId('');
            });
    }
    const handlePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        setData('precio', raw)
    }
    const handleProvincia = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('provincia', Number(e.target.value));
        setProvinciaId(Number(e.target.value));
    }
    const handleMunicipio = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('municipio', Number(e.target.value));
        setMunicipioId(Number(e.target.value));
    }
    // funcion para agregar más imagenes al post (tambien para mostrar las que se van a agregar)
    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return; // si no hay archivos, salgo

        const files = Array.from(e.target.files);// convierto en array la imagen que se agrega
        setNewImg(prev => [ // arrow func
            ...prev, // copio las imagenes anteriores (ya cargadas)
            ...files, // copio las imagenes nuevas
        ]); // agrego las imagenes al hook para mostrar las nuevas imagenes que agrega el usuario
        setData('images', [...data.images, ...files]);
        //...data.images: imagenes ya seteadas (en caso de haber)
        //...files: imagenes entrantes (nuevas)
        // seteo las imagenes para enviarlas al backend
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('posts.update', postData.id), {
            forceFormData: true,
        });
    }
    const removeExistingImage = (id: number) => {
        confirm('¿Estás seguro que quieres eliminar esta imagen?') ?
            setExistingImg(prev => // arrow func, con las imagenes ya existentes
                prev.filter(img => img.id !== id)
                // recorro y filtro las imagenes existentes, eliminando la imagen cuyo ID coincide con el ID clickeado. si el id de una imagen coincide con el de la imagen que clickee, esa se elimina. 
            ) : '';
        setDeletedImg(prev => [...prev, id]);
        setData('deleted_images', [...data.deleted_images, id]);
    };
    const removeNewImage = (index: number) => {
        if (confirm('¿Estás seguro que quieres eliminar esta imagen?')) {
            setNewImg(prev =>
                prev.filter((_, i) => i !== index) // recorro las imagenes nuevas (si es que hay) y filtro:
                // elimino la imagen cuya posición (índice) coincide con la que clickeé.
                // el parámetro "_" es un parámetro que no se usa, por eso contiene ese caracter.
            )
            setData('images', data.images.filter((_, i) => i !== index));
        }
    }
    const handleDelete = (id: number) => {
        confirm('¿Seguro que quieres eliminar este post? La acción será irreversible.') ?
            destroy(route('posts.destroy', id)) : '';
    }
    useEffect(() => {
        altProvinciaMunicipio();
    }, [provinciaId]);
    return <>
        <section className="flex flex-col my-20 items-center justify-center">
            {
                loguedUser.id === postData.user.id ?
                    <>
                        <div>
                            <h2 className="text-2xl text-center">Editar publicación</h2>
                        </div>
                        <form action="" onSubmit={handleSubmit} className="grid lg:grid-cols-2 items-center justify-center gap-8 lg:gap-4 my-5 lg:my-0 mx-3">
                            <div className="mt-5 flex flex-col gap-2">
                                {
                                    errors.marca && (
                                        <p className='text-red-500 font-[500] text-sm'>{errors.marca}</p>
                                    )
                                }
                                <Label htmlFor="marca">Marca:</Label>
                                <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" value={data.marca} id="marca" onChange={e => setData('marca', Number(e.target.value))} >
                                    <option value="" disabled>Selecciona la marca del vehiculo</option>
                                    {carBrands.map(brand => (
                                        <option key={brand.id} value={brand.id}>{brand.marca}</option>
                                    ))}
                                </Select>
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                {
                                    errors.modelo && (
                                        <p className='text-red-500 font-[500] text-sm'>{errors.modelo}</p>
                                    )
                                }
                                <Label htmlFor="modelo">Modelo:</Label>
                                <Input type="text" className="outline-none rounded-lg w-full max-w-[400px] focus:bg-slate-700 transition-colors duration-300" value={data.modelo} placeholder="Ej: Fiesta ST, Mustang GT 5.0, MX-5" id="modelo" onChange={e => setData('modelo', e.target.value)} />
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                {
                                    errors.anio && (
                                        <p className='text-red-500 font-[500] text-sm'>{errors.anio}</p>
                                    )
                                }
                                <Label htmlFor="anio">Año:</Label>
                                <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" name="anio" id="anio" value={data.anio} onChange={e => setData('anio', Number(e.target.value))}>
                                    <option value="" disabled>Selecciona el año</option>
                                    {
                                        Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => 1900 + i).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                {
                                    errors.kilometraje && (
                                        <p className='text-red-500 font-[500] text-sm'>{errors.kilometraje}</p>
                                    )
                                }
                                <Label htmlFor="kilometraje">Kilometraje:</Label>
                                <Input type="number" value={data.kilometraje} className="outline-none rounded-lg w-full max-w-[400px] focus:bg-slate-700 transition-colors duration-300" id="kilometraje" onChange={e => setData('kilometraje', Number(e.target.value))} />
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                {
                                    errors.precio && (
                                        <p className='text-red-500 font-[500] text-sm'>{errors.precio}</p>
                                    )
                                }
                                <Label htmlFor="precio">Precio:</Label>
                                <Input type="text" value={Number(data.precio).toLocaleString("es-AR")} className="outline-none rounded-lg w-full max-w-[400px] focus:bg-slate-700 transition-colors duration-300" id="precio" maxLength={15} onChange={handlePrecio} />
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                {
                                    errors.moneda && (
                                        <p className='text-red-500 font-[500] text-sm'>{errors.moneda}</p>
                                    )
                                }
                                <Label htmlFor="moneda">Moneda:</Label>
                                <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" name="moneda" id="moneda" value={data.moneda} onChange={e => setData('moneda', Number(e.target.value))}>
                                    <option value="" disabled>Selecciona la moneda</option>
                                    {
                                        currencies.map(currency => (
                                            <option key={currency.id} value={currency.id}>{currency.nombre}</option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                {
                                    errors.descripcion && (
                                        <p className='text-red-500 font-[500] text-sm'>{errors.descripcion}</p>
                                    )
                                }
                                <Label htmlFor="descripcion">Descripción:</Label>
                                <textarea className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" id="descripcion" value={data.descripcion} onChange={e => setData('descripcion', e.target.value)} />
                            </div>
                            <div className="mt-5 flex flex-col gap-4">
                                {
                                    errors.provincia && (
                                        <p className='text-red-500 font-[500] text-sm'>{errors.provincia}</p>
                                    )
                                }
                                <Label htmlFor="provincia">Provincia:</Label>
                                <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" value={data.provincia} id="provincia" onChange={handleProvincia}>
                                    <option value="" disabled>Selecciona una provincia</option>
                                    {provincias.map(provincia => (
                                        // si elijo una provincia, los municipios que saldrán serán solo los de esa provincia. hay que compararlos por id_provincia
                                        <option key={provincia.id} disabled={provincia.id === 78 || provincia.id === 86} value={provincia.id}>{provincia.nombre}</option>
                                    ))}
                                </Select>
                                <div className="mt-5">
                                    {
                                        provinciaId && (
                                            <div className="flex flex-col gap-4">
                                                {
                                                    errors.municipio &&
                                                    <p className='text-red-500 font-[500] text-sm'>{errors.provincia}</p>
                                                }
                                                <Label htmlFor="municipio">Municipio:</Label>
                                                <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" value={data.municipio} id="municipio" name="municipio" onChange={handleMunicipio}>
                                                    <option value="" disabled>Selecciona un municipio</option>
                                                    {municipiosState.map(municipio => (
                                                        <option key={municipio.id} value={municipio.id}>{municipio.nombre}</option>
                                                    ))}
                                                </Select>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                {
                                    errors.tipo && (
                                        <p className='text-red-500 font-[500] text-sm'>{errors.tipo}</p>
                                    )
                                }
                                <Label htmlFor="tipo">Tipo de vehiculo:</Label>
                                <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" value={data.tipo} id="tipo" onChange={e => setData('tipo', Number(e.target.value))} >
                                    <option value="" disabled>Selecciona el tipo de vehículo</option>
                                    {
                                        car_types ? car_types.map(tipo => (
                                            <option value={tipo.id} key={tipo.id}>{tipo.tipo}</option>
                                        )) : ''
                                    }
                                </Select>
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                {
                                    errors.images && (
                                        <p className='text-red-500 font-[500] text-sm'>{errors.images}</p>
                                    )
                                }
                                <Label htmlFor="tipo">Imagen/es del vehiculo</Label>
                                <input className="p-3 bg-slate-700" type="file" accept="image/*" multiple onChange={handleImages} />
                                <h4>Imagenes actuales del post</h4>
                                <div className={existingImg.length !== 0 ? `grid grid-cols-4 gap-4 max-w-[550px]` : ''}>
                                    {
                                        existingImg.length != 0 ?
                                            existingImg.map(img => (
                                                <div
                                                    key={img.id}
                                                    onClick={() => removeExistingImage(img.id)}
                                                    className="relative cursor-pointer"
                                                >
                                                    <img
                                                        src={`/storage/${img.url}`}
                                                        className="w-full h-32 object-cover rounded"
                                                    />

                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm opacity-0 hover:opacity-100 transition">
                                                        Eliminar
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            <p>No hay imagenes en este post</p>
                                    }
                                </div>
                                <h4>Imagenes nuevas: </h4>
                                <div className={newImg.length !== 0 ? `grid grid-cols-4 gap-4 max-w-[550px]` : ''}>
                                    {
                                        newImg.length != 0 ? newImg.map((file, index) => (
                                            <div
                                                key={index}
                                                onClick={() => removeNewImage(index)}
                                                className="relative cursor-pointer"
                                            >
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    className="w-full h-32 object-cover rounded"
                                                />

                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm opacity-0 hover:opacity-100 transition">
                                                    Eliminar
                                                </div>
                                            </div>
                                        ))
                                            : <p>No hay imagenes agregadas</p>
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link href={route('posts.index')} className="w-full cursor-pointer transition-colors duration-300 p-2 text-center bg-slate-700 rounded-lg hover:bg-slate-800">Salir sin guardar</Link>
                                <Button disabled={processing} type="submit" className="w-full cursor-pointer transition-colors duration-300">Enviar</Button>
                                <Button disabled={processing} onClick={() => handleDelete(postData.id)} type="submit" className="w-full bg-red-500 text-gray-200 hover:text-gray-800 hover:bg-red-800 transition-colors duration-300 cursor-pointer">Eliminar publicación</Button>
                            </div>
                        </form>
                    </>
                    :
                    <div>
                        <p>Esta publicación no te pertenece, por lo que no podés editarlo.</p>
                    </div>
            }
        </section >
    </>;
}