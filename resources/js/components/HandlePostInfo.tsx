import useProvinciaMunicipio from '@/hooks/useProvinciaMunicipio';
import { CreatePostForm, EditForm, Images, Post } from '@/types/types';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import useBrandModels from '@/hooks/useBrandModels';

export default function HandlePostInfo(initialExistingImages: Images[] = []) {
    const post_info = usePage().props.post_info as Post | null;
    const [newImg, setNewImg] = useState<File[]>([]);
    const [mainImage, setMainImage] = useState<File | Images | undefined>(post_info?.main_image ?? undefined);
    const [precio, setPrecio] = useState(post_info?.precio ? Number(post_info.precio).toLocaleString("es-AR") : '');
    const [kilometraje, setKilometraje] = useState(post_info?.kilometraje ? Number(post_info.kilometraje).toLocaleString("es-AR") : '');
    const [existingImg, setExistingImg] = useState<Images[]>(initialExistingImages);
    const [deletedImg, setDeletedImg] = useState<number[]>([]);
    const [brandSelected, setBrandSelected] = useState<number | "">(post_info?.car_model.car_brand.id ?? '');
    const [modelSelected, setModelSelected] = useState<number | "">(post_info?.id_model ?? '');
    const [versionSelected, setVersionSelected] = useState<string | "">(post_info?.version ?? '');
    const { provinciaId, setProvinciaId, municipioId, setMunicipioId, municipiosState } = useProvinciaMunicipio();
    const { modelsState } = useBrandModels(brandSelected); // envio el id de la marca seleccionada para que este hook haga un fetch con todos los modelos de esa marca
    // ??: condicional. si recibe null (llega desde laravel), dejo los campos vacios. sino (estoy en edit.tsx), les añado la informacion de "post_info"
    const { data, setData, delete: destroy, post, processing, errors, patch } = useForm<CreatePostForm | EditForm>({
        marca: post_info?.car_model.car_brand.id ?? '',
        modelo: post_info?.id_model ?? '',
        anio: post_info?.anio ?? '',
        kilometraje: post_info?.kilometraje ?? '',
        precio: post_info?.precio?.toString() ?? '',
        descripcion: post_info?.descripcion ?? '',
        tipo: post_info?.id_body ?? '',
        provincia: String(post_info?.municipio.provincia.id ?? ''),
        municipio: String(post_info?.municipio.id ?? ''),
        images: [],
        moneda: post_info?.id_currency ?? '',
        version: post_info?.version ?? '', // MODIFICAR SI SE AGREGA UN TABLA APARTE LLAMADA "VEHICLE_VERSIONS" O ALGO POR EL ESTILO
        main_image: post_info?.main_image ?? '',
        deleted_images: []
    } as CreatePostForm | EditForm)

    const handleVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('version', e.target.value);
        setVersionSelected(e.target.value);
    }

    const handleBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('marca', Number(e.target.value));
        setBrandSelected(Number(e.target.value)); // con esto envio el ID al fetch del hook "useBrandModels"
        setData('version', '');
        setVersionSelected('');
        setModelSelected('');
        setData('modelo', '');
    }

    const handleModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('modelo', e.target.value);
        setModelSelected(Number(e.target.value));// es para mostrar en tiempo real el modelo seleccionado (es un añadido, nada de la consigna)
        setData('version', '');
        setVersionSelected('');
    }
    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        // si no hay archivos seleccionados, salgo de la función

        const files = Array.from(e.target.files);
        // convierte el FileList (e.target.files) en un Array<File>
        // esto permite usar spread, map, filter, etc.
        setNewImg(prev => [
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
        if (raw.length > 15) return; // limitar a 15 dígitos reales
        setPrecio(raw ? Number(raw).toLocaleString("es-AR") : "");
        setData('precio', Number(raw));
    }

    const handleKilometraje = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        if (raw.length > 10) return; // limitar a 10 dígitos (máx ~9.999.999.999 km)
        setKilometraje(raw ? Number(raw).toLocaleString("es-AR") : "");
        setData('kilometraje', Number(raw));
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
    const removeExistingImage = (id: number) => {
        if (existingImg.length > 1) {
            confirm('¿Estás seguro que quieres eliminar esta imagen?') &&
                setExistingImg(prev =>
                    prev.filter(img => img.id !== id)
                );
            setDeletedImg(prev => [...prev, id]);
            setData('deleted_images', [...deletedImg, id]);
        } else {
            alert('Debes dejar al menos una imagen');
        }
    }
    // solo para edit.tsx
    const handleDelete = (id: number) => {
        confirm('¿Seguro que quieres eliminar este post? La acción será irreversible.') ?
            destroy(route('posts.destroy', id)) : '';
    }
    return {
        post,
        patch,
        destroy,
        errors,
        processing,
        removeMainImage,
        removeNewImage,
        removeExistingImage,
        handleBrand,
        handleVersion,
        handleModel,
        handleImages,
        handleProvincia,
        handleMunicipio,
        handlePrecio,
        handleKilometraje,
        handleMainImage,
        setVersionSelected,
        versionSelected,
        handleDelete,
        municipioId,
        modelSelected,
        provinciaId,
        municipiosState,
        modelsState,
        data,
        setData,
        precio,
        kilometraje,
        mainImage,
        newImg,
        existingImg,
        brandSelected,
    }
}