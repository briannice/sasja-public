import useImage from '@/hooks/useImage'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  children: ReactNode
  col: string
  goNextItem: () => void
  goPreviousItem: () => void
  id: string
  show: boolean
  className?: string | undefined
}

export default function CarouselItem({
  children,
  col,
  goNextItem,
  goPreviousItem,
  id,
  show,
  className,
}: Props) {
  const image = useImage(col, id, 'lg')

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
      className={clsx('absolute inset-0', className)}
    >
      {image && <Image src={image} alt="Carousel image." layout="fill" objectFit="cover" />}
      <section className="absolute inset-0 flex items-end space-x-16 bg-black bg-opacity-40 p-16">
        <button onClick={() => goPreviousItem()}>
          <RiArrowLeftSLine className="h-14 w-14 text-white transition-colors hover:text-primary" />
        </button>
        <div className="flex-1">{children}</div>
        <button onClick={() => goNextItem()}>
          <RiArrowRightSLine className="h-14 w-14 text-white transition-colors hover:text-primary" />
        </button>
      </section>
    </Transition>
  )
}
