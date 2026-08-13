import { router } from '@inertiajs/react';

interface DashboardHeaderProps {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        user_type: string;
        school_id: number | null;
        is_active: boolean;
    };
    message: string;
}

export function DashboardHeader({ user, message }: DashboardHeaderProps) {
    const role = user.role
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between px-6 py-5">
                <div>
                    <p className="text-sm font-medium text-blue-600">{role}</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        Good day, {user.name}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">{message}</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-slate-800">
                            {user.name}
                        </p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
