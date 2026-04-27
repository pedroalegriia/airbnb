<?php
namespace App\Services;
use App\Models\Booking;
use App\Models\User;
use App\Notifications\BookingCreatedNotification;
use App\Repositories\Contracts\AvailabilityRepositoryInterface;
use App\Repositories\Contracts\BookingRepositoryInterface;
use App\Repositories\Contracts\PaymentRepositoryInterface;
use App\Repositories\Contracts\PropertyRepositoryInterface;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
class BookingService
{
    public function __construct(private PropertyRepositoryInterface $properties, private AvailabilityRepositoryInterface $availability, private BookingRepositoryInterface $bookings, private PaymentRepositoryInterface $payments) {}

    public function createPending(User $user, array $data): Booking
    {
        return DB::transaction(function () use ($user, $data) {
            if ($user->is_blocked) { throw ValidationException::withMessages(['user' => __('messages.user_blocked')]); }
            $property = $this->properties->lockForBooking((int) $data['property_id']);
            $start = CarbonImmutable::parse($data['start_date'], 'UTC')->startOfDay();
            $end = CarbonImmutable::parse($data['end_date'], 'UTC')->startOfDay();
            if ($end->lessThanOrEqualTo($start)) { throw ValidationException::withMessages(['end_date' => __('messages.invalid_date_range')]); }

            $lockedAvailability = $this->availability->lockRange($property->id, $start->toDateString(), $end->toDateString());
            if ($lockedAvailability->contains(fn ($day) => ! $day->is_available)) { throw ValidationException::withMessages(['availability' => __('messages.dates_unavailable')]); }
            if ($this->bookings->overlappingLocked($property->id, $start->toDateString(), $end->toDateString()) > 0) { throw ValidationException::withMessages(['availability' => __('messages.dates_unavailable')]); }

            $nights = $start->diffInDays($end);
            $booking = $this->bookings->create([
                'user_id' => $user->id, 'property_id' => $property->id,
                'start_date' => $start->toDateString(), 'end_date' => $end->toDateString(),
                'status' => 'pending', 'expires_at' => now('UTC')->addMinutes(10),
                'total_amount' => ($property->price_per_night * $nights) + $property->cleaning_fee,
            ]);
            $this->payments->create(['booking_id' => $booking->id, 'status' => 'pending', 'provider' => 'stripe', 'amount' => $booking->total_amount, 'currency' => 'USD']);
            $user->notify((new BookingCreatedNotification($booking))->afterCommit());
            return $booking->load(['property', 'payment']);
        });
    }

    public function cancel(Booking $booking, User $user): Booking
    {
        if ($booking->user_id !== $user->id && $booking->property->host_id !== $user->id) { abort(403, __('messages.forbidden')); }
        if (! in_array($booking->status, ['pending', 'confirmed'], true)) { throw ValidationException::withMessages(['booking' => __('messages.booking_not_cancellable')]); }
        $booking->update(['status' => 'cancelled']);
        return $booking->refresh();
    }
}
