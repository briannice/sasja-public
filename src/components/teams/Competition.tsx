import Container from '@/components/Container'
import Link from '@/components/Link'
import ClubLogo from '@/components/teams/ClubLogo'
import { GameModel, RankModel } from '@/types/models'
import clsx from 'clsx'
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  calendar: GameModel[]
  name: string
  ranking: RankModel[]
  teamId: string
}

export default function Competition({ calendar, name, ranking, teamId }: Props) {
  const createScore = (home: number, away: number) => {
    if (home === 0 && away === 0) return ''
    return `${home} - ${away}`
  }

  return (
    <Container className="grid grid-cols-2 gap-8">
      <h2 className="title1 col-span-2">{name}</h2>
      <div className="flex flex-col items-center space-y-8">
        <table>
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
            {ranking.map((rank) => (
              <tr key={rank.id} className={clsx(rank.name === 'Sasja HC' && 'font-bold')}>
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
            ))}
          </tbody>
        </table>
        <Link
          href={`/team/${teamId}/klassement/${name.toLocaleLowerCase().replaceAll(/\ /g, '-')}`}
          className="btn btn-primary btn-text-icon"
        >
          <span>Volledig klassement</span>
          <RiArrowRightSLine />
        </Link>
      </div>
      <div className="flex flex-col items-center space-y-8">
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
              <tr key={game.id}>
                <td>
                  <div className="flex items-center justify-end space-x-4">
                    <p className="whitespace-nowrap">{game.home_short}</p>
                    <ClubLogo path={game.home_logo} size={20} />
                  </div>
                </td>
                <td>
                  <p className="whitespace-nowrap text-center">
                    {createScore(game.home_score, game.away_score)}
                  </p>
                </td>
                <td>
                  <div className="flex items-center space-x-4">
                    <ClubLogo path={game.away_logo} size={20} />
                    <p className="whitespace-nowrap">{game.away_short}</p>
                  </div>
                </td>
                <td>
                  {game.game_status_id === 2 && (
                    <p
                      className={clsx(
                        'flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white',
                        game.home_score === game.away_score
                          ? 'bg-warning'
                          : game.home_score > game.away_score && game.home_name === 'Sasja HC'
                          ? 'bg-success'
                          : game.home_score < game.away_score && game.away_name === 'Sasja HC'
                          ? 'bg-success'
                          : 'bg-error'
                      )}
                    >
                      {game.home_score === game.away_score
                        ? 'D'
                        : game.home_score > game.away_score && game.home_name === 'Sasja HC'
                        ? 'W'
                        : game.home_score < game.away_score && game.away_name === 'Sasja HC'
                        ? 'W'
                        : 'L'}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link
          href={`/team/${teamId}/kalender/${name.toLocaleLowerCase().replaceAll(/\ /g, '-')}`}
          className="btn btn-primary btn-text-icon"
        >
          <span>Volledige kalender</span>
          <RiArrowRightSLine />
        </Link>
      </div>
    </Container>
  )
}