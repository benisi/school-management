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
    totalClasses: number;
    totalStudents: number;
    totalStaff: number;
    pendingFees: string;
}

interface AdminDashboardProps {
    user: User;
    data: DashboardData;
}

export function AdminDashboard({ user, data }: AdminDashboardProps) {
    return (
        <div className="space-y-6 p-6">
            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Classes"
                    value={data.totalClasses.toString()}
                    description="Active classes"
                    icon="🏫"
                    iconClass="bg-blue-50 text-blue-600"
                />

                <StatCard
                    title="Total Students"
                    value={data.totalStudents.toString()}
                    description="Enrolled students"
                    icon="👥"
                    iconClass="bg-emerald-50 text-emerald-600"
                />

                <StatCard
                    title="Total Staff"
                    value={data.totalStaff.toString()}
                    description="Teachers and support"
                    icon="👔"
                    iconClass="bg-violet-50 text-violet-600"
                />

                <StatCard
                    title="Pending Fees"
                    value={data.pendingFees}
                    description="Outstanding payments"
                    icon="💳"
                    iconClass="bg-orange-50 text-orange-600"
                />
            </div>

            {/* Management Sections */}
            <div className="grid gap-6 lg:grid-cols-2">
                <DashboardCard
                    title="Classes Management"
                    description="Manage all classes and subjects"
                    action="View All"
                    actionHref="/admin/classes"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Create, edit, and manage all school classes.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Subjects Management"
                    description="Configure school subjects"
                    action="View All"
                    actionHref="/admin/subjects"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Manage all subjects and curricula.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Student Management"
                    description="Manage all students"
                    action="View All"
                    actionHref="/admin/students"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Enroll, edit, and manage student records.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Staff Management"
                    description="Manage teachers and staff"
                    action="View All"
                    actionHref="/admin/staff"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Manage admin, teachers, and support staff.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Results & Performance"
                    description="View and manage results"
                    action="View All"
                    actionHref="/admin/results"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Manage student results and performance analysis.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="E-Learning Platform"
                    description="Manage online learning"
                    action="View All"
                    actionHref="/admin/elearning"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Manage courses and learning materials.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Accounts & Users"
                    description="Manage school accounts"
                    action="View All"
                    actionHref="/admin/accounts"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Manage user accounts and permissions.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Fees Management"
                    description="Manage school fees"
                    action="View All"
                    actionHref="/admin/fees"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Track and manage student fees.
                        </p>
                    </div>
                </DashboardCard>
            </div>

            {/* Financial Reports */}
            <div className="grid gap-6 lg:grid-cols-2">
                <DashboardCard
                    title="Financial Reports"
                    description="View financial analytics"
                    action="View All"
                    actionHref="/admin/reports/financial"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Revenue, expenses, and financial summaries.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Result Analysis"
                    description="Analyze student performance"
                    action="View All"
                    actionHref="/admin/reports/results"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Performance trends and analytics.
                        </p>
                    </div>
                </DashboardCard>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-slate-900">Quick Actions</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Common management tasks
                </p>

                <div className="mt-6 space-y-3">
                    <ActionCard
                        icon="➕"
                        title="Enroll New Student"
                        description="Add a new student to the system"
                        href="/admin/students/create"
                    />

                    <ActionCard
                        icon="📝"
                        title="Record Results"
                        description="Enter student examination results"
                        href="/admin/results/record"
                    />

                    <ActionCard
                        icon="💰"
                        title="Process Fee Payment"
                        description="Record and process fee payments"
                        href="/admin/fees/payment"
                    />

                    <ActionCard
                        icon="📊"
                        title="Generate Reports"
                        description="Create financial and performance reports"
                        href="/admin/reports"
                    />
                </div>
            </div>
        </div>
    );
}
