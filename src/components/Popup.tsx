import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import clsx from 'clsx'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClose: (v: boolean) => void
  open: boolean
  className?: string | undefined
}

export default function Popup({ children, onClose, open, className }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="scrollbar-hidden no-scrollbar container max-h-screen overflow-y-scroll py-8">
        <DialogPanel className={clsx('relative rounded-lg bg-white p-8 shadow', className)}>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  )
}
