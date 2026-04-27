<?php
namespace App\Http\Requests\Booking;
use Illuminate\Foundation\Http\FormRequest;
class BookingRequest extends FormRequest
{
    public function authorize(): bool { return ! $this->user()?->is_blocked; }
    public function rules(): array { return ['property_id' => ['required','integer','exists:properties,id'], 'start_date' => ['required','date_format:Y-m-d','after_or_equal:today'], 'end_date' => ['required','date_format:Y-m-d','after:start_date']]; }
}
