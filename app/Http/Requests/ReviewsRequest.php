<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReviewsRequest extends FormRequest
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
            'reviewer_id' => 'required|exists:users,id',
            'reviewed_user_id' => [
                'required',
                Rule::unique('reviews', 'reviewed_user_id')
                    ->where(fn($query) => $query->where('reviewer_id', $this->reviewer_id))
                    ->ignore($this->id),
            ],
            'status_id' => 'required|exists:review_status,id',
            'rating' => 'required|in:1,2,3,4,5',
            'comment' => 'nullable|string',
        ];
    }
    public function messages(): array
    {
        return [
            'reviewed_user_id.required' => 'El usuario es obligatorio.',
            'reviewed_user_id.unique' => 'Ya has dejado una reseña a este usuario.',
            'rating.required' => 'La calificación es obligatoria.',
        ];
    }
}
