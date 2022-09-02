import useImage from '@/hooks/useImage'
import { EventModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import Image from 'next/image'
import React from 'react'

type Props = {
  event: EventModel
}

export default function EventCard({ event }: Props) {
  const image = useImage('events', event.id, 'sm')

  return (
    <section className="card card-click card-col-1">
      <figure className="relative aspect-video">
        {image && <Image src={image} alt="Event image." layout="fill" objectFit="cover" />}
      </figure>
      <h3>{event.name}</h3>
      <div>
        <time>{formatDate(event.time, 'DD/MM')}</time>
        <ul>
          <li>Evenement</li>
        </ul>
      </div>
    </section>
  )
}
