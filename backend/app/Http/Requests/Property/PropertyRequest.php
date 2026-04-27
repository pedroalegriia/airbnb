<?php
namespace App\Http\Requests\Property;
use Illuminate\Foundation\Http\FormRequest;
class PropertyRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->role === 'host'; }
    public function rules(): array { return ['title_es'=>['required','string','max:180'], 'title_en'=>['required','string','max:180'], 'description_es'=>['required','string'], 'description_en'=>['required','string'], 'price_per_night'=>['required','numeric','min:1'], 'cleaning_fee'=>['nullable','numeric','min:0'], 'max_guests'=>['required','integer','min:1','max:50'], 'city'=>['required','string','max:120'], 'country'=>['required','string','max:120'], 'lat'=>['nullable','numeric','between:-90,90'], 'lng'=>['nullable','numeric','between:-180,180'], 'status'=>['required','in:active,paused'], 'images'=>['nullable','array','max:10'], 'images.*'=>['file','image','max:5120']]; }
}
