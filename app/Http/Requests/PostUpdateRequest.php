<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'marca' => ['required', 'exists:vehicle_brands,id'],
            'modelo' => ['required', 'exists:vehicle_models,id'],
            'anio' => ['required', 'numeric'],
            'moneda' => ['required'],
            'kilometraje' => ['required', 'numeric'],
            'descripcion' => ['string', 'max:16000'],
            'precio' => ['required', 'numeric'],
            'tipo' => ['required'],
            'images' => ['array', 'min:1', 'max:50'],
            'provincia' => ['required'],
            'municipio' => ['required'],
            'images.*' => ['image'],
            'deleted_images' => ['nullable', 'array'],
            'deleted_images.*' => ['nullable', 'integer', 'exists:post_images,id'],
            'version' => ['required', 'string', 'max:64'],
        ];
    }

    public function messages(): array
    {
        return [
            'marca.exists' => 'Elegí una marca válida',
            'marca.required' => 'Debes seleccionar una marca.',
            'modelo.required' => 'Debes ingresar el modelo.',
            'anio.required' => 'Debes ingresar el año.',
            'moneda.required' => 'Debes seleccionar una moneda.',
            'kilometraje.required' => 'Debes ingresar el kilometraje.',
            'kilometraje.max' => 'El kilometraje debe ser menor a 999999999.',
            'descripcion.required' => 'Debes ingresar una descripción.',
            'precio.required' => 'Debes ingresar el precio.',
            'provincia.required' => 'Debes seleccionar una provincia.',
            'municipio.required' => 'Debes seleccionar un municipio.',
            'tipo.required' => 'Debes seleccionar el tipo.',
            'images.required' => 'Debes subir al menos una imagen.',
            'precio.min' => 'El precio debe ser mayor a 1000', // esto es un error de prueba, en el futuro lo sacamos
            'images.*.image' => 'La imagen debe ser una imagen además de la principal.',
            'main_image.required' => 'Debes subir una imagen principal.',
            'main_image.image' => 'La imagen debe ser una imagen.',
            'main_image.max' => 'La imagen debe pesar menos de 2MB.',
            'version.required' => 'Debes ingresar la versión.',
            'version.max' => 'La versión debe tener menos de 64 caracteres.',
        ];
    }
}
