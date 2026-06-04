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
            'name' => 'required|string|max:32',
            'email' => 'required|email|max:128',
            'contacto' => 'exclude_unless:rol,V|required|integer|min:10000000|max:99999999',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'password' => 'required|string|min:8|confirmed',
            'rol' => 'required',
        ];
    }
    protected function prepareForValidation(): void
    {
        $this->merge([
            'rol' => session('rol'),
        ]);
    }
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.max' => 'El nombre debe tener como máximo 32 caracteres.',
            'email.required' => 'El correo es obligatorio.',
            'email.email' => 'El correo debe ser un correo válido.',
            'email.max' => 'El correo debe tener como máximo 128 caracteres.',
            'contacto.required' => 'El número de contacto es obligatorio para vendedores.',
            'contacto.min' => 'El número de contacto debe tener como mínimo 8 dígitos.',
            'contacto.max' => 'El número de contacto debe tener como máximo 8 dígitos.',
            'avatar.image' => 'La imagen debe ser una imagen.',
            'avatar.mimes' => 'La imagen debe ser una imagen de tipo jpeg, png o jpg.',
            'avatar.max' => 'La imagen debe tener como máximo 2048 kilobytes.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener como mínimo 8 caracteres.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'rol.required' => 'El rol es obligatorio',
        ];
    }
}
