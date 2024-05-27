import React from "react";

interface HeadingProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6,
    content: string,
    className?: string
}
export default function Heading({level = 1, content, className = ''}: HeadingProps) {
    const size = 'h' + level
    return React.createElement(size, { className } , content);
}