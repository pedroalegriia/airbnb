<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','property_id','start_date','end_date','status','expires_at','total_amount'];
    protected function casts(): array { return ['start_date' => 'date:Y-m-d', 'end_date' => 'date:Y-m-d', 'expires_at' => 'datetime', 'total_amount' => 'decimal:2']; }
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function property(): BelongsTo { return $this->belongsTo(Property::class); }
    public function payment(): HasOne { return $this->hasOne(Payment::class); }
    public function review(): HasOne { return $this->hasOne(Review::class); }
}
