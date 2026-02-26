<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'password' => 'required|string|min:8',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.max' => 'El nombre debe tener como máximo 255 caracteres.',
            'email.required' => 'El correo es obligatorio.',
            'email.email' => 'El correo debe ser un correo válido.',
            'email.max' => 'El correo debe tener como máximo 255 caracteres.',
            'avatar.required' => 'La imagen es obligatoria.',
            'avatar.image' => 'La imagen debe ser una imagen.',
            'avatar.mimes' => 'La imagen debe ser una imagen de tipo jpeg, png o jpg.',
            'avatar.max' => 'La imagen debe tener como máximo 2048 kilobytes.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener como mínimo 8 caracteres.',
        ];
    }
}
