interface StatCardProps {
    title: string;
    value: string;
    description: string;
    icon: string;
    iconClass: string;
}

export function StatCard({
    title,
    value,
    description,
    icon,
    iconClass,
}: StatCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">{description}</p>
                </div>
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg text-lg font-semibold ${iconClass}`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}
