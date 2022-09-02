import EventCard from '@/components/cards/EventCard'
import NewsCard from '@/components/cards/NewsCard'
import { EventModel, NewsModel } from '@/types/models'
import React from 'react'

type Props = {
  events: EventModel[]
  news: NewsModel[]
}

export default function Tiles({ events, news }: Props) {
  return (
    <section className="bg-pattern py-8">
      <div className="container grid grid-cols-1 gap-8 tablet:grid-cols-2 laptop:grid-cols-3 ">
        <h2 className="sr-only">Nieuws overzicht</h2>

        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}

        {news.map((newsItem) => (
          <NewsCard key={newsItem.id} news={newsItem} />
        ))}
      </div>
    </section>
  )
}
