<?php
namespace App\Repositories\Eloquent;
use App\Models\Payment;
use App\Repositories\Contracts\PaymentRepositoryInterface;
class PaymentRepository implements PaymentRepositoryInterface
{
    public function create(array $data): Payment { return Payment::create($data); }
    public function findByExternalId(string $externalPaymentId): ?Payment { return Payment::where('external_payment_id', $externalPaymentId)->first(); }
    public function webhookAlreadyProcessed(string $eventId): bool { return Payment::where('webhook_event_id', $eventId)->exists(); }
}
