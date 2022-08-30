import clsx from 'clsx'
import NextLink from 'next/link'
import React, { forwardRef, HTMLProps, ReactNode } from 'react'

type Props = {
  href: string
  children?: ReactNode | undefined
  className?: string | undefined
}

const HeadlessLink = forwardRef<HTMLAnchorElement, Props & HTMLProps<HTMLAnchorElement>>(
  (props, ref) => {
    const { href, children, className, ...rest } = props

    return (
      <NextLink href={href}>
        <a className={clsx(className)} ref={ref} {...rest}>
          {children}
        </a>
      </NextLink>
    )
  }
)

export default HeadlessLink
