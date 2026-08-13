<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Collection;

class DashboardService
{
    /**
     * Get dashboard data for Super Admin
     */
    public function getSuperAdminData(): array
    {
        return [
            'totalSchools' => $this->getTotalSchools(),
            'activeSchools' => $this->getActiveSchools(),
            'totalUsers' => $this->getTotalUsers(),
            'totalStudents' => $this->getTotalStudents(),
                'schools' => \App\Models\School::select('id', 'name', 'email', 'is_active')->get()->toArray(),
            ];
        }

    /**
     * Get dashboard data for School Admin
     */
    public function getAdminData(User $user): array
    {
        return [
            'totalClasses' => $this->getTotalClassesBySchool($user->school_id),
            'totalStudents' => $this->getTotalStudentsBySchool($user->school_id),
            'totalStaff' => $this->getTotalStaffBySchool($user->school_id),
            'pendingFees' => $this->getPendingFeesBySchool($user->school_id),
        ];
    }

    /**
     * Get dashboard data for Supervisor/HOD
     */
    public function getSupervisorData(User $user): array
    {
        return [
            'studentsUnderSupervision' => $this->getStudentsUnderSupervision($user),
            'supervisedClasses' => $this->getSupervisedClasses($user),
            'resultsRecorded' => $this->getResultsRecorded($user),
            'outstandingIssues' => $this->getOutstandingIssues($user),
        ];
    }

    /**
     * Get dashboard data for HOD
     */
    public function getHODData(User $user): array
    {
        return [
            'departmentStudents' => $this->getDepartmentStudents($user),
            'departmentClasses' => $this->getDepartmentClasses($user),
            'departmentTeachers' => $this->getDepartmentTeachers($user),
        ];
    }

    /**
     * Get dashboard data for Teacher
     */
    public function getTeacherData(User $user): array
    {
        return [
            'totalClasses' => $this->getTeacherClasses($user),
            'totalStudents' => $this->getTeacherStudents($user),
            'attendanceRate' => $this->getTeacherAttendanceRate($user),
            'pendingResults' => $this->getTeacherPendingResults($user),
        ];
    }

    /**
     * Get dashboard data for Student
     */
    public function getStudentData(User $user): array
    {
        return [
            'overallGrade' => $this->getStudentOverallGrade($user),
            'attendance' => $this->getStudentAttendance($user),
            'subjects' => $this->getStudentSubjects($user),
            'nextTest' => $this->getStudentNextTest($user),
        ];
    }

    /**
     * Get dashboard data for Parent
     */
    public function getParentData(User $user): array
    {
        return [
            'children' => $this->getParentChildren($user),
            'outstandingFees' => $this->getParentOutstandingFees($user),
            'attendanceStatus' => $this->getChildrenAttendanceStatus($user),
        ];
    }

    // ==========================================================
    // Helper Methods - Super Admin
    // ==========================================================

    private function getTotalSchools(): int
    {
        return \App\Models\School::count();
    }

    private function getActiveSchools(): int
    {
        return \App\Models\School::where('is_active', true)->count();
    }

    private function getTotalUsers(): int
    {
        return User::count();
    }

    private function getTotalStudents(): int
    {
        return User::where('role', 'student')->count();
    }

    // ==========================================================
    // Helper Methods - Admin
    // ==========================================================

    private function getTotalClassesBySchool(?int $schoolId): int
    {
        return \App\Models\SchoolClass::where('school_id', $schoolId)->count();
    }

    private function getTotalStudentsBySchool(?int $schoolId): int
    {
        return User::where('school_id', $schoolId)
            ->where('role', 'student')
            ->count();
    }

    private function getTotalStaffBySchool(?int $schoolId): int
    {
        return User::where('school_id', $schoolId)
            ->whereIn('role', ['admin', 'supervisor', 'hod', 'teacher'])
            ->count();
    }

    private function getPendingFeesBySchool(?int $schoolId): string
    {
        $sum = \App\Models\Fee::where('school_id', $schoolId)->where('paid', false)->sum('amount');
        return '₦'.number_format($sum, 2);
    }

    // ==========================================================
    // Helper Methods - Supervisor
    // ==========================================================

    private function getStudentsUnderSupervision(User $user): int
    {
        // approximate: count students in classes where user is teacher
        return \App\Models\Enrollment::whereIn('class_id', function ($q) use ($user) {
            $q->select('id')->from('school_classes')->where('teacher_id', $user->id);
        })->count();
    }

    private function getSupervisedClasses(User $user): int
    {
        return \App\Models\SchoolClass::where('teacher_id', $user->id)->count();
    }

