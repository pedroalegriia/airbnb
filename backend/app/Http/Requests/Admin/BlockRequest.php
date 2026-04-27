<?php
namespace App\Http\Requests\Admin;
use Illuminate\Foundation\Http\FormRequest;
class BlockRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return ['is_blocked' => ['required','boolean']]; }
}
