import AppFront from "@/AppFront"
import FormFieldFile from "@/components/FormFieldFile";
import FormFieldFiles from "@/components/FormFieldFiles";
import FormFieldInput from "@/components/FormFieldInput";
import FormFieldSelect from "@/components/FormFieldSelect";
import FormFieldTextarea from "@/components/FormFieldTextarea";
import HandlePostInfo from "@/components/HandlePostInfo";
import { EditProps } from "@/types/types"
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function edit({ postData, carBrands, vehicleBodies, currencies, provincias }: EditProps) {
    const {
        removeMainImage,
        removeNewImage,
        removeExistingImage,
        handleImages,
        handleProvincia,
        handleMunicipio,
        handlePrecio,
        handleKilometraje,
        handleMainImage,
        handleBrand,
        brandSelected,
        versionSelected,
        modelSelected,
        handleModel,
        modelsState,
        municipioId,
        handleVersion,
        provinciaId,
        municipiosState,
        data,
        setData,
        precio,
        kilometraje,
        mainImage,
        newImg,
        patch,
        processing,
        errors,
        existingImg,
    } = HandlePostInfo(postData.post_image);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.posts.update', postData.id), {
            forceFormData: true,
        });
    }
    return (
        <AppFront>
            <section className="flex flex-col items-center justify-center">
                <h1 className="text-xl font-semibold text-gray-100 mb-6">Edición de publicaciones desde el panel de admin</h1>
                <div className="flex gap-3 w-[75%]">
                    {/* vista en tiempo real de la marca y modelo */}
                    {
                        !!brandSelected &&
                        <input type="text" className="border border-slate-400 p-3 rounded-md w-full" readOnly value={`${carBrands.find(brand => brand.id === brandSelected)?.name} ${modelSelected && modelsState.find(model => model.id === modelSelected)?.name} ${versionSelected && versionSelected}`} />
                    }
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col sm:grid grid-cols-2 sm:items-start sm:justify-center gap-4 my-5 mx-3 w-full">
                    {/* marcas */}
                    <FormFieldSelect options={carBrands.map(brand => ({ id: brand.id, nombre: brand.name }))} titulo="Marca" errorsText={errors.marca} value={data.marca} onChangeEventSelect={handleBrand} />
                    {/* modelos */}
                    {
                        !!brandSelected &&
                        <FormFieldSelect options={modelsState.map(model => ({ id: model.id, nombre: model.name }))} titulo="Modelo" errorsText={errors.modelo} value={data.modelo} onChangeEventSelect={handleModel} />
                    }
                    {/* version */}
                    <FormFieldInput type="text" titulo="Version" errorsText={errors.version} value={data.version} onChangeEventInput={handleVersion} />
                    {/* años */}
                    <FormFieldSelect options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({ id: 1900 + i, nombre: 1900 + i }))} titulo="Año" errorsText={errors.anio} value={data.anio} onChangeEventSelect={e => setData('anio', Number(e.target.value))} />
                    {/* kilometraje */}
                    <FormFieldInput type="text" titulo="Kilometraje" placeholder="Ej: 100.000" errorsText={errors.kilometraje} value={kilometraje} onChangeEventInput={handleKilometraje} />
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
                        // !!provinciaId para que no muestre un 0 en caso de elegir la opcion "seleccionar"
                        !!provinciaId &&
                        <FormFieldSelect options={municipiosState.map(municipio => ({ id: municipio.id, nombre: municipio.nombre }))} titulo="Municipio" errorsText={errors.municipio} value={municipioId} onChangeEventSelect={handleMunicipio} />
                    }
                    {/* tipos de vehiculos */}
                    <FormFieldSelect options={vehicleBodies.map(vehicleBody => ({ id: vehicleBody.id, nombre: vehicleBody.name }))} titulo="Tipo de vehiculo" errorsText={errors.tipo} value={data.tipo} onChangeEventSelect={e => setData('tipo', Number(e.target.value))} />
                    {/* imagen principal */}
                    <FormFieldFile forPosts={true} image={mainImage} errors={errors.main_image} removeImage={removeMainImage} handleImage={handleMainImage} />
                    {/* resto de las imagenes */}
                    <FormFieldFiles editSection={true} errors={errors.images} removeNewImage={removeNewImage} handleImages={handleImages} newImg={newImg} existingImages={existingImg} removeExistingImages={removeExistingImage} />
                    <div className="flex flex-col gap-2">
                        <Link href={route('admin.posts.index')} className="w-full cursor-pointer transition-colors duration-300 p-2 text-center bg-slate-700 rounded-lg hover:bg-slate-800">Salir sin guardar</Link>
                        <Button disabled={processing} type="submit" className="w-full cursor-pointer transition-colors duration-300">Enviar</Button>
                    </div>
                </form>
            </section>


        </AppFront>
    )
}