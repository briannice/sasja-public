import ClubLogo from '@/components/teams/ClubLogo'
import { GameModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import clsx from 'clsx'
import React from 'react'

const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']

type Props = {
  calendar: GameModel[]
}

export default function CalendarTable({ calendar }: Props) {
  const createDate = (date: string) => {
    const day = formatDate(date, 'D')
    const month = months[+formatDate(date, 'M') - 1]
    return `${day} ${month}`
  }

  const createTime = (time: string) => {
    const hours = time.split(':')[0]
    const min = time.split(':')[1]
    return `${hours}:${min}`
  }

  const createLocation = (venue: string, location: string) => {
    return `${venue}, ${location}`
  }

  const createScore = (home: number, away: number) => {
    if (home === 0 && away === 0) return ''
    return `${home} - ${away}`
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
            <p>Datum</p>
          </th>
          <th>
            <p>Tijd</p>
          </th>
          <th>
            <p>Nr.</p>
          </th>
          <th>
            <p className="text-right">Thuis</p>
          </th>
          <th></th>
          <th>
            <p>Uit</p>
          </th>
          <th></th>
          <th>
            <p>Locatie</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {calendar.map((game) => (
          <tr key={game.id}>
            <td>
              <time>{createDate(game.date)}</time>
            </td>
            <td>
              <time>{createTime(game.time)}</time>
            </td>
            <td>
              <p>{game.game_number}</p>
            </td>
            <td>
              <div className="flex items-center justify-end space-x-4">
                <span>{game.home_short}</span>
                <ClubLogo path={game.home_logo} size={20} />
              </div>
            </td>
            <td>
              <p>{createScore(game.home_score, game.away_score)}</p>
            </td>
            <td>
              <div className="flex items-center space-x-4">
                <ClubLogo path={game.away_logo} size={20} />
                <p>{game.away_short}</p>
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
            <td>
              <p>{createLocation(game.venue_short, game.venue_city)}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
