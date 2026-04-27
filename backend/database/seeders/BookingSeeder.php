<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Payment;
use App\Models\Property;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $sofia = User::where('email', 'sofia.guest@example.com')->firstOrFail();
        $alex = User::where('email', 'alex.guest@example.com')->firstOrFail();
        $barcelona = Property::where('title_en', 'Bright loft in Barcelona')->firstOrFail();
        $madrid = Property::where('title_en', 'Historic apartment in Madrid')->firstOrFail();
        $cancun = Property::where('title_en', 'Oceanfront villa in Cancun')->firstOrFail();
        $today = CarbonImmutable::today('UTC');

        $this->createBookingWithPayment($sofia, $barcelona, $today->subDays(20), $today->subDays(17), 'confirmed', 'paid', 'pi_demo_paid_barcelona');
        $this->createBookingWithPayment($alex, $madrid, $today->addDays(2), $today->addDays(5), 'pending', 'pending', 'pi_demo_pending_madrid', now('UTC')->addMinutes(10));
        $this->createBookingWithPayment($sofia, $cancun, $today->addDays(14), $today->addDays(18), 'confirmed', 'paid', 'pi_demo_paid_cancun');
        $this->createBookingWithPayment($alex, $barcelona, $today->subDays(8), $today->subDays(6), 'expired', 'failed', 'pi_demo_failed_expired', now('UTC')->subMinutes(30));
    }

    private function createBookingWithPayment(User $user, Property $property, CarbonImmutable $start, CarbonImmutable $end, string $bookingStatus, string $paymentStatus, string $externalPaymentId, mixed $expiresAt = null): void
    {
        $nights = $start->diffInDays($end);
        $total = ($property->price_per_night * $nights) + $property->cleaning_fee;

        $booking = Booking::updateOrCreate(
            ['user_id' => $user->id, 'property_id' => $property->id, 'start_date' => $start->toDateString(), 'end_date' => $end->toDateString()],
            ['status' => $bookingStatus, 'expires_at' => $expiresAt, 'total_amount' => $total]
        );

        Payment::updateOrCreate(
            ['booking_id' => $booking->id],
            [
                'status' => $paymentStatus,
                'provider' => 'stripe',
                'external_payment_id' => $externalPaymentId,
                'webhook_event_id' => $paymentStatus === 'paid' ? 'evt_'.$externalPaymentId : null,
                'amount' => $total,
                'currency' => 'USD',
                'metadata' => ['seeded' => true],
                'paid_at' => $paymentStatus === 'paid' ? now('UTC') : null,
            ]
        );
    }
}
