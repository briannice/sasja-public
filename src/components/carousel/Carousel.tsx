import clsx from 'clsx'
import React, { ReactNode, useState } from 'react'

type RenderProps = {
    index: number
    goNextItem: () => void
    goPreviousItem: () => void
}

type Props = {
    children: (props: RenderProps) => ReactNode
    length: number
    className?: string | undefined
}

export default function Carousel({ children, length, className }: Props) {
    const [index, setIndex] = useState(0)

    const goNextItem = () => {
        if (index === length - 1) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    const goPreviousItem = () => {
        if (index === 0) {
            setIndex(length - 1)
        } else {
            setIndex(index - 1)
        }
    }

    return (
        <div className={clsx('relative', className)}>
            {children({ index, goNextItem, goPreviousItem })}
        </div>
    )
}
