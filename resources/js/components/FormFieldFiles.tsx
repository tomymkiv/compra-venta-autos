// codigo funcionando, antes de implementar el componente a edit.tsx
import { FormFieldFilesProps } from '@/types/types'
import FormFieldContainer from './FormFieldContainer'
import { Label } from '@radix-ui/react-label'

export default function FormFieldFiles({ errors, removeNewImage, handleImages, removeExistingImages, editSection, newImg, existingImages }: FormFieldFilesProps) {
    return <FormFieldContainer titulo="Elegí las imagenes del vehiculo" errorsText={errors}>
        {
            errors && (
                <p className='text-red-500 font-[500] text-sm'>{errors}</p>
            )
        }
        <div className="flex items-center justify-between w-full">
            <Label htmlFor="tipo">Imagen/es del vehiculo</Label>
        </div>
        <input className="p-3 bg-slate-700 cursor-pointer" type="file" accept="image/*" multiple onChange={handleImages} />
        {newImg.length == 0 && <p>No hay imagenes nuevas</p>}
        <div className={newImg.length !== 0 || existingImages && existingImages.length !== 0 ? `grid grid-cols-4 gap-4 max-w-[550px]` : ''}>
            {
                newImg.length != 0 && newImg.map((file, index) => (
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
            }
            {
                // si editSection es true al igual que existingImages, recorro las imagenes
                editSection && existingImages && (
                    existingImages.map((image, index) => (
                        // verifico esto para separar la imagen principal de las demas
                        image.orden !== 1 &&
                        <div
                            key={index}
                            onClick={() => removeExistingImages && image.id && removeExistingImages(image.id)}
                            className="relative cursor-pointer"
                        >
                            <img
                                src={`/storage/${image.url}`}
                                className="w-full h-32 object-cover rounded"
                            />

                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm opacity-0 hover:opacity-100 transition">
                                Eliminar
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    </FormFieldContainer>
}