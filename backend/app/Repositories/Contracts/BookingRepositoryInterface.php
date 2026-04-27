<?php
namespace App\Repositories\Contracts;
use App\Models\Booking;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
interface BookingRepositoryInterface
{
    public function create(array $data): Booking;
    public function overlappingLocked(int $propertyId, string $startDate, string $endDate): int;
    public function userBookings(int $userId): LengthAwarePaginator;
}
