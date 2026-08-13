import { Head } from '@inertiajs/react';
import { DashboardHeader } from './shared/DashboardHeader';
import {
    SuperAdminDashboard,
    AdminDashboard,
    SupervisorDashboard,
    HODDashboard,
    TeacherDashboard,
    StudentDashboard,
    ParentDashboard,
} from './roles';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    user_type: string;
    school_id: number | null;
    is_active: boolean;
}

interface DashboardRouterProps {
    user: User;
    dashboardData: Record<string, any>;
}

function getDashboardMessage(role: string): string {
    const messages: Record<string, string> = {
        super_admin: 'Welcome to the platform administration panel',
        admin: 'Welcome to your school management dashboard',
        supervisor: 'Welcome to your supervision dashboard',
        hod: 'Welcome to your department dashboard',
        teacher: 'Welcome to your teaching dashboard',
        student: 'Welcome to your student dashboard',
        parent: 'Welcome to your parent dashboard',
    };
    return messages[role] || 'Welcome to your dashboard';
}

export function DashboardRouter({ user, dashboardData }: DashboardRouterProps) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-full bg-slate-50">
                <DashboardHeader
                    user={user}
                    message={getDashboardMessage(user.role)}
                />

                {/* Route to appropriate dashboard based on role */}
                {user.role === 'super_admin' && (
                    <SuperAdminDashboard user={user} data={dashboardData} />
                )}
                {user.role === 'admin' && <AdminDashboard user={user} data={dashboardData} />}
                {user.role === 'supervisor' && (
                    <SupervisorDashboard user={user} data={dashboardData} />
                )}
                {user.role === 'hod' && <HODDashboard user={user} data={dashboardData} />}
                {user.role === 'teacher' && <TeacherDashboard user={user} data={dashboardData} />}
                {user.role === 'student' && <StudentDashboard user={user} data={dashboardData} />}
                {user.role === 'parent' && <ParentDashboard user={user} data={dashboardData} />}
            </div>
        </>
    );
}
