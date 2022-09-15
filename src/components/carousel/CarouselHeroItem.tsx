import CarouselItem from '@/components/carousel/CarouselItem'
import useImage from '@/hooks/useImage'
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

export default function CarouselHeroItem({
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
    <CarouselItem show={show} className={className}>
      {image && <Image src={image} alt="Carousel image." layout="fill" objectFit="cover" />}
      <section className="absolute inset-0 flex items-end space-x-16 overflow-hidden bg-black bg-opacity-50 p-8">
        <button onClick={() => goPreviousItem()}>
          <RiArrowLeftSLine className="h-14 w-14 text-white transition-colors hover:text-primary" />
        </button>
        <div className="carousel-hero-item flex-1">{children}</div>
        <button onClick={() => goNextItem()}>
          <RiArrowRightSLine className="h-14 w-14 text-white transition-colors hover:text-primary" />
        </button>
      </section>
    </CarouselItem>
  )
}
