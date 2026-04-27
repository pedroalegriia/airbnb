<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('host_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('property_id')->constrained('properties')->cascadeOnDelete();
            $table->string('title_es');
            $table->string('title_en');
            $table->text('description_es')->nullable();
            $table->text('description_en')->nullable();
            $table->string('category_es')->index();
            $table->string('category_en')->index();
            $table->decimal('price', 10, 2)->default(0);
            $table->unsignedSmallInteger('duration_minutes')->nullable();
            $table->string('image_url')->nullable();
            $table->enum('status', ['active', 'paused'])->default('active')->index();
            $table->timestamps();
            $table->index(['property_id', 'status']);
            $table->index(['host_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
