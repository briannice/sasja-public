import useImage from '@/hooks/useImage'
import { EventModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import Image from 'next/image'
import React from 'react'

type Props = {
  event: EventModel
}

export default function NewsCard({ event }: Props) {
  const image = useImage('events', event.id, 'sm')

  return (
    <section className="card card-click card-col-1 flex flex-col">
      <figure className="relative aspect-video">
        {image && <Image src={image} alt="Nieuws banner." layout="fill" objectFit="cover" />}
      </figure>
      <h3 className="m-4 flex-1 border-b border-primary pb-4 text-2xl">{event.name}</h3>
      <div className="m-4 mt-0 flex items-center justify-between">
        <ul className="flex space-x-4">
          <li className="rounded-xs ml-auto bg-primary px-1.5 py-0.5">
            <p className="font-kanit text-sm text-white">EVENEMENT</p>
          </li>
        </ul>
        <time className="font-kanit">{formatDate(event.time, 'HH:mm - DD/MM')}</time>
      </div>
    </section>
  )
}
