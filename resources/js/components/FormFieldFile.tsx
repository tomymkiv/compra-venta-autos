import { FormFieldFileProps } from '@/types/types'
import FormFieldContainer from './FormFieldContainer'
// archivo para una sola imagen

export default function FormFieldFile({ image, errors, removeImage, handleImage }: FormFieldFileProps) {
    return <FormFieldContainer titulo="Elegí la imagen principal" errorsText={errors}>
        <p className="text-xs">La imágen principal se usará de portada para que los usuarios tengan una primera impresión del vehiculo antes de ver la publicación</p>

        <input className="p-3 bg-slate-700 cursor-pointer" type="file" accept="image/*" onChange={handleImage} />
        {
            image ?
                <div
                    className="relative cursor-pointer w-fit"
                    onClick={() => removeImage(0)}
                >
                    <img
                        src={image instanceof File ? URL.createObjectURL(image) : `/storage/${image.url}`}
                        className="w-full h-32 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm opacity-0 hover:opacity-100 transition">
                        Eliminar
                    </div>
                </div>
                : <p className="text-red-500">No elegiste una imagen de portada</p>
        }
    </FormFieldContainer>
}
