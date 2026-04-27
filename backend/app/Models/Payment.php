<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = ['booking_id','status','provider','external_payment_id','webhook_event_id','amount','currency','metadata','paid_at'];
    protected function casts(): array { return ['metadata' => 'array', 'paid_at' => 'datetime', 'amount' => 'decimal:2']; }
    public function booking(): BelongsTo { return $this->belongsTo(Booking::class); }
}
