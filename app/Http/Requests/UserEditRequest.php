<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserEditRequest extends FormRequest
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
            'avatar' => 'nullable|max:2048',
            'name' => 'unique:users,name,' . $this->user()->id . ',id|sometimes|string|max:32',
            'email' => 'unique:users,email,' . $this->user()->id . ',id|sometimes|email|max:128',
            'password' => 'required_with:password_confirmation|nullable|string|min:8|confirmed',
            'password_confirmation' => 'nullable|string|min:8',
        ];
    }
    public function messages(): array
    {
        return [
            'avatar.max' => 'La imagen no puede exceder los 2048kb',
            'name.unique' => 'Este nombre de usuario ya está en uso',
            'name.max' => 'El nombre no puede exceder los 32 caracteres',
            'email.unique' => 'Este email ya está en uso',
            'email.email' => 'El email debe ser un email valido',
            'email.max' => 'El email no puede exceder los 128 caracteres',
            'password.required_with' => 'No puedes confirmar la contraseña sin ingresar una.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres',
            'password.confirmed' => 'Las contraseñas no coinciden',
            'password_confirmation.min' => 'La confirmación de la contraseña debe tener al menos 8 caracteres',
        ];
    }
}
