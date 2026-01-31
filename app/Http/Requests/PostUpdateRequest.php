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
            'marca' => ['required', 'string'],
            'modelo' => ['required', 'string', 'max:256'],
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
        ];
    }
}
