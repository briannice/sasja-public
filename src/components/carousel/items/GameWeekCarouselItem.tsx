import CarouselItem from '@/components/carousel/CarouselItem'
import ClubLogo from '@/components/teams/ClubLogo'
import { GameDay, TeamModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import React from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  gameDays: GameDay[]
  goNextItem: () => void
  goPreviousItem: () => void
  show: boolean
  teams: TeamModel[]
}

export default function GameWeekCarouselItem({
  gameDays,
  goPreviousItem,
  goNextItem,
  show,
}: Props) {
  const formatTime = (time: string) => {
    const times = time.split(':')
    return `${times[0]}:${times[1]}`
  }

  return (
    <CarouselItem show={show} className="flex flex-col">
      <div className="flex-1 space-y-8">
        {gameDays.map((day, i) => (
          <div key={i} className="">
            <p className="text-center font-kanit text-lg underline decoration-primary decoration-2 underline-offset-4">
              {formatDate(day.date, 'DD/MM')}
            </p>
            <div className="mt-4 space-y-4">
              {day.games.map((game) => (
                <div key={game.id} className="flex">
                  <time>{formatTime(game.time)}</time>
                  <ClubLogo path={game.home_logo} size={30} />
                  <ClubLogo path={game.away_logo} size={30} />
                  <p></p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-8">
        <button onClick={() => goPreviousItem()}>
          <RiArrowLeftSLine className="h-14 w-14 text-primary transition-colors hover:text-primary-dark" />
        </button>
        <button onClick={() => goNextItem()}>
          <RiArrowRightSLine className="h-14 w-14 text-primary transition-colors hover:text-primary-dark" />
        </button>
      </div>
    </CarouselItem>
  )
}
