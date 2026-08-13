<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $service = new DashboardService();

        $dashboardData = match ($user->role?->value) {
            'super_admin' => $service->getSuperAdminData(),
            'admin' => $service->getAdminData($user),
            'supervisor' => $service->getSupervisorData($user),
            'hod' => $service->getHODData($user),
            'teacher' => $service->getTeacherData($user),
            'student' => $service->getStudentData($user),
            'parent' => $service->getParentData($user),
            default => [],
        };

        return Inertia::render('dashboard', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role?->value,
                'user_type' => $user->user_type?->value,
                'school_id' => $user->school_id,
                'is_active' => $user->is_active,
            ],
            'dashboardData' => $dashboardData,
        ]);
    }
}
