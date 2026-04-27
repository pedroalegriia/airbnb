<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array { return ['id'=>$this->id,'status'=>$this->status,'provider'=>$this->provider,'external_payment_id'=>$this->external_payment_id,'amount'=>$this->amount,'currency'=>$this->currency,'paid_at'=>$this->paid_at?->timezone('UTC')->toIso8601String()]; }
}
