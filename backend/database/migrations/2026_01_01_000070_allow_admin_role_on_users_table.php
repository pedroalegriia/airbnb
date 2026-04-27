<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        $driver = DB::getDriverName();
        if ($driver === 'mysql') {
            DB::statement("ALTER TABLE users MODIFY role VARCHAR(20) NOT NULL DEFAULT 'guest'");
        } elseif ($driver === 'pgsql') {
            DB::statement("ALTER TABLE users ALTER COLUMN role TYPE VARCHAR(20)");
            DB::statement("ALTER TABLE users ALTER COLUMN role SET DEFAULT 'guest'");
        } elseif ($driver === 'sqlite') {
            // SQLite stores enum columns as text in Laravel, so no schema change is required.
            return;
        }
    }

    public function down(): void
    {
        $driver = DB::getDriverName();
        if ($driver === 'mysql') {
            DB::statement("ALTER TABLE users MODIFY role ENUM('guest','host') NOT NULL DEFAULT 'guest'");
        }
    }
};
