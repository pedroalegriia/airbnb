<?php
namespace App\Http\Requests\Review;
use Illuminate\Foundation\Http\FormRequest;
class ReviewRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return ['booking_id' => ['required','integer','exists:bookings,id'], 'rating' => ['required','integer','between:1,5'], 'comment' => ['nullable','string','max:2000']]; }
}
