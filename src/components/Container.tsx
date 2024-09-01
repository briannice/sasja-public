import React, { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/utils'

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
      <section className={cn(classes, bg)} {...props}>
        <div className={cn(className, 'container')}>{children}</div>
      </section>
    )
  }

  if (card) {
    return (
      <section className={cn(classes, 'container')} {...props}>
        <div className={cn(className, 'card')}>{children}</div>
      </section>
    )
  }

  return (
    <section className={cn(classes, className, 'container')} {...props}>
      {children}
    </section>
  )
}