    private function getResultsRecorded(User $user): string
    {
        $total = \App\Models\Result::whereIn('class_id', function ($q) use ($user) {
            $q->select('id')->from('school_classes')->where('teacher_id', $user->id);
        })->count();

        $possible = \App\Models\Enrollment::whereIn('class_id', function ($q) use ($user) {
            $q->select('id')->from('school_classes')->where('teacher_id', $user->id);
        })->count();

        if ($possible === 0) return '0%';
        return round(($total / $possible) * 100, 0).'%';
    }

    private function getOutstandingIssues(User $user): int
    {
        // No issues table - return 0 for now
        return 0;
    }

    // ==========================================================
    // Helper Methods - HOD
    // ==========================================================

    private function getDepartmentStudents(User $user): int
    {
        // approximate same as students under supervision
        return $this->getStudentsUnderSupervision($user);
    }

    private function getDepartmentClasses(User $user): int
    {
        return $this->getSupervisedClasses($user);
    }

    private function getDepartmentTeachers(User $user): int
    {
        // return number of distinct teachers in the same school
        return User::where('school_id', $user->school_id)->where('role', 'teacher')->count();
    }

    // ==========================================================
    // Helper Methods - Teacher
    // ==========================================================

    private function getTeacherClasses(User $user): int
    {
        return \App\Models\SchoolClass::where('teacher_id', $user->id)->count();
    }

    private function getTeacherStudents(User $user): int
    {
        return \App\Models\Enrollment::whereIn('class_id', function ($q) use ($user) {
            $q->select('id')->from('school_classes')->where('teacher_id', $user->id);
        })->count();
    }

    private function getTeacherAttendanceRate(User $user): string
    {
        $attQuery = \App\Models\Attendance::whereIn('class_id', function ($q) use ($user) {
            $q->select('id')->from('school_classes')->where('teacher_id', $user->id);
        });

        $total = $attQuery->count();
        $present = (clone $attQuery)->where('status', 'present')->count();

        if ($total === 0) return '0%';
        return round(($present / $total) * 100, 0).'%';
    }

    private function getTeacherPendingResults(User $user): int
    {
        // pending = enrollments without a result
        $classIds = \App\Models\SchoolClass::where('teacher_id', $user->id)->pluck('id');

        $enrollCount = \App\Models\Enrollment::whereIn('class_id', $classIds)->count();
        $resultCount = \App\Models\Result::whereIn('class_id', $classIds)->count();

        return max(0, $enrollCount - $resultCount);
    }

    // ==========================================================
    // Helper Methods - Student
    // ==========================================================

    private function getStudentOverallGrade(User $user): string
    {
        $avg = \App\Models\Result::where('student_id', $user->id)->avg('score');
        if ($avg === null) {
            return '-';
        }

        $avg = (float) $avg;

        if ($avg >= 90) return 'A';
        if ($avg >= 80) return 'B';
        if ($avg >= 70) return 'C';
        if ($avg >= 60) return 'D';
        return 'F';
    }

    private function getStudentAttendance(User $user): string
    {
        $total = \App\Models\Attendance::where('student_id', $user->id)->count();
        $present = \App\Models\Attendance::where('student_id', $user->id)->where('status', 'present')->count();

        if ($total === 0) return '0%';
        return round(($present / $total) * 100, 0).'%';
    }

    private function getStudentSubjects(User $user): int
    {
        return \App\Models\Enrollment::where('student_id', $user->id)->distinct('class_id')->count('class_id');
    }

    private function getStudentNextTest(User $user): string
    {
        // No scheduling implemented yet
        return 'N/A';
    }

    // ==========================================================
    // Helper Methods - Parent
    // ==========================================================

    private function getParentChildren(User $user): Collection
    {
        $childIds = \DB::table('parent_child')->where('parent_id', $user->id)->pluck('child_id')->toArray();
        return User::whereIn('id', $childIds)->get(['id', 'name', 'email', 'school_id']);
    }

    private function getParentOutstandingFees(User $user): string
    {
        $childIds = \DB::table('parent_child')->where('parent_id', $user->id)->pluck('child_id')->toArray();
        $sum = \App\Models\Fee::whereIn('student_id', $childIds)->where('paid', false)->sum('amount');
        return '₦'.number_format($sum, 2);
    }

    private function getChildrenAttendanceStatus(User $user): string
    {
        $children = $this->getParentChildren($user);
        if ($children->isEmpty()) return 'N/A';

        $percentages = [];
        foreach ($children as $child) {
            $total = \App\Models\Attendance::where('student_id', $child->id)->count();
            $present = \App\Models\Attendance::where('student_id', $child->id)->where('status', 'present')->count();
            $percentages[] = $total === 0 ? 0 : ($present / $total) * 100;
        }

        $avg = array_sum($percentages) / max(1, count($percentages));

        if ($avg >= 85) return 'Good';
        if ($avg >= 70) return 'Fair';
        return 'Poor';
    }
}
