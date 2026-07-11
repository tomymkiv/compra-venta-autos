import { CreateProps } from "@/types/types"
import { route } from 'ziggy-js'
import AppFront from "@/AppFront";
import FormFieldInput from "@/components/FormFieldInput";
import FormFieldSelect from "@/components/FormFieldSelect";
import FormFieldTextarea from "@/components/FormFieldTextarea";
import FormFieldFile from "@/components/FormFieldFile";
import FormFieldFiles from "@/components/FormFieldFiles";
import HandlePostInfo from "@/components/HandlePostInfo";

export default function create({ carBrands, vehicleBodies, currencies, provincias }: CreateProps) {
    const {
        removeMainImage,
        removeNewImage,
        handleBrand,
        handleImages,
        handleProvincia,
        handleMunicipio,
        handlePrecio,
        handleMainImage,
        handleModel,
        handleVersion,
        brandSelected,
        modelSelected,
        municipioId,
        provinciaId,
        municipiosState,
        modelsState,
        data,
        setData,
        precio,
        mainImage,
        newImg,
        post,
        processing,
        errors,
    } = HandlePostInfo();

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
            <div className="flex gap-3">
                {/* vista en tiempo real de la marca y modelo */}
                {
                    !!brandSelected &&
                    <input type="text" className="border border-slate-400 p-3 rounded-md w-full" readOnly value={`${carBrands.find(brand => brand.id === brandSelected)?.name} ${modelSelected && modelsState.find(model => model.id === modelSelected)?.name}`} />
                }
            </div>
            <form action="" onSubmit={handleSubmit} className="flex flex-col sm:grid grid-cols-2 sm:items-center sm:justify-center gap-4 my-5 mx-3 w-full">
                {/* marcas */}
                <FormFieldSelect options={carBrands.map(brand => ({ id: brand.id, nombre: brand.name }))} titulo="Marca" errorsText={errors.marca} value={data.marca} onChangeEventSelect={handleBrand} />
                {/* modelos */}
                {
                    !!brandSelected &&
                    <>
                        <FormFieldSelect options={modelsState.map(model => ({ id: model.id, nombre: model.name }))} titulo="Modelo" errorsText={errors.modelo} value={data.modelo} onChangeEventSelect={handleModel} />
                        <FormFieldInput type="text" titulo="Versión" placeholder="Ej: SS, LTZ, Kinetic..." errorsText={errors.version} value={data.version} onChangeEventInput={handleVersion} />
                    </>
                }
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
                    !!provinciaId &&
                    <FormFieldSelect options={municipiosState.map(municipio => ({ id: municipio.id, nombre: municipio.nombre }))} titulo="Municipio" errorsText={errors.municipio} value={municipioId} onChangeEventSelect={handleMunicipio} />
                }
                {/* tipos de vehiculos */}
                <FormFieldSelect options={vehicleBodies.map(vehicleBody => ({ id: vehicleBody.id, nombre: vehicleBody.name }))} titulo="Tipo de vehiculo" errorsText={errors.tipo} value={data.tipo} onChangeEventSelect={e => setData('tipo', e.target.value)} />
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