<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Enrollment;
use App\Models\Fee;
use App\Models\Result;
use App\Models\School;
use App\Models\SchoolClass;
use App\Models\Attendance;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        // pick first school
        $school = School::first();

        if (! $school) {
            $this->command->info('No schools found; run SchoolSeeder first.');
            return;
        }

        // create users: admin, hod, teacher, students, parent
        $admin = User::updateOrCreate(
            ['email' => 'admin@'.$school->slug],
            ['name' => $school->name.' Admin', 'password' => bcrypt('password'), 'role' => UserRole::Admin->value, 'school_id' => $school->id, 'is_active' => true]
        );

        $hod = User::updateOrCreate(
            ['email' => 'hod@'.$school->slug],
            ['name' => $school->name.' HOD', 'password' => bcrypt('password'), 'role' => UserRole::Hod->value, 'school_id' => $school->id, 'is_active' => true]
        );

        $teacher = User::updateOrCreate(
            ['email' => 'teacher@'.$school->slug],
            ['name' => $school->name.' Teacher', 'password' => bcrypt('password'), 'role' => UserRole::Teacher->value, 'school_id' => $school->id, 'is_active' => true]
        );

        $students = [];
        for ($i = 1; $i <= 6; $i++) {
            $students[] = User::create([
                'name' => 'Student '.$i,
                'email' => 'student'.$i.'@'.$school->slug,
                'password' => bcrypt('password'),
                'role' => UserRole::Student->value,
                'school_id' => $school->id,
                'is_active' => true,
            ]);
        }

        $parent = User::updateOrCreate(
            ['email' => 'parent@'.$school->slug],
            ['name' => $school->name.' Parent', 'password' => bcrypt('password'), 'role' => UserRole::Parent->value, 'school_id' => $school->id, 'is_active' => true]
        );

        // create classes
        $classA = SchoolClass::updateOrCreate(['school_id' => $school->id, 'name' => 'Class A'], ['teacher_id' => $teacher->id]);
        $classB = SchoolClass::updateOrCreate(['school_id' => $school->id, 'name' => 'Class B'], ['teacher_id' => $teacher->id]);

        // enroll students
        foreach ($students as $idx => $stu) {
            $class = $idx < 3 ? $classA : $classB;
            Enrollment::updateOrCreate(['class_id' => $class->id, 'student_id' => $stu->id]);

            // fees
            Fee::create(['school_id' => $school->id, 'student_id' => $stu->id, 'amount' => 50000, 'paid' => $idx % 2 === 0]);

            // results
            Result::create(['student_id' => $stu->id, 'class_id' => $class->id, 'subject' => 'Mathematics', 'score' => rand(50, 95), 'term' => '2026-1']);

            // attendance for last 5 days
            for ($d = 1; $d <= 5; $d++) {
                Attendance::updateOrCreate([
                    'student_id' => $stu->id,
                    'class_id' => $class->id,
                    'date' => now()->subDays($d)->toDateString(),
                ], ['status' => ($d % 6 === 0) ? 'absent' : 'present']);
            }
        }

        // parent-child link (attach first two students to parent)
        \DB::table('parent_child')->updateOrInsert(['parent_id' => $parent->id, 'child_id' => $students[0]->id], []);
        \DB::table('parent_child')->updateOrInsert(['parent_id' => $parent->id, 'child_id' => $students[1]->id], []);

        $this->command->info('Sample data seeded for school: '.$school->name);
    }
}
