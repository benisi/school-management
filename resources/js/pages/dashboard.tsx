import { DashboardRouter } from '@/components/dashboards';

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    user_type: string;
    school_id: number | null;
    is_active: boolean;
};

type Props = {
    user: User;
    dashboardData: Record<string, any>;
};

export default function Dashboard({ user, dashboardData }: Props) {
    return <DashboardRouter user={user} dashboardData={dashboardData} />;
}
