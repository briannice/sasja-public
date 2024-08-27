import Carousel from '@/components/carousel/Carousel'
import EventCarouselItem from '@/components/carousel/items/EventCarouselItem'
import NewsCarouselItem from '@/components/carousel/items/NewsCarouselItem'
import Link from '@/components/Link'
import ClubLogo from '@/components/teams/ClubLogo'
import {GameModel, GameWeek, TeamModel, TimeLine} from '@/types/models'
import {formatDate, getMonthFromDate, getWeekDayFromDate} from '@/utils/date'
import Image from "next/legacy/image"
import React, {Fragment, useState} from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'
import Popup from "@/components/Popup";
import GameDetail from "@/components/teams/GameDetail";
import {findTeamName} from "@/utils/game";

type Props = {
  timeLine: TimeLine
  gameWeek: GameWeek
  teams: TeamModel[]
}

const showGames = (gameWeek: GameWeek, teams:TeamModel[]) => {
  if (gameWeek.length > 0) {
    let currentDate = ""
    return gameWeek.map(
        (game) => {
          const gameDate = formatDate(game.date, 'DD/MM')
          const showDate = currentDate != gameDate
          currentDate = gameDate
          return game.time && !game.time.startsWith('00:00') && <Game key={game.id} game={game} teams={teams} showDate={showDate} />
        }
    )
  }
  return <p className="text-center font-kanit text-xl">Geen wedstrijden deze week</p>
}


export default function Hero({ timeLine, teams, gameWeek }: Props) {
  return (
    <section className="grid grid-cols-1 laptop:grid-cols-3">
      <h2 className="sr-only">Hero</h2>

      <section className="hidden shadow-md tablet:block laptop:col-span-2">
        <h3 className="sr-only">Evenementen en nieuws</h3>
        <Carousel
          length={timeLine.length}
          className="aspect-video laptop:aspect-auto laptop:h-full"
        >
          {({ index, goNextItem, goPreviousItem }) =>
            timeLine.map(({ data, name }, i) =>
              name === 'event' ? (
                <EventCarouselItem
                  key={data.id}
                  event={data}
                  goNextItem={goNextItem}
                  goPreviousItem={goPreviousItem}
                  show={index === i}
                />
              ) : name === 'news' ? (
                <NewsCarouselItem
                  key={data.id}
                  news={data}
                  goNextItem={goNextItem}
                  goPreviousItem={goPreviousItem}
                  show={index === i}
                />
              ) : (
                <></>
              )
            )
          }
        </Carousel>
      </section>

      <section className="relative hidden min-h-[500px] laptop:flex laptop:flex-col">
        <Image src="/handball-field.jpg" alt="Handball field." layout="fill" objectFit="cover" />
        <div className="relative h-full bg-black bg-opacity-50 p-8">
          <h3 className="text-center text-2xl font-bold text-white">Deze week</h3>
          <div className="rouned-sm relative mt-4 flex-1 divide-y divide-light bg-white py-2 shadow-lg">
            {showGames(gameWeek, teams)}
          </div>
          <div className="relative mt-4 flex justify-center">
            <Link href="/team/wedstrijden" className="btn btn-primary btn-text-icon tablet:text-sm">
              <span>Volledig overzicht</span>
              <RiArrowRightSLine />
            </Link>
          </div>
        </div>
      </section>

      <div className="container mt-8 laptop:hidden">
        <section className="card p-4">
          <h3 className="sr-only">Deze week</h3>
          <div className="flex-1 divide-y divide-light">
            {showGames(gameWeek, teams)}
          </div>
          <div className="mt-4 flex justify-center">
            <Link href="/team/wedstrijden" className="btn btn-primary btn-text-icon tablet:text-sm">
              <span>Volledig overzicht</span>
              <RiArrowRightSLine />
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}

function Game({ game, teams, showDate }: { game: GameModel; teams: TeamModel[]; showDate: boolean }) {
  const [showInfo, setShowInfo] = useState(false)

  const formatTime = (time: string | null) => {
    if (!time) return ''

    const times = time.split(':')
    return `${times[0]}:${times[1]}`
  }


  const homeTeam = findTeamName(game.home_short, game.home_id, teams)
  const awayTeam = findTeamName(game.away_short, game.away_id, teams)

  return (
    <div key={game.id} className="card-click py-2" onClick={() => setShowInfo(true)}>
      { showDate &&
      <div className="text-center font-kanit text-sm text-dark desktop:text-xl">
        <p>{getWeekDayFromDate(game.date) + "," + formatDate(game.date, ' DD ') + getMonthFromDate(game.date)}</p>
      </div>
      }
      <div className="mt-2 flex space-x-4">
        <div className="flex flex-1 items-center justify-end space-x-2">
          <p className="mt-2 text-right font-kanit text-sm tablet:mt-0 desktop:text-base">
              {homeTeam}
          </p>
          <ClubLogo path={game.home_logo} size={20} />
        </div>
        { game.game_status_id == 2 ? (
            <div className="text-base font-kanit"><p>{game.home_score}-{game.away_score}</p></div>
        ):(
            <div className="text-sm"><p>{formatTime(game.time)}</p></div>
        )}
        <div className="flex flex-1 items-center space-x-2">
          <ClubLogo path={game.away_logo} size={20} />
          <p className="mt-2 font-kanit text-sm tablet:mt-0 desktop:text-base">
              {awayTeam}
          </p>
        </div>
      </div>
      <Popup open={showInfo} onClose={setShowInfo}>
        <GameDetail game={game}/>
      </Popup>
    </div>
  )
}
