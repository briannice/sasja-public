import NextLink from 'next/link'

import React, { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  href: string
  blank?: boolean
}

export default function Link({ children, href, blank = false, ...props }: Props) {
  if (blank) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  )
}
