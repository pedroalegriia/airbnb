<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Admin Demo', 'email' => 'admin@example.com', 'role' => 'admin', 'locale' => 'es'],
            ['name' => 'Lucia Host', 'email' => 'lucia.host@example.com', 'role' => 'host', 'locale' => 'es'],
            ['name' => 'Miguel Host', 'email' => 'miguel.host@example.com', 'role' => 'host', 'locale' => 'es'],
            ['name' => 'Sofia Guest', 'email' => 'sofia.guest@example.com', 'role' => 'guest', 'locale' => 'es'],
            ['name' => 'Alex Guest', 'email' => 'alex.guest@example.com', 'role' => 'guest', 'locale' => 'en'],
            ['name' => 'Blocked Guest', 'email' => 'blocked.guest@example.com', 'role' => 'guest', 'locale' => 'en', 'is_blocked' => true],
        ];

        foreach ($users as $user) {
            $createdUser = User::updateOrCreate(
                ['email' => $user['email']],
                array_merge($user, [
                    'password' => Hash::make('password'),
                    'is_blocked' => $user['is_blocked'] ?? false,
                ])
            );

            $createdUser->forceFill(['email_verified_at' => now('UTC')])->save();
        }
    }
}
