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
    studentsUnderSupervision?: number;
    supervisedClasses?: number;
    resultsRecorded?: string;
    outstandingIssues?: number;
}

interface SupervisorDashboardProps {
    user: User;
    data?: DashboardData;
}

export function SupervisorDashboard({ user, data }: SupervisorDashboardProps) {
    return (
        <div className="space-y-6 p-6">
            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Students Under"
                    value={String(data?.studentsUnderSupervision ?? 0)}
                    description="Your supervision"
                    icon="👥"
                    iconClass="bg-blue-50 text-blue-600"
                />

                <StatCard
                    title="Classes"
                    value={String(data?.supervisedClasses ?? 0)}
                    description="Supervised classes"
                    icon="🏫"
                    iconClass="bg-emerald-50 text-emerald-600"
                />

                <StatCard
                    title="Results Recorded"
                    value={data?.resultsRecorded ?? '0%'}
                    description="This term"
                    icon="✅"
                    iconClass="bg-violet-50 text-violet-600"
                />

                <StatCard
                    title="Outstanding Issues"
                    value={String(data?.outstandingIssues ?? 0)}
                    description="Requiring attention"
                    icon="⚠️"
                    iconClass="bg-orange-50 text-orange-600"
                />
            </div>

            {/* Main Management Sections */}
            <div className="grid gap-6 lg:grid-cols-3">
                <DashboardCard
                    title="Student Management"
                    description="Manage students under supervision"
                    action="View All"
                    actionHref="/supervisor/students"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            View and manage supervised students.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Result Management"
                    description="View and analyze results"
                    action="View All"
                    actionHref="/supervisor/results"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Review student performance and results.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Result Analysis"
                    description="Analyze performance trends"
                    action="View All"
                    actionHref="/supervisor/analysis"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Performance analytics and insights.
                        </p>
                    </div>
                </DashboardCard>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-slate-900">Quick Actions</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Common supervisory tasks
                </p>

                <div className="mt-6 space-y-3">
                    <ActionCard
                        icon="👥"
                        title="View Supervised Students"
                        description="See all students under your supervision"
                        href="/supervisor/students"
                    />

                    <ActionCard
                        icon="📝"
                        title="View Results"
                        description="Review recorded results"
                        href="/supervisor/results"
                    />

                    <ActionCard
                        icon="📊"
                        title="Performance Analysis"
                        description="Analyze student performance"
                        href="/supervisor/analysis"
                    />

                    <ActionCard
                        icon="⚡"
                        title="CBT Management"
                        description="Manage computer-based tests"
                        href="/supervisor/cbt"
                    />
                </div>
            </div>
        </div>
    );
}
