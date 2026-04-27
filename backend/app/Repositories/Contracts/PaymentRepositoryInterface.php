<?php
namespace App\Repositories\Contracts;
use App\Models\Payment;
interface PaymentRepositoryInterface
{
    public function create(array $data): Payment;
    public function findByExternalId(string $externalPaymentId): ?Payment;
    public function webhookAlreadyProcessed(string $eventId): bool;
}
