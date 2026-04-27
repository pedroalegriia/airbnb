<?php
namespace App\Repositories\Eloquent;
use App\Models\Availability;
use App\Repositories\Contracts\AvailabilityRepositoryInterface;
use Illuminate\Support\Collection;
class AvailabilityRepository implements AvailabilityRepositoryInterface
{
    public function lockRange(int $propertyId, string $startDate, string $endDate): Collection
    {
        return Availability::where('property_id', $propertyId)
            ->where('date', '>=', $startDate)->where('date', '<', $endDate)
            ->orderBy('date')->lockForUpdate()->get();
    }
    public function blockDates(int $propertyId, array $dates): void
    {
        foreach (array_unique($dates) as $date) {
            Availability::updateOrCreate(['property_id' => $propertyId, 'date' => $date], ['is_available' => false]);
        }
    }
}
