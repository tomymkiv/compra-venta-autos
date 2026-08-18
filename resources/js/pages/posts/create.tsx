import { CreateProps } from "@/types/types"
import { route } from 'ziggy-js'
import AppFront from "@/AppFront";
import FormFieldInput from "@/components/FormFieldInput";
import FormFieldSelect from "@/components/FormFieldSelect";
import FormFieldTextarea from "@/components/FormFieldTextarea";
import FormFieldFile from "@/components/FormFieldFile";
import FormFieldFiles from "@/components/FormFieldFiles";
import HandlePostInfo from "@/components/HandlePostInfo";
import FormStepPosts from "@/components/FormStepPosts";
import { useEffect } from "react";

export default function create({ carBrands, vehicleBodies, currencies, provincias }: CreateProps) {

    const {
        setStep,
        step,
        removeMainImage,
        removeNewImage,
        handleBrand,
        handleImages,
        handleProvincia,
        handleMunicipio,
        handlePrecio,
        handleKilometraje,
        handleMainImage,
        handleModel,
        handleVersion,
        versionSelected,
        brandSelected,
        modelSelected,
        municipioId,
        provinciaId,
        municipiosState,
        modelsState,
        data,
        setData,
        precio,
        kilometraje,
        mainImage,
        newImg,
        post,
        errors,
        clearErrors,
        setError,
    } = HandlePostInfo();

    const validateStep = (currentStep: number): boolean => {
        // valido cada paso
        clearErrors();
        if (currentStep === 1) {
            if (!data.marca) {
                setError('marca', 'La marca es obligatoria.');
                return false;
            }
            if (!data.modelo) {
                setError('modelo', 'El modelo es obligatorio.');
                return false;
            }
            if (!data.version) {
                setError('version', 'La versión es obligatoria.');
                return false;
            }
        } else if (currentStep === 2) {
            if (!data.anio) {
                setError('anio', 'El año es obligatorio.');
                return false;
            }
        } else if (currentStep === 3) {
            if (!data.kilometraje) {
                setError('kilometraje', 'El kilometraje es obligatorio.');
                return false;
            }
        } else if (currentStep === 4) {
            if (!data.precio) {
                setError('precio', 'El precio es obligatorio.');
                return false;
            }
            if (!data.moneda) {
                setError('moneda', 'La moneda es obligatoria.');
                return false;
            }
        } else if (currentStep === 5) {
            if (!data.descripcion) {
                setError('descripcion', 'La descripción es obligatoria.');
                return false;
            }
        } else if (currentStep === 6) {
            if (!data.provincia) {
                setError('provincia', 'La provincia es obligatoria.');
                return false;
            }
            if (!data.municipio) {
                setError('municipio', 'El municipio es obligatorio.');
                return false;
            }
        } else if (currentStep === 7) {
            if (!data.tipo) {
                setError('tipo', 'El tipo es obligatorio.');
                return false;
            }
        } else if (currentStep === 8) {
            if (!data.main_image) {
                setError('main_image', 'La imagen principal es obligatoria.');
                return false;
            }
            if (!data.images || data.images.length === 0) {
                setError('images', 'Las imágenes son obligatorias.');
                return false;
            }
        }
        return true;
    }

    const handleNextStep = () => {
        // si todas las validaciones salieron bien, devuelve true
        if (validateStep(step)) {
            setStep(step + 1); // paso siguiente
        }
    }
    // limpio los errores (en tiempo real) al modificar los campos
    useEffect(() => {
        if (errors.marca) clearErrors('marca');
    }, [data.marca]);
    useEffect(() => {
        if (errors.modelo) clearErrors('modelo');
    }, [data.modelo]);
    useEffect(() => {
        if (errors.version) clearErrors('version');
    }, [data.version]);
    useEffect(() => {
        if (errors.anio) clearErrors('anio');
    }, [data.anio]);
    useEffect(() => {
        if (errors.kilometraje) clearErrors('kilometraje');
    }, [data.kilometraje]);
    useEffect(() => {
        if (errors.precio) clearErrors('precio');
    }, [data.precio]);
    useEffect(() => {
        if (errors.moneda) clearErrors('moneda');
    }, [data.moneda]);
    useEffect(() => {
        if (errors.descripcion) clearErrors('descripcion');
    }, [data.descripcion]);
    useEffect(() => {
        if (errors.provincia) clearErrors('provincia');
    }, [data.provincia]);
    useEffect(() => {
        if (errors.municipio) clearErrors('municipio');
    }, [data.municipio]);
    useEffect(() => {
        if (errors.tipo) clearErrors('tipo');
    }, [data.tipo]);
    useEffect(() => {
        if (errors.main_image) clearErrors('main_image');
    }, [data.main_image]);
    useEffect(() => {
        if (errors.images) clearErrors('images');
    }, [data.images]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // checkear todos los pasos, por si hubo alguna adulteracion de datos

        if (!validateStep(1)) { setStep(1); return; }
        if (!validateStep(2)) { setStep(2); return; }
        if (!validateStep(3)) { setStep(3); return; }
        if (!validateStep(4)) { setStep(4); return; }
        if (!validateStep(5)) { setStep(5); return; }
        if (!validateStep(6)) { setStep(6); return; }
        if (!validateStep(7)) { setStep(7); return; }
        if (!validateStep(8)) { setStep(8); return; }
        post(route('posts.store'), {
            forceFormData: true, // fuerzo un "formData", para que me tome todos los archivos (imagenes)
        });
    }
    useEffect(() => {
        if (errors.marca || errors.modelo || errors.version) {
            setStep(1);
        } else if (errors.anio) {
            setStep(2);
        } else if (errors.kilometraje) {
            setStep(3);
        } else if (errors.precio || errors.moneda) {
            setStep(4);
        } else if (errors.descripcion) {
            setStep(5);
        } else if (errors.provincia || errors.municipio) {
            setStep(6);
        } else if (errors.tipo) {
            setStep(7);
        } else if (errors.main_image || errors.images) {
            setStep(8);
        }
    }, [errors]);
    return <AppFront>
        <section className="flex flex-col items-center min-h-screen py-10 w-full">
            {/* Header */}
            <div className="mb-8 text-center">
                <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-2">Nueva publicación</p>
                <h2 className="text-2xl font-light text-gray-100 tracking-tight">Crear anuncio</h2>
                <div className="mt-3 mx-auto w-8 h-px bg-gray-600"></div>
            </div>

            {/* Card */}
            <div className="w-full max-w-md bg-[#1c1c1c] border border-[#2e2e2e] rounded-sm shadow-2xl">

                {/* Preview de marca/modelo */}
                {
                    !!brandSelected &&
                    <div className="px-6 pt-5 pb-0">
                        <p className="text-xs tracking-widest uppercase text-gray-600 mb-1.5">Seleccionado</p>
                        <div className="flex items-center gap-2 bg-[#242424] border border-[#333] rounded-sm px-3 py-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                            <span className="text-sm text-gray-300 font-light truncate">
                                {carBrands.find(brand => brand.id === brandSelected)?.name}
                                {brandSelected && modelSelected && ` ${modelsState.find(model => model.id === modelSelected)?.name}`}
                                {versionSelected && ` ${versionSelected}`}
                            </span>
                        </div>
                    </div>
                }

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <FormStepPosts images={data.images} mainImage={data.main_image} errorsActive={Object.keys(errors).length > 0} step={step} setStep={setStep} onNext={handleNextStep}>
                        {/* marcas */}
                        {
                            step == 1 && <FormFieldSelect options={carBrands.map(brand => ({ id: brand.id, nombre: brand.name }))} titulo="Marca" errorsText={errors.marca} value={data.marca} onChangeEventSelect={handleBrand} />
                        }
                        {/* modelos */}
                        {
                            !!brandSelected && step == 1 && <FormFieldSelect options={modelsState.map(model => ({ id: model.id, nombre: model.name }))} titulo="Modelo" errorsText={errors.modelo} value={data.modelo} onChangeEventSelect={handleModel} />
                        }
                        {/* versiones */}
                        {
                            !!brandSelected && !!modelSelected && step == 1 && <FormFieldInput type="text" titulo="Versión" placeholder="Ej: SS, LTZ, Kinetic..." errorsText={errors.version} value={data.version} onChangeEventInput={handleVersion} />
                        }
                        {/* años */}
                        {step == 2 && <FormFieldSelect options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({ id: 1900 + i, nombre: 1900 + i }))} titulo="Año" errorsText={errors.anio} value={data.anio} onChangeEventSelect={e => setData('anio', Number(e.target.value))} />}
                        {/* kilometraje */}
                        {step == 3 && <FormFieldInput type="text" titulo="Kilometraje" placeholder="Ej: 100.000" errorsText={errors.kilometraje} value={kilometraje} onChangeEventInput={handleKilometraje} />}
                        {/* precio */}
                        {step == 4 && <div className="grid grid-cols-2 gap-3">
                            <FormFieldInput type="text" max={15} titulo="Precio" errorsText={errors.precio} value={precio} onChangeEventInput={handlePrecio} />
                            <FormFieldSelect options={currencies.map(currency => ({ id: currency.id, nombre: currency.nombre }))} titulo="Moneda" errorsText={errors.moneda} value={data.moneda} onChangeEventSelect={e => setData('moneda', e.target.value)} />
                        </div>
                        }
                        {/* descripción */}
                        {step == 5 && <FormFieldTextarea type="text" titulo="Descripción" errorsText={errors.descripcion} value={data.descripcion} onChangeEventTextarea={e => setData('descripcion', e.target.value)} />}
                        {/* provincia */}
                        {step == 6 && <FormFieldSelect options={provincias.map(provincia => ({ id: provincia.id, nombre: provincia.nombre }))} titulo="Provincia" errorsText={errors.provincia} value={data.provincia} onChangeEventSelect={handleProvincia} />}
                        {/* municipio */}
                        {
                            !!provinciaId && step == 6 &&
                            <FormFieldSelect options={municipiosState.map(municipio => ({ id: municipio.id, nombre: municipio.nombre }))} titulo="Municipio" errorsText={errors.municipio} value={municipioId} onChangeEventSelect={handleMunicipio} />
                        }
                        {/* tipos de vehiculos */}
                        {step == 7 && <FormFieldSelect options={vehicleBodies.map(vehicleBody => ({ id: vehicleBody.id, nombre: vehicleBody.name }))} titulo="Tipo de vehiculo" errorsText={errors.tipo} value={data.tipo} onChangeEventSelect={e => setData('tipo', e.target.value)} />}
                        {/* imagen principal */}
                        {step == 8 &&
                            <>
                                <FormFieldFile forPosts={true} image={mainImage} errors={errors.main_image} removeImage={removeMainImage} handleImage={handleMainImage} />
                                <FormFieldFiles editSection={false} errors={errors.images} removeNewImage={removeNewImage} handleImages={handleImages} newImg={newImg} />
                            </>
                        }
                    </FormStepPosts>
                </form>
            </div>
        </section>
    </AppFront>;
}