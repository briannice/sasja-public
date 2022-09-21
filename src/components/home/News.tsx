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
    <Container className="grid grid-cols-4 gap-8 tablet:grid-cols-8 laptop:grid-cols-12">
      <h2 className="sr-only">News</h2>
      {timeLine.map(({ data, name }) =>
        name === 'event' ? (
          <EventCard key={data.id} event={data} />
        ) : name === 'matchreport' ? (
          <MatchreportCard key={data.id} matchReport={data} />
        ) : name === 'news' ? (
          <NewsCard key={data.id} news={data} />
        ) : (
          <></>
        )
      )}
    </Container>
  )
}
