<?php
namespace App\Http\Requests\Auth;
use Illuminate\Foundation\Http\FormRequest;
class ProfileRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return ['name' => ['sometimes','string','max:120'], 'locale' => ['sometimes','in:es,en'], 'password' => ['sometimes','nullable','string','min:8','confirmed']]; }
}
