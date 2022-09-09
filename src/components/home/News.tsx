import NewsCard from '@/components/cards/NewsCard'
import Container from '@/components/Container'
import { EventModel, MatchReportModel, NewsModel, OpponentModel, TeamModel } from '@/types/models'
import React from 'react'

type Props = {
  events: EventModel[]
  news: NewsModel[]
  teams: TeamModel[]
  opponents: OpponentModel[]
  matchReports: MatchReportModel[]
}

export default function News({ news }: Props) {
  return (
    <Container className="grid grid-cols-3 gap-8">
      <h2 className="sr-only">News</h2>
      {news.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </Container>
  )
}
