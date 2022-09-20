import clsx from 'clsx'
import NextLink from 'next/link'
import React, { forwardRef, HTMLProps, ReactNode } from 'react'

type Props = {
  href: string
  blank?: boolean
  children?: ReactNode | undefined
  className?: string | undefined
}

const HeadlessLink = forwardRef<HTMLAnchorElement, Props & HTMLProps<HTMLAnchorElement>>(
  ({ href, children, className, blank = false, ...props }, ref) => {
    if (blank) {
      return (
        <a href={href} ref={ref} target="_blank" rel="noreferrer" {...props}>
          {children}
        </a>
      )
    }

    return (
      <NextLink href={href}>
        <a className={clsx(className)} ref={ref} {...props}>
          {children}
        </a>
      </NextLink>
    )
  }
)

export default HeadlessLink
