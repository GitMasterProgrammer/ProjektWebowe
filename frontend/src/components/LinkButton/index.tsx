
interface LinkButtonProps {
    href: string
    content: string
}
export  default function LinkButton({href, content} : LinkButtonProps) {
    return (
        <a href={href}>
            <button>{content}</button>
        </a>
    )
}