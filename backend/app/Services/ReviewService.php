<?php
namespace App\Services;
use App\Models\Booking;
use App\Models\Review;
use App\Models\User;
use Illuminate\Validation\ValidationException;
class ReviewService
{
    public function create(User $user, array $data): Review
    {
        $booking = Booking::whereKey($data['booking_id'])->where('user_id', $user->id)->where('status', 'confirmed')->firstOrFail();
        if ($booking->end_date->isFuture()) { throw ValidationException::withMessages(['booking_id' => __('messages.review_after_stay')]); }
        return Review::create(['booking_id' => $booking->id, 'user_id' => $user->id, 'property_id' => $booking->property_id, 'rating' => $data['rating'], 'comment' => $data['comment'] ?? null]);
    }
}
