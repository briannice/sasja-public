import Carousel from '@/components/carousel/Carousel'
import EventCarouselItem from '@/components/carousel/items/EventCarouselItem'
import NewsCarouselItem from '@/components/carousel/items/NewsCarouselItem'
import Link from '@/components/Link'
import ClubLogo from '@/components/teams/ClubLogo'
import { EventModel, GameModel, GameWeek, NewsModel, TeamModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  events: EventModel[]
  news: NewsModel[]
  gameWeek: GameWeek
  teams: TeamModel[]
}

export default function Hero({ events, news, teams, gameWeek }: Props) {
  return (
    <section className="grid grid-cols-1 laptop:grid-cols-3">
      <h2 className="sr-only">Hero</h2>

      <section className="hidden shadow-md tablet:block laptop:col-span-2">
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

      <section className="hidden bg-white p-4 shadow-md laptop:flex laptop:aspect-square laptop:flex-col">
        <h3 className="sr-only">Volgende wedstrijden!</h3>
        <div className="flex-1 divide-y divide-light">
          {gameWeek.map((game) => (
            <Game key={game.id} game={game} teams={teams} />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Link href="/team/games" className="btn btn-primary btn-text-icon tablet:text-sm">
            <span>Alle wedstrijden</span>
            <RiArrowRightSLine />
          </Link>
        </div>
      </section>

      <div className="container mt-8">
        <section className="card p-4 laptop:hidden">
          <h3 className="sr-only">Volgende wedstrijden!</h3>
          <div className="flex-1 divide-y divide-light">
            {gameWeek.map((game) => (
              <Game key={game.id} game={game} teams={teams} />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Link href="/team/games" className="btn btn-primary btn-text-icon tablet:text-sm">
              <span>Alle wedstrijden</span>
              <RiArrowRightSLine />
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}

function Game({ game, teams }: { game: GameModel; teams: TeamModel[] }) {
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
    <div key={game.id} className="py-2">
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
  )
}
