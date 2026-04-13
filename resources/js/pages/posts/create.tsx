import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateProps, Municipio } from "@/types/types"
import { Select } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { route } from 'ziggy-js'
import { type CreatePostForm } from '@/types/types';
import AppFront from "@/AppFront";

/**
 * las provincias de santa cruz y santiago del estero no funcionan (desde la API vienen vacias, sin municipios)
 * 
 * 
 */
export default function create({ carBrands, loguedUser, car_types, currencies, provincias }: CreateProps) {
    const [newImg, setNewImg] = useState<File[]>([]);
    const [provinciaId, setProvinciaId] = useState<number | ''>('');
    const [municipiosState, setMunicipiosState] = useState<Municipio[]>([]);
    const [municipioId, setMunicipioId] = useState<number | ''>('');
    const [precio, setPrecio] = useState('');
    const { data, setData, post, processing, errors } = useForm<CreatePostForm>({
        marca: '',
        modelo: '',
        anio: '',
        kilometraje: '',
        precio: '',
        moneda: '',
        descripcion: '',
        tipo: '',
        provincia: '',
        municipio: '',
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
    const handleProvincia = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProvinciaId(Number(e.target.value));
        setData('provincia', e.target.value)
    }
    const handleMunicipio = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMunicipioId(Number(e.target.value));
        setData('municipio', e.target.value)
    }

    const handlePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        setPrecio(raw ? Number(raw).toLocaleString("es-AR") : "");
        setData('precio', Number(raw))
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
    useEffect(() => {
        altProvinciaMunicipio()
    }, [provinciaId]);
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
                    <Input type="text" value={precio} className="outline-none rounded-lg w-full max-w-[400px] focus:bg-slate-700 transition-colors duration-300" id="precio" maxLength={15} onChange={handlePrecio} />
                </div>
                <div className="mt-5 flex flex-col gap-2">
                    {
                        errors.moneda && (
                            <p className='text-red-500 font-[500] text-sm'>{errors.moneda}</p>
                        )
                    }
                    <Label htmlFor="moneda">Moneda:</Label>
                    <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" name="moneda" id="moneda" value={data.moneda} onChange={e => setData('moneda', e.target.value)}>
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
                <div className="mt-5 flex flex-col gap-2">
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
                </div>
                {provinciaId && <div className="mt-5 flex flex-col gap-2">
                    {
                        errors.municipio && (
                            <p className='text-red-500 font-[500] text-sm'>{errors.municipio}</p>
                        )
                    }
                    <Label htmlFor="municipio">Municipio:</Label>
                    <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" value={municipioId} id="municipio" name="municipio" onChange={handleMunicipio}>
                        <option value="" disabled>Selecciona un municipio</option>
                        {municipiosState.map(municipio => (
                            // si elijo una provincia, los municipios que saldrán serán solo los de esa provincia. hay que compararlos por id_provincia
                            <option key={municipio.id} value={municipio.id}>{municipio.nombre}</option>
                        ))}
                    </Select>
                </div>
                }
                <div className="mt-5 flex flex-col gap-2">
                    {
                        errors.tipo && (
                            <p className='text-red-500 font-[500] text-sm'>{errors.tipo}</p>
                        )
                    }
                    <Label htmlFor="tipo">Tipo de vehiculo:</Label>
                    <Select className="p-3.5 outline-none rounded-lg w-full max-w-[400px] bg-[#222] transition-colors duration-300" value={data.tipo} id="tipo" onChange={e => setData('tipo', e.target.value)}>
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
                <div className="flex items-center justify-center">
                    <button disabled={processing} type="submit" className="p-3 rounded-md bg-slate-400 text-gray-800 w-full cursor-pointer hover:bg-slate-600 hover:text-gray-200 transition-background duration-300">Enviar</button>
                </div>
            </form>
        </section>
    </AppFront>;
}