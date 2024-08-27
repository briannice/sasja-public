import Link from '@/components/Link'
import useImage from '@/hooks/useImage'
import { EventModel } from '@/types/models'
import { formatDate, getMonthFromDate, getWeekDayFromDate } from '@/utils/date'
import Image from "next/legacy/image"
import React from 'react'

type Props = {
  event: EventModel
}

export default function EventCard({ event }: Props) {
  const image = useImage('events', event.id, 'sm')

  const formatTime = (time: string) => {
    const weekday = getWeekDayFromDate(time)
    const month = getMonthFromDate(time)
    const day = formatDate(time, 'D')
    const t = formatDate(time, 'HHumm')
    return `${weekday} ${day} ${month} - ${t}`
  }

  const tags = [formatTime(event.time), event.location]

  return (
    <Link href={`/evenement/${event.id}`} className="card card-click card-col-1">
      <section className="flex h-full flex-col">
        <figure className="relative h-full">
          {image && <Image src={image} alt="Nieuws banner." layout="fill" objectFit="cover" />}
        </figure>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute -inset-x-5 top-5 -rotate-2 bg-primary py-2">
          <p className="text-center font-kanit text-xl text-white">Evenement</p>
        </div>
        <div className="absolute inset-x-0 bottom-5 px-4">
          <h3 className="font-kanit text-3xl font-bold text-white">{event.name}</h3>
          <ul className="mt-4 flex flex-col items-start space-y-2">
            {tags.map((tag, i) => (
              <li key={i} className="rounded-sm bg-primary px-1.5 py-0.5">
                <p className="font-kanit text-sm text-white">{tag}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Link>
  )
}
