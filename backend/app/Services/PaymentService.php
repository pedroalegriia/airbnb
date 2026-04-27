<?php
namespace App\Services;
use App\Models\Payment;
use App\Notifications\PaymentConfirmedNotification;
use Illuminate\Support\Facades\DB;
use Stripe\Webhook;
class PaymentService
{
    public function createCheckoutIntent(Payment $payment): array
    {
        // In production call Stripe PaymentIntent here. The external id keeps webhook handling realistic and idempotent.
        $externalId = $payment->external_payment_id ?: 'pi_'.bin2hex(random_bytes(12));
        $payment->update(['external_payment_id' => $externalId]);
        return ['payment_id' => $payment->id, 'external_payment_id' => $externalId, 'amount' => $payment->amount, 'currency' => $payment->currency, 'status' => $payment->status];
    }

    public function handleStripeWebhook(string $payload, ?string $signature): void
    {
        $secret = config('services.stripe.webhook_secret');
        $event = $secret && $signature ? Webhook::constructEvent($payload, $signature, $secret) : json_decode($payload, false, 512, JSON_THROW_ON_ERROR);
        if (($event->type ?? null) !== 'payment_intent.succeeded') { return; }
        $eventId = $event->id;
        $externalPaymentId = $event->data->object->id;

        DB::transaction(function () use ($eventId, $externalPaymentId, $event) {
            if (Payment::where('webhook_event_id', $eventId)->exists()) { return; }
            $payment = Payment::where('external_payment_id', $externalPaymentId)->lockForUpdate()->firstOrFail();
            if ($payment->status === 'paid') { $payment->update(['webhook_event_id' => $eventId]); return; }
            $booking = $payment->booking()->lockForUpdate()->firstOrFail();
            if ($booking->status !== 'pending' || ($booking->expires_at && $booking->expires_at->isPast())) { $payment->update(['status' => 'failed', 'webhook_event_id' => $eventId, 'metadata' => (array) $event]); return; }
            $payment->update(['status' => 'paid', 'webhook_event_id' => $eventId, 'paid_at' => now('UTC'), 'metadata' => (array) $event]);
            $booking->update(['status' => 'confirmed', 'expires_at' => null]);
            $booking->user->notify((new PaymentConfirmedNotification($booking))->afterCommit());
        });
    }
}
