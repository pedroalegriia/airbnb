<?php
namespace App\Http\Requests\Property;
use Illuminate\Foundation\Http\FormRequest;
class AvailabilityRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->role === 'host'; }
    public function rules(): array { return ['dates' => ['required','array','min:1','max:365'], 'dates.*' => ['required','date_format:Y-m-d']]; }
}
