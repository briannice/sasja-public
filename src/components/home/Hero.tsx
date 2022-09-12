import Carousel from '@/components/carousel/Carousel'
import EventCarouselItem from '@/components/carousel/items/EventCarouselItem'
import NewsCarouselItem from '@/components/carousel/items/NewsCarouselItem'
import News from '@/components/home/News'
import { EventModel, NewsModel } from '@/types/models'
import Image from 'next/image'
import React from 'react'

type Props = {
  events: EventModel[]
  news: NewsModel[]
}

export default function Hero({ events, news }: Props) {
  return (
    <section className="grid grid-cols-3">
      <h2 className="sr-only">Hero</h2>

      <section className="col-span-2">
        <h3 className="sr-only">Evenementen</h3>
        <Carousel length={events.length + news.length} className="h-full">
          {({ index, goNextItem, goPreviousItem }) => (
            <>
              {events.map((event, i) => (
                <EventCarouselItem
                  key={event.id}
                  event={event}
                  goNextItem={goNextItem}
                  goPreviousItem={goPreviousItem}
                  show={index === i}
                />
              ))}
              {news.map((news, i) => (
                <NewsCarouselItem
                  key={news.id}
                  news={news}
                  goNextItem={goNextItem}
                  goPreviousItem={goPreviousItem}
                  show={index === i + events.length}
                />
              ))}
            </>
          )}
        </Carousel>
      </section>

      <section className="relative aspect-square">
        <figure className="relative aspect-square">
          <Image src="/handball-field.jpg" alt="Handball veld." layout="fill" objectFit="cover" />
        </figure>
        <div className="absolute inset-0 bg-black bg-opacity-75 p-8">
          <h2 className="text-center text-4xl font-bold text-white">Volgende wedstrijden</h2>
        </div>
      </section>
    </section>
  )
}
