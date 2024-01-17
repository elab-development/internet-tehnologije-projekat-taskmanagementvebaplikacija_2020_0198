import React from 'react'

interface Props {
    center?: boolean,
    size?: 'h1' | 'h2' | 'h3' | 'h4',
    className?: string,
    error?: boolean
    content: string
}

export default function Header(props: Props) {
    const Element = props.size || 'h1';
    const className = 'p-2 ' + (props.center ? 'text-center ' : '') + (props.className || '') + (props.error ? ' text-danger' : '')
    return (
        <Element className={className}>
            {props.content}
        </Element>
    )
}
