import { EventModel, MatchReportModel, NewsModel, OpponentModel, TeamModel } from '@/types/models'
import React from 'react'

type Props = {
  events: EventModel[]
  news: NewsModel[]
  teams: TeamModel[]
  opponents: OpponentModel[]
  matchReports: MatchReportModel[]
}

export default function News({}: Props) {
  return (
    <section>
      <h2>News</h2>
    </section>
  )
}
