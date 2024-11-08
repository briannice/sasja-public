import ClubLogo from '@/components/teams/ClubLogo'
import { db } from '@/services/firebase'
import { queryToModels } from '@/services/firebase/firestore'
import {GameDay, GameModel, TeamModel} from '@/types/models'
import { formatDate, getMonthFromDate, getWeekDayFromDate } from '@/utils/date'
import clsx from 'clsx'
import { collection, query } from 'firebase/firestore'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, {useState} from 'react'
import {findTeamName} from "@/utils/game";
import Popup from "@/components/Popup";
import GameDetail from "@/components/teams/GameDetail";
import { competitionService } from '@/services/competitions/competition'

type Props = {
  gameDays: GameDay[]
  teams: TeamModel[]
}

export default function GamesPage({ gameDays, teams }: Props) {
  const createDate = (date: string) => {
    const weekday = getWeekDayFromDate(date)
    const day = formatDate(date, 'D')
    const month = getMonthFromDate(date)
    return `${weekday} ${day} ${month}`
  }

  return (
    <>
      <Head>
        <title>Sasja HC | Wedstrijden</title>
      </Head>
      <main className="container space-y-8">
        <h1 className="sr-only">Aankomende wedstrijden</h1>
        {gameDays.map((gameDay) => (
          <section key={gameDay.date}>
            <h2 className="title1">{createDate(gameDay.date)}</h2>
            <div className="card mt-8 divide-y divide-light">
              {gameDay.games.map((game) => (
                  <Game key={game.id} game={game} teams={teams}/>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  )
}

function Game({ game, teams }: { game: GameModel; teams: TeamModel[]}) {
  const [showInfo, setShowInfo] = useState(false)

  const createTime = (time: string | null) => {
    if (!time) return ''

    const hours = time.split(':')[0]
    const minutes = time.split(':')[1]
    return `${hours}:${minutes}`
  }

  const homeTeam = findTeamName(game.home_short, game.home_id, teams)
  const awayTeam = findTeamName(game.away_short, game.away_id, teams)

  return (
      <div key={game.id} className="card-click p-4" onClick={() => setShowInfo(true)}>
        <div className="flex items-center justify-center">
          <div className="hidden flex-1 pr-4 tablet:block">
            { game.game_status_id == 6 ? (
              <p className="text-right text-sm text-dark">uitgst.</p>
            ) : (
              <p className="text-right text-sm text-dark">{createTime(game.time)}</p>
            )}
          </div>
          <div>
            <p className="rounded-sm bg-primary px-1.5 py-0.5 font-kanit text-xs text-white">
              {game.serie_name}
            </p>
          </div>
          <div className="hidden flex-1 pl-4 tablet:block">
            <p className="text-sm text-dark">{game.venue_name}</p>
          </div>
        </div>
        <div className="mt-4 flex divide-x divide-primary tablet:hidden">
          <div className="flex-1 pr-4">
            { game.game_status_id == 6 ? (
              <p className="text-right text-sm text-dark">uitgst.</p>
            ) : (
              <p className="text-right text-sm text-dark">{createTime(game.time)}</p>
            )}
          </div>
          <div className="flex-1 pl-4">
            <p className="text-sm text-dark">{game.venue_name}</p>
          </div>
        </div>
        <div className="mt-4 flex space-x-8">
          <div className="flex flex-1 flex-col-reverse items-end tablet:flex-row tablet:items-center tablet:justify-end tablet:space-x-4">
            <p className="mt-2 text-right font-kanit tablet:mt-0">
              {homeTeam}
            </p>
            <ClubLogo path={game.home_logo} size={40} />
          </div>
          <div
              className={clsx(
                  'flex items-center justify-center space-x-2 font-kanit',
                  game.score_status_id === 0 ? 'hidden' : 'block'
              )}
          >
            <p className="w-6 text-right">{game.home_score}</p>
            <p>{'-'}</p>
            <p className="w-6">{game.away_score}</p>
          </div>
          <div className="flex flex-1 flex-col tablet:flex-row tablet:items-center tablet:space-x-4">
            <ClubLogo path={game.away_logo} size={40} />
            <p className="mt-2 font-kanit tablet:mt-0">
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

export const getStaticProps: GetStaticProps = async () => {
  const teams = await queryToModels<TeamModel>(query(collection(db, 'teams')))
  const gameDays = await competitionService.getFutureGames()

  return {
    props: {
      gameDays: gameDays,
      teams: teams,
    },
    revalidate: 5 * 60,
  }
}
