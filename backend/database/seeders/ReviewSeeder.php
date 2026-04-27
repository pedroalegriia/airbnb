<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            'Bright loft in Barcelona' => ['rating' => 5, 'comment' => 'Excelente ubicacion, muy limpio y con gran comunicacion del anfitrion.'],
            'Oceanfront villa in Cancun' => ['rating' => 5, 'comment' => 'La vista al mar es increible y la casa es perfecta para grupos.'],
        ];

        foreach ($reviews as $propertyTitle => $review) {
            $booking = Booking::query()
                ->where('status', 'confirmed')
                ->whereHas('property', fn ($query) => $query->where('title_en', $propertyTitle))
                ->first();

            if (! $booking) {
                continue;
            }

            Review::updateOrCreate(
                ['booking_id' => $booking->id],
                [
                    'user_id' => $booking->user_id,
                    'property_id' => $booking->property_id,
                    'rating' => $review['rating'],
                    'comment' => $review['comment'],
                ]
            );
        }
    }
}
