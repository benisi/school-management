<?php

namespace Database\Seeders;

use App\Models\School;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schools = [
            [
                'name' => 'Blessed Children Academy',
                'slug' => 'blessed-children-academy',
                'email' => 'info@blessedchildrenacademy.edu.ng',
                'phone' => '07012345678',
                'address' => 'Lagos, Nigeria',
                'is_active' => true,
            ],
            [
                'name' => 'Wisdom Gate School',
                'slug' => 'wisdom-gate-school',
                'email' => 'info@wisdomgateschool.edu.ng',
                'phone' => '08012345678',
                'address' => 'Ibadan, Nigeria',
                'is_active' => true,
            ],
            [
                'name' => 'National Comprehensive College',
                'slug' => 'national-comprehensive-college',
                'email' => 'info@nationalcomprehensive.edu.ng',
                'phone' => '09012345678',
                'address' => 'Abuja, Nigeria',
                'is_active' => true,
            ],
            [
                'name' => 'Nana College',
                'slug' => 'nana-college',
                'email' => 'info@nanacollege.edu.ng',
                'phone' => '07098765432',
                'address' => 'Port Harcourt, Nigeria',
                'is_active' => true,
            ],
        ];

        foreach ($schools as $school) {
            School::updateOrCreate(
                ['slug' => $school['slug']],
                $school
            );
        }
    }
}
