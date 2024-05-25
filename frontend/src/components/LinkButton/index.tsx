interface LinkButtonProps {
    href: string;
    content: string;
}

export default function LinkButton({ href, content }: LinkButtonProps) {
    return (
        <a href={href} className="btn btn-primary">
            {content}
        </a>
    );
}
