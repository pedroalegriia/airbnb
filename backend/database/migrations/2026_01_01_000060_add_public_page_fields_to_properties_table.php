<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('host_id');
            $table->string('business_name')->nullable()->after('slug');
            $table->string('logo_url')->nullable()->after('business_name');
            $table->string('facade_image_url')->nullable()->after('logo_url');
            $table->json('services')->nullable()->after('images');
        });
    }

    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn(['slug', 'business_name', 'logo_url', 'facade_image_url', 'services']);
        });
    }
};
