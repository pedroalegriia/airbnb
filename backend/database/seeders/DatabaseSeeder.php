<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PropertySeeder::class,
            ActivitySeeder::class,
            AvailabilitySeeder::class,
            BookingSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
