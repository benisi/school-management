interface DashboardCardProps {
    title: string;
    description: string;
    action?: string;
    actionHref?: string;
    children: React.ReactNode;
}

export function DashboardCard({
    title,
    description,
    action,
    actionHref,
    children,
}: DashboardCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-slate-900">{title}</h2>
                    <p className="mt-1 text-sm text-slate-500">{description}</p>
                </div>

                {action && (
                    <a
                        href={actionHref || '#'}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                        {action}
                    </a>
                )}
            </div>

            <div className="mt-6">{children}</div>
        </div>
    );
}
