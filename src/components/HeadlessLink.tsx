import NextLink from 'next/link'

import React, { HTMLProps, ReactNode, forwardRef } from 'react'

import { cn } from '@/utils/utils'

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
        <a
          className={cn(className)}
          href={href}
          ref={ref}
          target="_blank"
          rel="noreferrer"
          {...props}
        >
          {children}
        </a>
      )
    }

    return (
      <NextLink href={href} className={cn(className)} ref={ref} {...props}>
        {children}
      </NextLink>
    )
  }
)

export default HeadlessLink
