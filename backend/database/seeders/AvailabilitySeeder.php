<?php

namespace Database\Seeders;

use App\Models\Availability;
use App\Models\Property;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;

class AvailabilitySeeder extends Seeder
{
    public function run(): void
    {
        $today = CarbonImmutable::today('UTC');

        Property::query()->each(function (Property $property) use ($today): void {
            for ($offset = 0; $offset < 90; $offset++) {
                $date = $today->addDays($offset)->toDateString();
                $blockedByHost = in_array($offset, [5, 6, 12, 20, 21, 45], true);

                Availability::updateOrCreate(
                    ['property_id' => $property->id, 'date' => $date],
                    ['is_available' => ! $blockedByHost && $property->status === 'active']
                );
            }
        });
    }
}
