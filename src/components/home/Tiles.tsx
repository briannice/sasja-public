import EventCard from '@/components/cards/EventCard'
import { EventModel } from '@/types/models'
import React from 'react'

type Props = {
  events: EventModel[]
}

export default function Tiles({ events }: Props) {
  return (
    <section className="bg-pattern py-8">
      <div className="container grid grid-cols-1 gap-8 tablet:grid-cols-2 laptop:grid-cols-3 ">
        <h2 className="sr-only">Nieuws overzicht</h2>

        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
