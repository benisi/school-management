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

interface TeacherDashboardProps {
    user: User;
}

export function TeacherDashboard({ user }: TeacherDashboardProps) {
    return (
        <div className="space-y-6 p-6">
            {/* Statistics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Classes"
                    value="6"
                    description="Teaching this term"
                    icon="🏫"
                    iconClass="bg-blue-50 text-blue-600"
                />

                <StatCard
                    title="Total Students"
                    value="180"
                    description="Across all classes"
                    icon="👥"
                    iconClass="bg-emerald-50 text-emerald-600"
                />

                <StatCard
                    title="Attendance Rate"
                    value="94%"
                    description="Average attendance"
                    icon="✓"
                    iconClass="bg-violet-50 text-violet-600"
                />

                <StatCard
                    title="Pending Results"
                    value="45"
                    description="To be recorded"
                    icon="📝"
                    iconClass="bg-orange-50 text-orange-600"
                />
            </div>

            {/* Main Management Sections */}
            <div className="grid gap-6 lg:grid-cols-2">
                <DashboardCard
                    title="My Classes"
                    description="View and manage your classes"
                    action="View All"
                    actionHref="/teacher/classes"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Access all classes you teach.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Students"
                    description="View your students"
                    action="View All"
                    actionHref="/teacher/students"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Manage students in your classes.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Attendance"
                    description="Record attendance"
                    action="View All"
                    actionHref="/teacher/attendance"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Track student attendance records.
                        </p>
                    </div>
                </DashboardCard>

                <DashboardCard
                    title="Results"
                    description="Record and manage results"
                    action="View All"
                    actionHref="/teacher/results"
                >
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600">
                            Enter student examination results.
                        </p>
                    </div>
                </DashboardCard>
            </div>

            {/* E-Learning Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-slate-900">E-Learning</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Manage online learning materials
                </p>

                <div className="mt-6 space-y-3">
                    <p className="text-sm text-slate-600">
                        Create and share learning materials online.
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-slate-900">Quick Actions</h2>
                <p className="mt-1 text-sm text-slate-500">
                    Common teaching tasks
                </p>

                <div className="mt-6 space-y-3">
                    <ActionCard
                        icon="✓"
                        title="Record Attendance"
                        description="Mark student attendance"
                        href="/teacher/attendance/record"
                    />

                    <ActionCard
                        icon="📊"
                        title="Enter Results"
                        description="Record student results/grades"
                        href="/teacher/results/create"
                    />

                    <ActionCard
                        icon="📚"
                        title="Upload Learning Material"
                        description="Share materials with students"
                        href="/teacher/elearning/materials/create"
                    />

                    <ActionCard
                        icon="👥"
                        title="View Class Details"
                        description="See detailed class information"
                        href="/teacher/classes"
                    />
                </div>
            </div>
        </div>
    );
}
