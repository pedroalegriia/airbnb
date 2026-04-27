<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class BookingResource extends JsonResource
{
    public function toArray(Request $request): array { return ['id'=>$this->id,'property'=>new PropertyResource($this->whenLoaded('property')),'start_date'=>$this->start_date?->toDateString(),'end_date'=>$this->end_date?->toDateString(),'status'=>$this->status,'expires_at'=>$this->expires_at?->timezone('UTC')->toIso8601String(),'total_amount'=>$this->total_amount,'payment'=>new PaymentResource($this->whenLoaded('payment'))]; }
}
