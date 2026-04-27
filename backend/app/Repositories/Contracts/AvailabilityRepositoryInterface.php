<?php
namespace App\Repositories\Contracts;
use Illuminate\Support\Collection;
interface AvailabilityRepositoryInterface
{
    public function lockRange(int $propertyId, string $startDate, string $endDate): Collection;
    public function blockDates(int $propertyId, array $dates): void;
}
