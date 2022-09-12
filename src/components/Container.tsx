import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  bg?: string | undefined
  children?: ReactNode | undefined
  className?: string | undefined
}

export default function Container({ bg, children, className, ...props }: Props) {
  const classes = 'mt-8'
  if (bg) {
    return (
      <section className={clsx(classes, bg)} {...props}>
        <div className={clsx(className, 'container')}>{children}</div>
      </section>
    )
  }
  return (
    <section className={clsx(classes, className, 'container')} {...props}>
      {children}
    </section>
  )
}
