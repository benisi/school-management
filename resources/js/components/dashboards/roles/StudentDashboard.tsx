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

interface StudentDashboardProps {
    user: User;
    data?: {
        overallGrade?: string;
        attendance?: string;
        subjects?: number;
        nextTest?: string;
    };
}

export function StudentDashboard({ user, data }: StudentDashboardProps) {
    return (
        <div className="space-y-6 p-6">
            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Overall Grade"
                    value={data?.overallGrade ?? '-'}
                    description="Current performance"
                    icon="🏅"
                    iconClass="bg-blue-50 text-blue-600"
                />

                <StatCard
                    title="Attendance"
                    value={data?.attendance ?? '0%'}
                    description="This term"
                    icon="✓"
                    iconClass="bg-emerald-50 text-emerald-600"
                />

                <StatCard
                    title="Subjects"
                    value={String(data?.subjects ?? 0)}
                    description="Currently enrolled"
                    icon="📚"
                    iconClass="bg-violet-50 text-violet-600"
                />

                <StatCard
                    title="Next Test"
                    value={data?.nextTest ?? 'N/A'}
                    description="Upcoming test"
                    icon="⏰"
                    iconClass="bg-orange-50 text-orange-600"
                />
            </div>

            {/* Main Sections */}
            <div className="grid gap-6 lg:grid-cols-2">
                <DashboardCard
                    title="My Results"
                    description="View your academic results"
                    action="View All"
                    actionHref="/student/results"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Check your examination results and grades.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="My Attendance"
                    description="View attendance records"
                    action="View All"
                    actionHref="/student/attendance"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Track your attendance across all subjects.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Timetable"
                    description="View your class schedule"
                    action="View All"
                    actionHref="/student/timetable"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Check your daily class schedule.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="E-Learning"
                    description="Access learning materials"
                    action="View All"
                    actionHref="/student/elearning"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Access online courses and learning materials.
                        </p>
                    </div>
                </DashboardCard>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-slate-900">Quick Actions</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Quick access to important information
                </p>

                <div className="mt-6 space-y-3">
                    <ActionCard
                        icon="📊"
                        title="View My Results"
                        description="Check your grades and results"
                        href="/student/results"
                    />

                    <ActionCard
                        icon="📅"
                        title="View My Timetable"
                        description="See your class schedule"
                        href="/student/timetable"
                    />

                    <ActionCard
                        icon="✓"
                        title="Check Attendance"
                        description="View your attendance record"
                        href="/student/attendance"
                    />

                    <ActionCard
                        icon="📚"
                        title="Access E-Learning"
                        description="View course materials and assignments"
                        href="/student/elearning"
                    />
                </div>
            </div>
        </div>
    );
}
