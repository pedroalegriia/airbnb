<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\PaymentService;
use App\Support\ApiResponse;
use Illuminate\Http\Request;
class PaymentController extends Controller
{
    use ApiResponse;
    public function __construct(private PaymentService $payments) {}
    public function intent(Payment $payment) { abort_if($payment->booking->user_id !== request()->user()->id, 403, __('messages.forbidden')); return $this->success($this->payments->createCheckoutIntent($payment), 'messages.payment_pending'); }
    public function stripeWebhook(Request $request) { $this->payments->handleStripeWebhook($request->getContent(), $request->header('Stripe-Signature')); return response()->json(['received' => true]); }
}
