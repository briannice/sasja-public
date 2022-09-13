import EventCard from '@/components/cards/EventCard'
import MatchreportCard from '@/components/cards/MatchreportCard'
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

export default function News({ news, events, matchReports, teams, opponents }: Props) {
  const findTeamById = (teamId: string) => {
    return teams.find((t) => t.id === teamId)
  }

  const findOpponentById = (opponentId: string) => {
    return opponents.find((opp) => opponentId === opp.id)
  }

  return (
    <Container className="grid grid-cols-12 gap-8">
      <h2 className="sr-only">News</h2>

      {news.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      {matchReports.map((mr) => (
        <MatchreportCard
          key={mr.id}
          matchReport={mr}
          team={findTeamById(mr.teamId)}
          opponent={findOpponentById(mr.opponentId)}
        />
      ))}
    </Container>
  )
}
