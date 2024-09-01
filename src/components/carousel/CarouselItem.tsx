import React, { ReactNode } from 'react'

import { Transition } from '@headlessui/react'

import { cn } from '@/utils/utils'

type Props = {
  children: ReactNode
  show: boolean
  className?: string | undefined
}

export default function CarouselItem({ children, show, className }: Props) {
  return (
    <Transition
      as="section"
      show={show}
      enter="duration-150 transition-opacity"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="delay-75 duration-150 transition-opacity"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={cn('absolute inset-0', className)}
    >
      {children}
    </Transition>
  )
}
