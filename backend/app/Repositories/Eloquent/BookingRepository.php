<?php
namespace App\Repositories\Eloquent;
use App\Models\Booking;
use App\Repositories\Contracts\BookingRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
class BookingRepository implements BookingRepositoryInterface
{
    public function create(array $data): Booking { return Booking::create($data); }
    public function overlappingLocked(int $propertyId, string $startDate, string $endDate): int
    {
        return Booking::where('property_id', $propertyId)
            ->whereIn('status', ['pending', 'confirmed'])
            ->where('start_date', '<', $endDate)->where('end_date', '>', $startDate)
            ->where(fn (Builder $q) => $q->where('status', 'confirmed')->orWhere('expires_at', '>', now()))
            ->lockForUpdate()->count();
    }
    public function userBookings(int $userId): LengthAwarePaginator { return Booking::with(['property', 'payment'])->where('user_id', $userId)->latest()->paginate(15); }
}
