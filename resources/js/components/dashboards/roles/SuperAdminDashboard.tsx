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

interface SchoolItem {
    id: number;
    name: string;
    email?: string;
    is_active: boolean;
}

interface DashboardData {
    totalSchools: number;
    activeSchools: number;
    totalUsers: number;
    totalStudents: number;
    schools?: SchoolItem[];
}

interface SuperAdminDashboardProps {
    user: User;
    data: DashboardData;
}

export function SuperAdminDashboard({ user, data }: SuperAdminDashboardProps) {
    return (
        <div className="space-y-6 p-6">
            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Schools"
                    value={String(data.totalSchools)}
                    description="Registered schools"
                    icon="▦"
                    iconClass="bg-blue-50 text-blue-600"
                />

                <StatCard
                    title="Active Schools"
                    value={String(data.activeSchools)}
                    description="Currently active"
                    icon="✓"
                    iconClass="bg-emerald-50 text-emerald-600"
                />

                <StatCard
                    title="Total Users"
                    value={String(data.totalUsers)}
                    description="Across all schools"
                    icon="◉"
                    iconClass="bg-violet-50 text-violet-600"
                />

                <StatCard
                    title="Total Students"
                    value={String(data.totalStudents)}
                    description="Across all schools"
                    icon="◉"
                    iconClass="bg-orange-50 text-orange-600"
                />
            </div>

            {/* Management Sections */}
            <div className="grid gap-6 lg:grid-cols-3">
                <DashboardCard
                    title="School Management"
                    description="Manage all registered schools"
                    action="View All"
                    actionHref="/schools"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Monitor and manage all schools in the platform.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Platform Users"
                    description="Manage all platform users"
                    action="View All"
                    actionHref="/users"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Manage admins, supervisors, and other platform users.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="System Settings"
                    description="Configure platform settings"
                    action="Settings"
                    actionHref="/settings"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            System configuration and preferences.
                        </p>
                    </div>
                </DashboardCard>
            </div>

            {/* Schools List */}
            <div className="grid gap-6 lg:grid-cols-1">
                <DashboardCard
                    title="Schools"
                    description="List of registered schools"
                    action="View All"
                    actionHref="/schools"
                >
                    <div className="mt-4 space-y-3">
                        {data.schools && data.schools.length > 0 ? (
                            data.schools.map((s) => (
                                <div
                                    key={s.id}
                                    className="flex items-center gap-4 rounded-xl bg-slate-50 p-4"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-semibold text-blue-600">
                                        {s.name.charAt(0)}
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-800">{s.name}</p>

                                        {s.email && (
                                            <p className="mt-1 text-xs text-slate-500">{s.email}</p>
                                        )}
                                    </div>

                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                            s.is_active
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : 'bg-red-50 text-red-600'
                                        }`}
                                    >
                                        {s.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-slate-500">No schools found.</p>
                        )}
                    </div>
                </DashboardCard>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-slate-900">Quick Actions</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Manage schools and platform settings
                </p>

                <div className="mt-6 space-y-3">
                    <ActionCard
                        icon="+"
                        title="Register New School"
                        description="Add a new school to the platform"
                        href="/schools/create"
                    />

                    <ActionCard
                        icon="👤"
                        title="Add Platform Admin"
                        description="Create a new platform administrator"
                        href="/users/create"
                    />

                    <ActionCard
                        icon="📊"
                        title="View System Reports"
                        description="Access comprehensive system reports"
                        href="/reports/system"
                    />

                    <ActionCard
                        icon="⚙️"
                        title="System Configuration"
                        description="Manage platform configuration"
                        href="/settings"
                    />
                </div>
            </div>
        </div>
    );
}
