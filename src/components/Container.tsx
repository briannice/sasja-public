import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
    bg?: string | undefined
    children?: ReactNode | undefined
    className?: string | undefined
    card?: boolean | undefined
}

export default function Container({ bg, children, className, card, ...props }: Props) {
    const classes = 'mt-8'
    if (bg) {
        return (
            <section className={clsx(classes, bg)} {...props}>
                <div className={clsx(className, 'container')}>{children}</div>
            </section>
        )
    }

    if (card) {
        return (
            <section className={clsx(classes, 'container')} {...props}>
                <div className={clsx(className, 'card')}>{children}</div>
            </section>
        )
    }

    return (
        <section className={clsx(classes, className, 'container')} {...props}>
            {children}
        </section>
    )
}
