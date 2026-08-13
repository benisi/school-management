import { DashboardCard, StatCard, ActionCard } from '../shared';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    user_type: string;
    school_id: number | null;
    is_active: boolean;
}

interface DashboardData {
    departmentStudents?: number;
    departmentClasses?: number;
    departmentTeachers?: number;
}

interface HODDashboardProps {
    user: User;
    data?: DashboardData;
}

export function HODDashboard({ user, data }: HODDashboardProps) {
    return (
        <div className="space-y-6 p-6">
            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard
                    title="Students in Department"
                    value={String(data?.departmentStudents ?? 0)}
                    description="Active students"
                    icon="👥"
                    iconClass="bg-blue-50 text-blue-600"
                />

                <StatCard
                    title="Classes"
                    value={String(data?.departmentClasses ?? 0)}
                    description="In your department"
                    icon="🏫"
                    iconClass="bg-emerald-50 text-emerald-600"
                />

                <StatCard
                    title="Teachers"
                    value={String(data?.departmentTeachers ?? 0)}
                    description="Department staff"
                    icon="👨‍🏫"
                    iconClass="bg-violet-50 text-violet-600"
                />
            </div>

            {/* Management Sections - HOD Specific */}
            <div className="grid gap-6 lg:grid-cols-3">
                <DashboardCard
                    title="Result Management"
                    description="Manage and review results"
                    action="View All"
                    actionHref="/hod/results"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Record, review, and analyze student results.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="CBT Management"
                    description="Manage computer-based tests"
                    action="View All"
                    actionHref="/hod/cbt"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Create and manage CBT questions and tests.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Student Management"
                    description="Manage department students"
                    action="View All"
                    actionHref="/hod/students"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            View and manage students in your department.
                        </p>
                    </div>
                </DashboardCard>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-slate-900">Quick Actions</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Common departmental management tasks
                </p>

                <div className="mt-6 space-y-3">
                    <ActionCard
                        icon="📊"
                        title="Enter Results"
                        description="Record student examination results"
                        href="/hod/results/create"
                    />

                    <ActionCard
                        icon="❓"
                        title="Create CBT Questions"
                        description="Add questions to CBT question bank"
                        href="/hod/cbt/questions/create"
                    />

                    <ActionCard
                        icon="📝"
                        title="Create CBT Test"
                        description="Set up a new computer-based test"
                        href="/hod/cbt/tests/create"
                    />

                    <ActionCard
                        icon="👥"
                        title="View Department Students"
                        description="See all students in your department"
                        href="/hod/students"
                    />
                </div>
            </div>
        </div>
    );
}
