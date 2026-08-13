interface ActionCardProps {
    icon: string;
    title: string;
    description: string;
    onClick?: () => void;
    href?: string;
}

export function ActionCard({
    icon,
    title,
    description,
    onClick,
    href,
}: ActionCardProps) {
    const className =
        'flex w-full items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50';

    const content = (
        <>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 text-lg font-semibold">
                {icon}
            </span>
            <span>
                <span className="block text-sm font-semibold text-slate-800">
                    {title}
                </span>
                <span className="text-xs text-slate-500">{description}</span>
            </span>
        </>
    );

    if (href) {
        return (
            <a href={href} className={className}>
                {content}
            </a>
        );
    }

    return (
        <button type="button" onClick={onClick} className={className}>
            {content}
        </button>
    );
}
