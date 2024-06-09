interface LinkButtonProps {
    href: string;
    content: string;
    className?: string;
    icon?: React.ReactNode;
}

export default function LinkButton({ href, content, className = 'btn btn-primary', icon }: LinkButtonProps) {
    return (
        <a href={href} className={className}>
            {content} {icon && <span className="icon">{icon}</span>}
        </a>
    );
}