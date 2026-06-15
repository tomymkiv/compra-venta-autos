import { EditProps } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import AppFront from "@/AppFront";
import { User } from "@/types";
import FormFieldFile from "@/components/FormFieldFile";
import FormFieldFiles from "@/components/FormFieldFiles";
import FormFieldSelect from "@/components/FormFieldSelect";
import FormFieldTextarea from "@/components/FormFieldTextarea";
import FormFieldInput from "@/components/FormFieldInput";
import HandlePostInfo from "@/components/HandlePostInfo";

export default function edit({ carBrands, postData, car_types, currencies, provincias }: EditProps) {
    const {
        removeMainImage,
        removeNewImage,
        removeExistingImage,
        handleImages,
        handleProvincia,
        handleMunicipio,
        handlePrecio,
        handleMainImage,
        handleDelete,
        municipioId,
        provinciaId,
        municipiosState,
        data,
        setData,
        precio,
        mainImage,
        newImg,
        patch,
        processing,
        errors,
        existingImg,
    } = HandlePostInfo(postData.post_image);

    const { user: UserProps } = usePage().props;
    const user = UserProps as User;

    // eliminar post

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
                            <FormFieldInput type="text" max={15} titulo="Precio" errorsText={errors.precio} value={precio} onChangeEventInput={handlePrecio} />
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