import { CreateProps } from "@/types/types"
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { route } from 'ziggy-js'
import { type CreatePostForm } from '@/types/types';
import AppFront from "@/AppFront";
import useProvinciaMunicipio from "@/hooks/useProvinciaMunicipio";
import FormFieldInput from "@/components/FormFieldInput";
import FormFieldSelect from "@/components/FormFieldSelect";
import FormFieldTextarea from "@/components/FormFieldTextarea";
import FormFieldFile from "@/components/FormFieldFile";
import FormFieldFiles from "@/components/FormFieldFiles";

export default function create({ carBrands, car_types, currencies, provincias }: CreateProps) {
    const [newImg, setNewImg] = useState<File[]>([]);
    const [mainImage, setMainImage] = useState<File>();
    const [precio, setPrecio] = useState('');
    const { provinciaId, setProvinciaId, municipioId, setMunicipioId, municipiosState } = useProvinciaMunicipio();
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
        main_image: '' as File | ''
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

    const handleProvincia = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProvinciaId(Number(e.target.value));
        setData('provincia', e.target.value); // esta línea es específica de cada página, queda acá
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
    const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        setMainImage(file);
        setData('main_image', file);
    }
    const removeMainImage = () => {
        if (confirm('¿Estás seguro que quieres eliminar esta imagen?')) {
            setData('main_image', '');
            setMainImage(undefined);
        }
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
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('posts.store'), {
            forceFormData: true, // fuerzo un "formData", para que me tome todos los archivos (imagenes)
        });
    }

    return <AppFront>
        <section className="flex flex-col min-w-0">
            <div>
                <h2 className="text-2xl text-center">Crear publicación</h2>
            </div>
            <form action="" onSubmit={handleSubmit} className="flex flex-col sm:grid grid-cols-2 sm:items-center sm:justify-center gap-4 my-5 mx-3 w-full">
                {/* marcas */}
                <FormFieldSelect options={carBrands.map(brand => ({ id: brand.id, nombre: brand.marca }))} titulo="Marca" errorsText={errors.marca} value={data.marca} onChangeEventSelect={e => setData('marca', Number(e.target.value))} />
                {/* modelos */}
                <FormFieldInput type="text" titulo="Modelo" placeholder="Ej: Fiesta ST, Mustang GT 5.0, MX-5" errorsText={errors.modelo} value={data.modelo} onChangeEventInput={e => setData('modelo', e.target.value)} />
                {/* años */}
                <FormFieldSelect options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({ id: 1900 + i, nombre: 1900 + i }))} titulo="Año" errorsText={errors.anio} value={data.anio} onChangeEventSelect={e => setData('anio', Number(e.target.value))} />
                {/* kilometraje */}
                <FormFieldInput type="number" titulo="Kilometraje" placeholder="Ej: 100000" errorsText={errors.kilometraje} value={data.kilometraje} onChangeEventInput={e => setData('kilometraje', Number(e.target.value))} />
                {/* precio */}
                <FormFieldInput type="text" max={15} titulo="Precio" errorsText={errors.precio} value={precio} onChangeEventInput={handlePrecio} />
                {/* moneda */}
                <FormFieldSelect options={currencies.map(currency => ({ id: currency.id, nombre: currency.nombre }))} titulo="Moneda" errorsText={errors.moneda} value={data.moneda} onChangeEventSelect={e => setData('moneda', e.target.value)} />
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
                <FormFieldSelect options={car_types.map(car_type => ({ id: car_type.id, nombre: car_type.tipo }))} titulo="Tipo de vehiculo" errorsText={errors.tipo} value={data.tipo} onChangeEventSelect={e => setData('tipo', e.target.value)} />
                {/* imagen principal */}
                <FormFieldFile image={mainImage} errors={errors.main_image} removeImage={removeMainImage} handleImage={handleMainImage} />
                {/* resto de las imagenes */}
                <FormFieldFiles editSection={false} errors={errors.images} removeNewImage={removeNewImage} handleImages={handleImages} newImg={newImg} />
                <div className="flex items-center justify-center">
                    <button disabled={processing} type="submit" className="p-3 rounded-md bg-slate-400 text-gray-800 w-full cursor-pointer hover:bg-slate-600 hover:text-gray-200 transition-background duration-300">Enviar</button>
                </div>
            </form>
        </section>
    </AppFront>;
}