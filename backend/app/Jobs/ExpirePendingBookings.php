<?php
namespace App\Jobs;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
class ExpirePendingBookings implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public function handle(): void
    {
        Booking::where('status', 'pending')->where('expires_at', '<=', now('UTC'))->chunkById(100, function ($bookings) {
            foreach ($bookings as $booking) {
                $booking->update(['status' => 'expired']);
                $booking->payment?->update(['status' => 'failed']);
            }
        });
    }
}
