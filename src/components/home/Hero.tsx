import Carousel from '@/components/carousel/Carousel'
import EventCarouselItem from '@/components/carousel/items/EventCarouselItem'
import NewsCarouselItem from '@/components/carousel/items/NewsCarouselItem'
import Link from '@/components/Link'
import { EventModel, NewsModel } from '@/types/models'
import Image from 'next/image'
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  events: EventModel[]
  news: NewsModel[]
}

export default function Hero({ events, news }: Props) {
  return (
    <section className="grid grid-cols-1 laptop:grid-cols-3">
      <h2 className="sr-only">Hero</h2>

      <section className="hidden tablet:block laptop:col-span-2">
        <h3 className="sr-only">Evenementen en nieuws</h3>
        <Carousel
          length={events.length + news.length}
          className="aspect-video laptop:aspect-auto laptop:h-full"
        >
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

      <section className="relative hidden laptop:block laptop:aspect-square">
        <figure className="relative aspect-square">
          <Image src="/handball-field.jpg" alt="Handball veld." layout="fill" objectFit="cover" />
        </figure>
        <div className="absolute inset-0 flex flex-col bg-black bg-opacity-75 p-16">
          <h2 className="flex-1 text-center text-4xl font-bold text-white">First Men Division</h2>
          <div className="flex justify-center">
            <Link href="/team/games" className="btn btn-primary btn-text-icon">
              <span>Alle wedstrijden</span>
              <RiArrowRightSLine />
            </Link>
          </div>
        </div>
      </section>
    </section>
  )
}
