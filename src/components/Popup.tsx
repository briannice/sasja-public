import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import React, { Fragment, ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClose: (v: boolean) => void
  open: boolean
  className?: string | undefined
}

export default function Popup({ children, onClose, open, className }: Props) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="scrollbar-hidden no-scrollbar container max-h-screen overflow-y-scroll py-8">
          <div className={clsx('relative rounded-lg bg-white p-8 shadow', className)}>
            {children}
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
