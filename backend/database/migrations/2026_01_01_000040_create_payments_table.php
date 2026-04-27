<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->unique()->constrained('bookings')->cascadeOnDelete();
            $table->enum('status', ['pending', 'paid', 'failed'])->default('pending')->index();
            $table->string('provider')->default('stripe');
            $table->string('external_payment_id')->nullable()->unique();
            $table->string('webhook_event_id')->nullable()->unique();
            $table->decimal('amount', 10, 2);
            $table->char('currency', 3)->default('USD');
            $table->json('metadata')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('payments'); }
};
