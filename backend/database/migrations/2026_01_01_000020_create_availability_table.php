<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('availability', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained('properties')->cascadeOnDelete();
            $table->date('date');
            $table->boolean('is_available')->default(true)->index();
            $table->unique(['property_id', 'date']);
            $table->index(['date', 'is_available']);
        });
    }
    public function down(): void { Schema::dropIfExists('availability'); }
};
