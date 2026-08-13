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

interface ParentDashboardProps {
    user: User;
    data?: {
        children?: Array<{ id: number; name: string; email?: string; school_id?: number }>;
        outstandingFees?: string;
        attendanceStatus?: string;
    };
}

export function ParentDashboard({ user, data }: ParentDashboardProps) {
    return (
        <div className="space-y-6 p-6">
            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard
                    title="Children"
                    value={String((data?.children || []).length)}
                    description="Enrolled in school"
                    icon="👨‍👩‍👧‍👦"
                    iconClass="bg-blue-50 text-blue-600"
                />

                <StatCard
                    title="Outstanding Fees"
                    value={data?.outstandingFees ?? '₦0'}
                    description="Pending payment"
                    icon="💳"
                    iconClass="bg-orange-50 text-orange-600"
                />

                <StatCard
                    title="Attendance Status"
                    value={data?.attendanceStatus ?? 'N/A'}
                    description="All children"
                    icon="✓"
                    iconClass="bg-emerald-50 text-emerald-600"
                />
            </div>

            {/* Main Sections */}
            <div className="grid gap-6 lg:grid-cols-3">
                <DashboardCard
                    title="My Children"
                    description="View your children's information"
                    action="View All"
                    actionHref="/parent/children"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Manage your children's school information.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Results"
                    description="View your children's results"
                    action="View All"
                    actionHref="/parent/results"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Check your children's academic performance.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Attendance"
                    description="Monitor attendance"
                    action="View All"
                    actionHref="/parent/attendance"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Track your children's attendance records.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Fees & Payments"
                    description="Manage school fees"
                    action="View All"
                    actionHref="/parent/fees"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Check fees, make payments, and get receipts.
                        </p>
                    </div>
                </DashboardCard>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-slate-900">Quick Actions</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Common parent tasks
                </p>

                <div className="mt-6 space-y-3">
                    <ActionCard
                        icon="📊"
                        title="View Child's Results"
                        description="Check academic performance"
                        href="/parent/results"
                    />

                    <ActionCard
                        icon="✓"
                        title="Check Attendance"
                        description="Monitor child's attendance"
                        href="/parent/attendance"
                    />

                    <ActionCard
                        icon="💰"
                        title="Pay School Fees"
                        description="Process fee payment online"
                        href="/parent/fees/pay"
                    />

                    <ActionCard
                        icon="📞"
                        title="Contact School"
                        description="Get in touch with school"
                        href="/parent/contact"
                    />
                </div>
            </div>
        </div>
    );
}
