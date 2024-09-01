import React, { useState } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

import Container from '@/components/Container'
import Link from '@/components/Link'
import Popup from '@/components/Popup'
import ClubLogo from '@/components/teams/ClubLogo'
import GameDetail from '@/components/teams/GameDetail'

import { GameModel, RankModel } from '@/types/models'

import { formatDate } from '@/utils/date'
import { cn } from '@/utils/utils'

type Props = {
  calendar: GameModel[]
  name: string
  ranking: RankModel[]
  teamId: string
}

export default function Competition({ calendar, name, ranking, teamId }: Props) {
  return (
    <Container className="grid grid-cols-1 gap-8 desktop:grid-cols-2">
      <h2 className="title1 col-span-1 desktop:col-span-2">{name}</h2>
      <div className="space-y-8">
        <div className="overflow-auto">
          <table className="overflow-x-scroll">
            <thead>
              <tr>
                <th>
                  <p>#</p>
                </th>
                <th>
                  <p>Team</p>
                </th>
                <th className="text-right">
                  <p>Ptn</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {ranking.length > 0 ? (
                ranking.map((rank) => (
                  <tr key={rank.id} className={cn(rank.name === 'Sasja HC' && 'font-bold')}>
                    <td>
                      <p>{rank.position}</p>
                    </td>
                    <td>
                      <div className="flex items-center space-x-4">
                        <ClubLogo path={rank.logo} size={20} />
                        <p>{rank.short}</p>
                      </div>
                    </td>
                    <td className="text-right">
                      <p>{rank.points}</p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td>Geen Rangschikking</td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          {ranking.length > 0 && (
            <Link
              href={`/team/${teamId}/klassement/${name.toLocaleLowerCase().replaceAll(/\ /g, '-')}`}
              className="btn btn-primary btn-text-icon"
            >
              <span>Volledig klassement</span>
              <RiArrowRightSLine />
            </Link>
          )}
        </div>
      </div>
      <div className="space-y-8">
        <div className="overflow-auto">
          <table>
            <thead>
              <tr>
                <th className="text-right">
                  <p>Thuis</p>
                </th>
                <th>
                  <p></p>
                </th>
                <th>
                  <p>Uit</p>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {calendar.map((game) => (
                <Game key={game.id} game={game} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center space-x-2">
          <Link
            href={`/team/${teamId}/kalender/${name.toLocaleLowerCase().replaceAll(/\ /g, '-')}`}
            className="btn btn-primary btn-text-icon"
          >
            <span>Wedstrijden SASJA</span>
            <RiArrowRightSLine />
          </Link>
          <Link
            href={`/team/${teamId}/kalender/${name.toLocaleLowerCase().replaceAll(/\ /g, '-')}/full`}
            className="btn btn-primary btn-text-icon"
          >
            <span>Alle wedstrijden</span>
            <RiArrowRightSLine />
          </Link>
        </div>
      </div>
    </Container>
  )
}

function Game({ game }: { game: GameModel }) {
  const [showInfo, setShowInfo] = useState(false)

  const createScore = (home: number, away: number) => {
    if (home === 0 && away === 0) return ''
    return `${home} - ${away}`
  }
  return (
    <tr className="card-click p-4" onClick={() => setShowInfo(true)}>
      <td>
        <div className="flex items-center justify-end space-x-4">
          <p>{game.home_short}</p>
          <ClubLogo path={game.home_logo} size={20} />
        </div>
      </td>
      <td>
        {game.score_status_id !== 0 ? (
          <p className="text-center">{createScore(game.home_score, game.away_score)}</p>
        ) : (
          <p className="text-center text-sm text-dark">{formatDate(game.date, 'DD/MM')}</p>
        )}
      </td>
      <td>
        <div className="flex items-center space-x-4">
          <ClubLogo path={game.away_logo} size={20} />
          <p>{game.away_short}</p>
        </div>
      </td>
      <td>
        {game.score_status_id > 0 && (
          <p
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white',
              game.home_score === game.away_score
                ? 'bg-warning'
                : game.home_score > game.away_score && game.home_name.includes('Sasja HC')
                  ? 'bg-success'
                  : game.home_score < game.away_score && game.away_name.includes('Sasja HC')
                    ? 'bg-success'
                    : 'bg-error'
            )}
          >
            {game.home_score === game.away_score
              ? 'D'
              : game.home_score > game.away_score && game.home_name.includes('Sasja HC')
                ? 'W'
                : game.home_score < game.away_score && game.away_name.includes('Sasja HC')
                  ? 'W'
                  : 'L'}
          </p>
        )}
      </td>
      <Popup open={showInfo} onClose={setShowInfo}>
        <GameDetail game={game} />
      </Popup>
    </tr>
  )
}
