import EventCard from '@/components/cards/EventCard'
import MatchreportCard from '@/components/cards/MatchreportCard'
import NewsCard from '@/components/cards/NewsCard'
import Container from '@/components/Container'
import Link from '@/components/Link'
import ClubLogo from '@/components/teams/ClubLogo'
import {
  EventModel,
  GameWeek,
  MatchReportModel,
  NewsModel,
  OpponentModel,
  TeamModel,
} from '@/types/models'
import { formatDate } from '@/utils/date'
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  events: EventModel[]
  news: NewsModel[]
  teams: TeamModel[]
  opponents: OpponentModel[]
  matchReports: MatchReportModel[]
  gameWeeks: GameWeek[]
}

export default function News({ news, events, matchReports, teams, opponents, gameWeeks }: Props) {
  const findTeamById = (teamId: string) => {
    return teams.find((t) => t.id === teamId)
  }

  const findOpponentById = (opponentId: string) => {
    return opponents.find((opp) => opponentId === opp.id)
  }

  const formatTime = (time: string) => {
    const times = time.split(':')
    return `${times[0]}:${times[1]}`
  }

  const findTeamName = (name: string, serieId: number) => {
    if (!name.includes('Sasja')) return name
    let result = 'Eerste ploeg'
    teams.forEach((team) => {
      team.competitions.forEach((competition) => {
        if (competition.serieId === serieId) {
          result = team.name
        }
      })
    })
    return result
  }

  return (
    <Container className="grid grid-cols-4 gap-8 tablet:grid-cols-8 laptop:grid-cols-12">
      <h2 className="sr-only">News</h2>

      <section className="card col-span-4 row-span-2 flex flex-col p-4">
        <h3 className="text-center text-xl font-bold">Deze week</h3>
        <div className="mt-4 flex-1 divide-y divide-light">
          {gameWeeks[0].map((game) => (
            <div key={game.id} className="py-2 desktop:py-4">
              <div className="flex divide-x divide-primary">
                <p className="flex-1 pr-2 text-right text-xs text-dark desktop:text-sm">
                  {formatTime(game.time)}
                </p>
                <p className="flex-1 pl-2 text-xs text-dark desktop:text-sm">
                  {formatDate(game.date, 'DD/MM')}
                </p>
              </div>
              <div className="mt-2 flex space-x-4">
                <div className="flex flex-1 items-center justify-end space-x-2">
                  <p className="mt-2 text-right font-kanit text-sm tablet:mt-0 desktop:text-base">
                    {findTeamName(game.home_short, game.serie_id)}
                  </p>
                  <ClubLogo path={game.home_logo} size={20} />
                </div>
                <div className="flex flex-1 items-center space-x-2">
                  <ClubLogo path={game.away_logo} size={20} />
                  <p className="mt-2 font-kanit text-sm tablet:mt-0 desktop:text-base">
                    {findTeamName(game.away_short, game.serie_id)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Link href="/team/games" className="btn btn-primary btn-text-icon tablet:text-sm">
            <span>Alle wedstrijden</span>
            <RiArrowRightSLine />
          </Link>
        </div>
      </section>

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
