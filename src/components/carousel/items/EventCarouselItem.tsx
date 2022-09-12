import CarouselHeroItem from '@/components/carousel/CarouselHeroItem'
import Link from '@/components/Link'
import { EventModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  event: EventModel
  goNextItem: () => void
  goPreviousItem: () => void
  show: boolean
}

export default function EventCarouselItem({ event, goNextItem, goPreviousItem, show }: Props) {
  return (
    <CarouselHeroItem
      show={show}
      col="events"
      id={event.id}
      goNextItem={goNextItem}
      goPreviousItem={goPreviousItem}
    >
      <h3 className="text-6xl font-bold text-white">{event.name}</h3>
      <ul className="mt-8 flex divide-x divide-primary">
        <li className="pr-8">
          <p className="font-kanit text-xl text-white">{event.location}</p>
        </li>
        <li className="px-8">
          <time className="font-kanit text-xl text-white">{formatDate(event.time, 'DD/MM')}</time>
        </li>
        <li className="pl-8">
          <time className="font-kanit text-xl text-white">{formatDate(event.time, 'HH:mm')}</time>
        </li>
      </ul>
      <Link href={`/evenement/${event.id}`} className="btn btn-primary btn-text-icon mt-8">
        <span>Lees meer</span>
        <RiArrowRightSLine />
      </Link>
    </CarouselHeroItem>
  )
}
