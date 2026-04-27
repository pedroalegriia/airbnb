<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('property_id')->constrained('properties')->cascadeOnDelete();
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'expired'])->default('pending')->index();
            $table->timestamp('expires_at')->nullable()->index();
            $table->decimal('total_amount', 10, 2);
            $table->timestamps();
            $table->index(['property_id', 'start_date', 'end_date', 'status'], 'bookings_property_range_status_idx');
            $table->index(['user_id', 'status']);
        });
    }
    public function down(): void { Schema::dropIfExists('bookings'); }
};
