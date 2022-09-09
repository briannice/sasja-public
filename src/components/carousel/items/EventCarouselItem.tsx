import CarouselItem from '@/components/carousel/CarouselItem'
import Link from '@/components/Link'
import useImage from '@/hooks/useImage'
import { EventModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import Image from 'next/image'
import React from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  event: EventModel
  goNextItem: () => void
  goPreviousItem: () => void
  show: boolean
}

export default function EventCarouselItem({ event, goNextItem, goPreviousItem, show }: Props) {
  const url = useImage('events', event.id, 'lg')
  return (
    <CarouselItem show={show}>
      {url && <Image src={url} alt="Event image" layout="fill" objectFit="cover" />}
      <section className="absolute inset-0 flex items-end space-x-16 bg-black bg-opacity-40 p-16">
        <button onClick={() => goPreviousItem()}>
          <RiArrowLeftSLine className="h-14 w-14 text-white transition-colors hover:text-primary" />
        </button>
        <div className="flex-1">
          <h3 className="text-6xl font-bold text-white">{event.name}</h3>
          <ul className="mt-8 flex divide-x divide-primary">
            <li className="pr-8">
              <p className="font-kanit text-xl text-white">{event.location}</p>
            </li>
            <li className="px-8">
              <time className="font-kanit text-xl text-white">
                {formatDate(event.time, 'DD/MM')}
              </time>
            </li>
            <li className="pl-8">
              <time className="font-kanit text-xl text-white">
                {formatDate(event.time, 'HH:mm')}
              </time>
            </li>
          </ul>
          <Link href={`/evenement/${event.id}`} className="btn btn-primary btn-text-icon mt-8">
            <span>Lees meer</span>
            <RiArrowRightSLine />
          </Link>
        </div>
        <button onClick={() => goNextItem()}>
          <RiArrowRightSLine className="h-14 w-14 text-white transition-colors hover:text-primary" />
        </button>
      </section>
    </CarouselItem>
  )
}
