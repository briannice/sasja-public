import { EventModel } from '@/types/models'
import React from 'react'

type Props = {
  event: EventModel
}

export default function EventCard({ event }: Props) {
  return (
    <section className="card card-click card-col-1">
      <h3>{event.id}</h3>
    </section>
  )
}
