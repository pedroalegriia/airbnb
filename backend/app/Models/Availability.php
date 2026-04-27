<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Availability extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'availability';
    protected $fillable = ['property_id', 'date', 'is_available'];
    protected function casts(): array { return ['date' => 'date:Y-m-d', 'is_available' => 'boolean']; }
    public function property(): BelongsTo { return $this->belongsTo(Property::class); }
}
