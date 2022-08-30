import NextLink from 'next/link'
import React, { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  href: string
}

export default function Link({ children, href, ...props }: Props) {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}
