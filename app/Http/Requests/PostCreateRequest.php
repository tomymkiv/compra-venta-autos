<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostCreateRequest extends FormRequest
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
            'kilometraje' => ['required', 'numeric'],
            'descripcion' => ['string', 'max:16000'],
            'precio' => ['required', 'numeric'],
            'ubicacion' => ['required', 'string'],
            'tipo' => ['required', 'in:auto,camioneta,moto'],
            'images' => ['required', 'array', 'min:1', 'max:50'],
            'images.*' => ['image'],
        ];
    }
}
