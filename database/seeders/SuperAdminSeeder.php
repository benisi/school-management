<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'super@local'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password'),
                'role' => UserRole::SuperAdmin->value,
                'is_active' => true,
            ]
        );
    }
}
