import React from "react";

interface HeadingProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6,
    content: string
}
export default function Heading({level = 1, content}: HeadingProps) {
    const size = 'h' + level
    return React.createElement(size, {},content);
}