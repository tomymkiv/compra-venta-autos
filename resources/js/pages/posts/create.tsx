import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateProps } from "@/types/automovil"
import { Select } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { route } from 'ziggy-js'
import { type CreatePostForm } from '@/types/automovil';
import AppFront from "@/AppFront";

export default function create({ carBrands, loguedUser }: CreateProps) {
    const [newImg, setNewImg] = useState<File[]>([]);
    const { data, setData, post, processing, errors } = useForm<CreatePostForm>({
        marca: '',
        modelo: '',
        anio: '',
        kilometraje: '',
        precio: '',
        descripcion: '',
        tipo: '',
        ubicacion: '',
        images: [] as File[],
    })
    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        // si no hay archivos seleccionados, salgo de la función

        const files = Array.from(e.target.files);
        // convierte el FileList (e.target.files) en un Array<File>
        // esto permite usar spread, map, filter, etc.
        setNewImg(prev => [ // arrow func
            ...prev, // copio las imagenes anteriores (ya cargadas)
            ...files, // copio las imagenes nuevas
        ]); // agrego las imagenes al hook para mostrar las nuevas imagenes que agrega el usuario
        setData('images', [...data.images, ...files]);
        // seteo las imagenes y agrego:
        // ...data.images: imagenes que ya estaban cargadas
        // ...files: imagenes que voy nuevas que agrega el usuario
        // copio las imágenes que ya estaban en el estado (...prev)
        // y agrego las nuevas imágenes seleccionadas (...files)
        // el spread operator (...) se usa para clonar los arrays
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('posts.store'), {
            forceFormData: true, // fuerzo un "formData", para que me tome todos los archivos (imagenes)
        });
        // “Tomo todos los datos + las imágenes, los convierto en FormData y los mando por POST”
    }
    const removeNewImage = (index: number) => {
        if (confirm('¿Estás seguro que quieres eliminar esta imagen?')) {
            setNewImg(prev =>
                prev.filter((_, i) => i !== index) // recorro las imagenes nuevas (si es que hay) y filtro:
                // elimino la imagen cuya posición (índice) coincide con la que clickeé.
                // el parámetro "_" es un parámetro que no se usa, por eso contiene ese caracter.
            );
            setData('images', data.images.filter((_, i) => i !== index));
        }
    }
    return <AppFront loguedUser={loguedUser}>
        <section className="flex flex-col">
            <div>
                <h2 className="text-2xl text-center">Crear publicación</h2>
            </div>
            <form action="" onSubmit={handleSubmit} className="grid grid-cols-2 items-center justify-center gap-4 my-5 mx-3">
                <div className="mt-5 flex flex-col gap-2">
                    {
                        errors.marca && (
                            <p className='text-red-500 font-[500] text-sm'>{errors.marca}</p>
                        )
                    }
                    <Label htmlFor="marca">Marca:</Label>
                    <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" value={data.marca} id="marca" onChange={e => setData('marca', Number(e.target.value))}>
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
                    <Input type="number" className="outline-none rounded-lg w-full max-w-[400px] focus:bg-slate-700 transition-colors duration-300" placeholder="Ej: 1992, 1995, 2002" value={data.anio} id="anio" onChange={e => setData('anio', Number(e.target.value))} />
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
                    <Input type="number" value={data.precio} className="outline-none rounded-lg w-full max-w-[400px] focus:bg-slate-700 transition-colors duration-300" id="precio" onChange={e => setData('precio', Number(e.target.value))} />
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
                <div className="mt-5 flex flex-col gap-2">
                    {
                        errors.ubicacion && (
                            <p className='text-red-500 font-[500] text-sm'>{errors.ubicacion}</p>
                        )
                    }
                    <Label htmlFor="ubicacion">Ubicación:</Label>
                    <Input type="text" value={data.ubicacion} className="outline-none rounded-lg w-full max-w-[400px] focus:bg-slate-700 transition-colors duration-300" id="ubicacion" onChange={e => setData('ubicacion', e.target.value)} />
                </div>
                <div className="mt-5 flex flex-col gap-2">
                    {
                        errors.tipo && (
                            <p className='text-red-500 font-[500] text-sm'>{errors.tipo}</p>
                        )
                    }
                    <Label htmlFor="tipo">Tipo de vehiculo:</Label>
                    <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" value={data.tipo} id="tipo" onChange={e => setData('tipo', e.target.value)} >
                        <option value="" disabled>Selecciona el tipo de vehículo</option>
                        <option value="auto">Auto</option>
                        <option value="camioneta">Camioneta/Camión</option>
                        <option value="moto">Moto</option>
                    </Select>
                </div>
                <div className="mt-5 flex flex-col gap-2">
                    {
                        errors.images && (
                            <p className='text-red-500 font-[500] text-sm'>{errors.images}</p>
                        )
                    }
                    <Label htmlFor="tipo">Imagen/es del vehiculo</Label>
                    <div className="mt-5 flex flex-col gap-2">
                        {
                            errors.images && (
                                <p className='text-red-500 font-[500] text-sm'>{errors.images}</p>
                            )
                        }
                        <input className="p-3 bg-slate-700" type="file" accept="image/*" multiple onChange={handleImages} />
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
                </div>
                <div>
                    <Button disabled={processing} type="submit">Enviar</Button>
                </div>
            </form>
        </section>
    </AppFront>;
}