import clsx from 'clsx'
import React, { ReactNode } from 'react'

type Props = {
  bg?: string | undefined
  children?: ReactNode | undefined
  className?: string | undefined
}

export default function Container({ bg, children, className }: Props) {
  const classes = 'py-16'
  if (bg) {
    return (
      <section className={clsx(classes, bg)}>
        <div className={clsx(className, 'container')}>{children}</div>
      </section>
    )
  }
  return <section className={clsx(classes, className, 'container')}>{children}</section>
}
