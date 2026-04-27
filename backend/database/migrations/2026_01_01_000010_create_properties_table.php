<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('host_id')->constrained('users')->cascadeOnDelete();
            $table->string('title_es');
            $table->string('title_en');
            $table->text('description_es');
            $table->text('description_en');
            $table->decimal('price_per_night', 10, 2);
            $table->decimal('cleaning_fee', 10, 2)->default(0);
            $table->unsignedSmallInteger('max_guests');
            $table->string('city')->index();
            $table->string('country')->index();
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->enum('status', ['active', 'paused'])->default('paused')->index();
            $table->json('images')->nullable();
            $table->boolean('is_blocked')->default(false)->index();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['city', 'status', 'is_blocked', 'max_guests']);
            $table->index(['host_id', 'status']);
        });
    }
    public function down(): void { Schema::dropIfExists('properties'); }
};
