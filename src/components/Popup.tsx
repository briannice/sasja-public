import { Dialog, DialogPanel } from '@headlessui/react'
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
        <Dialog
            open={open}
            onClose={onClose}
            transition
            className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
        >
            <DialogPanel
                transition
                className={clsx(
                    'max-w-lg space-y-4 bg-white p-12 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
                    className
                )}
            >
                {children}
            </DialogPanel>
        </Dialog>
    )
}
