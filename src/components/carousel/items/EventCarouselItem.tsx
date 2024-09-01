import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

import Link from '@/components/Link'
import CarouselHeroItem from '@/components/carousel/CarouselHeroItem'

import { EventModel } from '@/types/models'

import { formatDate } from '@/utils/date'

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
      <h3>{event.name}</h3>
      <ul>
        <li>
          <p>{event.location}</p>
        </li>
        <li>
          <time>{formatDate(event.time, 'DD/MM')}</time>
        </li>
        <li>
          <time>{formatDate(event.time, 'HH:mm')}</time>
        </li>
      </ul>
      <Link href={`/evenement/${event.id}`}>
        <span>Lees meer</span>
        <RiArrowRightSLine />
      </Link>
    </CarouselHeroItem>
  )
}
