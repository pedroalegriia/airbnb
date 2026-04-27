<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()?->role, ['host', 'admin'], true);
    }

    public function rules(): array
    {
        return [
            'property_id' => ['required','integer','exists:properties,id'],
            'title_es' => ['required','string','max:180'],
            'title_en' => ['required','string','max:180'],
            'description_es' => ['nullable','string'],
            'description_en' => ['nullable','string'],
            'category_es' => ['required','string','max:120'],
            'category_en' => ['required','string','max:120'],
            'price' => ['nullable','numeric','min:0'],
            'duration_minutes' => ['nullable','integer','min:1','max:1440'],
            'image_url' => ['nullable','url','max:2048'],
            'image' => ['nullable','file','image','max:5120'],
            'status' => ['required','in:active,paused'],
        ];
    }
}
