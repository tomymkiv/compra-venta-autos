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
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'password' => 'nullable|string|min:8|confirmed',
            'password_confirmation' => 'nullable|string|min:8',
        ];
    }
    public function messages(): array
    {
        return [
            'name.max' => 'El nombre no puede exceder los 255 caracteres',
            'email.email' => 'El email debe ser un email valido',
            'email.max' => 'El email no puede exceder los 255 caracteres',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres',
            'avatar.max' => 'La imagen no puede exceder los 2048kb',
            'password_confirmation.min' => 'La confirmación de la contraseña debe tener al menos 8 caracteres',
        ];
    }
}
