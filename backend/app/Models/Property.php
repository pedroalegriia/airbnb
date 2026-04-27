<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['host_id','slug','business_name','logo_url','facade_image_url','title_es','title_en','description_es','description_en','price_per_night','cleaning_fee','max_guests','city','country','lat','lng','status','images','services','is_blocked'];
    protected function casts(): array { return ['images' => 'array', 'services' => 'array', 'lat' => 'decimal:7', 'lng' => 'decimal:7', 'price_per_night' => 'decimal:2', 'cleaning_fee' => 'decimal:2', 'is_blocked' => 'boolean']; }

    public function host(): BelongsTo { return $this->belongsTo(User::class, 'host_id'); }
    public function availability(): HasMany { return $this->hasMany(Availability::class); }
    public function bookings(): HasMany { return $this->hasMany(Booking::class); }
    public function reviews(): HasMany { return $this->hasMany(Review::class); }
    public function activities(): HasMany { return $this->hasMany(Activity::class); }
}
