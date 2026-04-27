<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = ['host_id','property_id','title_es','title_en','description_es','description_en','category_es','category_en','price','duration_minutes','image_url','status'];
    protected function casts(): array { return ['price' => 'decimal:2']; }

    public function host(): BelongsTo { return $this->belongsTo(User::class, 'host_id'); }
    public function property(): BelongsTo { return $this->belongsTo(Property::class); }
}
