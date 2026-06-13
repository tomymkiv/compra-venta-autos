import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditProps, Municipio } from "@/types/types";
import { Select } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Link, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import React, { useState } from "react";
import { type Images } from '@/types/types';
import AppFront from "@/AppFront";
import { User } from "@/types";
import useProvinciaMunicipio from "@/hooks/useProvinciaMunicipio";
import FormFieldFile from "@/components/FormFieldFile";
import FormFieldFiles from "@/components/FormFieldFiles";
import FormFieldSelect from "@/components/FormFieldSelect";
import FormFieldTextarea from "@/components/FormFieldTextarea";
import FormFieldInput from "@/components/FormFieldInput";

type EditForm = {
    marca: number;
    modelo: string;
    anio: number;
    kilometraje: number;
    precio: string;
    descripcion: string;
    tipo: number;
    provincia: number;
    municipio: number;
    moneda: number;
    images: File[];
    deleted_images: number[];
    main_image: File | Images | null;
};

export default function edit({ carBrands, postData, car_types, currencies, provincias }: EditProps) {
    const { user: UserProps } = usePage().props;
    const user = UserProps as User;
    const [mainImage, setMainImage] = useState<File | Images | undefined>(postData.main_image);
    const [newImg, setNewImg] = useState<File[]>([]);
    const [_DeletedImg, setDeletedImg] = useState<number[]>([]); // solo para enviar los id's de las imagenes EXISTENTES que se deseen eliminar
    const { provinciaId, setProvinciaId, municipioId, setMunicipioId, municipiosState } = useProvinciaMunicipio();
    const [existingImg, setExistingImg] = useState<Images[]>(postData.post_image)
    const { data, setData, patch, processing, errors, delete: destroy } = useForm<EditForm>({
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
        main_image: postData.main_image
    })

    const handlePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        setData('precio', raw)
    }
    const handleProvincia = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProvinciaId(Number(e.target.value));
        setData('provincia', Number(e.target.value)); // esta línea es específica de cada página, queda acá
    }
    const handleMunicipio = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMunicipioId(Number(e.target.value));
        setData('municipio', Number(e.target.value)); // esta línea es específica de cada página, queda acá
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
    const removeExistingImage = (id: number) => {
        if (existingImg.length > 1) {
            confirm('¿Estás seguro que quieres eliminar esta imagen?') &&
                setExistingImg(prev => // arrow func, con las imagenes ya existentes
                    prev.filter(img => img.id !== id)
                    // recorro y filtro las imagenes existentes, eliminando la imagen cuyo ID coincide con el ID clickeado. si el id de una imagen coincide con el de la imagen que clickee, esa se elimina. 
                );
            setDeletedImg(prev => [...prev, id]);
            setData('deleted_images', [...data.deleted_images, id]);
        } else {
            alert("Debes dejar al menos una imagen");
        }
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
    const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        setMainImage(file);
        setData('main_image', file);
    }
    const removeMainImage = () => {
        if (confirm('¿Estás seguro que quieres eliminar esta imagen?')) {
            setData('main_image', null);
            setMainImage(undefined);
        }
    }
    // eliminar post
    const handleDelete = (id: number) => {
        confirm('¿Seguro que quieres eliminar este post? La acción será irreversible.') ?
            destroy(route('posts.destroy', id)) : '';
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('posts.update', postData.id), {
            forceFormData: true,
        });
    }

    return <AppFront>
        <section className="flex flex-col min-w-0">
            {
                user.id === postData.user.id ?
                    <div className="flex flex-col my-20 items-center justify-center  min-w-0">
                        <div>
                            <h2 className="text-2xl text-center">Editar publicación</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:grid grid-cols-2 sm:items-start sm:justify-center gap-4 my-5 mx-3 w-full">
                            {/* marcas */}
                            <FormFieldSelect options={carBrands.map(brand => ({ id: brand.id, nombre: brand.marca }))} titulo="Marca" errorsText={errors.marca} value={data.marca} onChangeEventSelect={e => setData('marca', Number(e.target.value))} />
                            {/* modelos */}
                            <FormFieldInput type="text" titulo="Modelo" placeholder="Ej: Fiesta ST, Mustang GT 5.0, MX-5" errorsText={errors.modelo} value={data.modelo} onChangeEventInput={e => setData('modelo', e.target.value)} />
                            {/* años */}
                            <FormFieldSelect options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({ id: 1900 + i, nombre: 1900 + i }))} titulo="Año" errorsText={errors.anio} value={data.anio} onChangeEventSelect={e => setData('anio', Number(e.target.value))} />
                            {/* kilometraje */}
                            <FormFieldInput type="number" titulo="Kilometraje" placeholder="Ej: 100000" errorsText={errors.kilometraje} value={data.kilometraje} onChangeEventInput={e => setData('kilometraje', Number(e.target.value))} />
                            {/* precio */}
                            <FormFieldInput type="text" max={15} titulo="Precio" errorsText={errors.precio} value={data.precio} onChangeEventInput={handlePrecio} />
                            {/* moneda */}
                            <FormFieldSelect options={currencies.map(currency => ({ id: currency.id, nombre: currency.nombre }))} titulo="Moneda" errorsText={errors.moneda} value={data.moneda} onChangeEventSelect={e => setData('moneda', Number(e.target.value))} />
                            {/* descripción */}
                            <FormFieldTextarea titulo="Descripción" errorsText={errors.descripcion} value={data.descripcion} onChangeEventTextarea={e => setData('descripcion', e.target.value)} />
                            {/* provincia */}
                            <FormFieldSelect options={provincias.map(provincia => ({ id: provincia.id, nombre: provincia.nombre }))} titulo="Provincia" errorsText={errors.provincia} value={data.provincia} onChangeEventSelect={handleProvincia} />
                            {/* municipio */}
                            {/* al elegir una provincia, muestro los municipios de esa provincia */}
                            {
                                provinciaId &&
                                <FormFieldSelect options={municipiosState.map(municipio => ({ id: municipio.id, nombre: municipio.nombre }))} titulo="Municipio" errorsText={errors.municipio} value={municipioId} onChangeEventSelect={handleMunicipio} />
                            }
                            {/* tipos de vehiculos */}
                            <FormFieldSelect options={car_types.map(car_type => ({ id: car_type.id, nombre: car_type.tipo }))} titulo="Tipo de vehiculo" errorsText={errors.tipo} value={data.tipo} onChangeEventSelect={e => setData('tipo', Number(e.target.value))} />
                            {/* imagen principal */}
                            <FormFieldFile image={mainImage} errors={errors.main_image} removeImage={removeMainImage} handleImage={handleMainImage} />
                            {/* resto de las imagenes */}
                            <FormFieldFiles editSection={true} errors={errors.images} removeNewImage={removeNewImage} handleImages={handleImages} newImg={newImg} existingImages={existingImg} removeExistingImages={removeExistingImage} />
                            <div className="flex flex-col gap-2">
                                <Link href={route('posts.index')} className="w-full cursor-pointer transition-colors duration-300 p-2 text-center bg-slate-700 rounded-lg hover:bg-slate-800">Salir sin guardar</Link>
                                <Button disabled={processing} type="submit" className="w-full cursor-pointer transition-colors duration-300">Enviar</Button>

                                <Button disabled={processing} onClick={() => handleDelete(postData.id)} type="submit" className="w-full bg-red-500 text-gray-200 hover:text-gray-800 hover:bg-red-800 transition-colors duration-300 cursor-pointer">Eliminar publicación</Button>
                                {/* {
                                    permissions.map((permiso => (
                                        permiso.name === 'DELETE_POST' &&
                                        <Button key={permiso.id} disabled={processing} onClick={() => handleDelete(postData.id)} type="submit" className="w-full bg-red-500 text-gray-200 hover:text-gray-800 hover:bg-red-800 transition-colors duration-300 cursor-pointer">Eliminar publicación</Button>
                                    )))
                                } */}
                            </div>
                        </form>
                    </div>
                    :
                    <div>
                        <p>Esta publicación no te pertenece, por lo que no podés editarlo.</p>
                    </div>
            }
        </section >
    </AppFront>;
}