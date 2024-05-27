interface LinkButtonProps {
    href: string;
    content: string;
    className?: string;
}

export default function LinkButton({ href, content, className = 'btn btn-primary' }: LinkButtonProps) {
    return (
        <a href={href} className={className}>
            {content}
        </a>
    );
}