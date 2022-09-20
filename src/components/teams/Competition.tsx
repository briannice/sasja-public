import Container from '@/components/Container'
import Link from '@/components/Link'
import ClubLogo from '@/components/teams/ClubLogo'
import { GameModel, RankModel } from '@/types/models'
import { formatDate } from '@/utils/date'
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
    return `${home} - ${away}`
  }

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
        </div>
        <div className="flex justify-center">
          <Link
            href={`/team/${teamId}/klassement/${name.toLocaleLowerCase().replaceAll(/\ /g, '-')}`}
            className="btn btn-primary btn-text-icon"
          >
            <span>Volledig klassement</span>
            <RiArrowRightSLine />
          </Link>
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
                <tr key={game.id}>
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
                      <p className="text-center text-sm text-dark">
                        {formatDate(game.date, 'DD/MM')}
                      </p>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center space-x-4">
                      <ClubLogo path={game.away_logo} size={20} />
                      <p>{game.away_short}</p>
                    </div>
                  </td>
                  <td>
                    {game.score_status_id === 1 && (
                      <p
                        className={clsx(
                          'flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white',
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
        </div>
        <div className="flex justify-center">
          <Link
            href={`/team/${teamId}/kalender/${name.toLocaleLowerCase().replaceAll(/\ /g, '-')}`}
            className="btn btn-primary btn-text-icon"
          >
            <span>Volledige kalender</span>
            <RiArrowRightSLine />
          </Link>
        </div>
      </div>
    </Container>
  )
}
