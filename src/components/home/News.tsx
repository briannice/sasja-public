import EventCard from '@/components/cards/EventCard'
import MatchreportCard from '@/components/cards/MatchreportCard'
import NewsCard from '@/components/cards/NewsCard'
import Container from '@/components/Container'
import { TimeLine } from '@/types/models'
import React from 'react'

type Props = {
  timeLine: TimeLine
}

export default function News({ timeLine }: Props) {
  return (
    <>
      <Container>
        <div className="p-2">
          <div className="-skew-x-3 transform space-y-4 bg-primary p-8 text-center text-white">
            <h2 className="font-kanit text-3xl font-bold">
              Promotie abonnementen tot en met 25/8/2023
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              Alle wedstrijden van zowel de Heren, de Play offs als de Beloften en Den Drei,
              uitgezonderd de bekerwedstrijden.
            </p>
            <p className="mt-4 font-kanit text-3xl font-semibold">€100 in plaats van €120</p>
            <p className="mt-4 text-lg leading-relaxed">
              Abonnementen kan u bekomen door op rekeningnummer BE36 3631 9217 0881 het juiste
              bedrag (100 euro tem 25/8) over te maken en in de mededeling uw naam te vermelden.
            </p>
          </div>
        </div>
      </Container>
      <Container className="grid grid-cols-4 gap-8 tablet:grid-cols-8 laptop:grid-cols-12">
        <h2 className="sr-only">News</h2>
        {timeLine.map(
          ({ data, name }, i) =>
            i < 6 &&
            (name === 'event' ? (
              <EventCard key={data.id} event={data} />
            ) : name === 'matchreport' ? (
              <MatchreportCard key={data.id} matchReport={data} />
            ) : name === 'news' ? (
              <NewsCard key={data.id} news={data} />
            ) : (
              <></>
            ))
        )}
      </Container>
    </>
  )
}
