import { getHandballBelgiumLogo } from '@/services/hb'
import { GameModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import Image from 'next/image'
import React from 'react'

type Props = {
  calendar: GameModel[]
}

export default function CalendarTable({ calendar }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Datum</th>
          <th>Tijd</th>
          <th>Thuis</th>
          <th>Score</th>
          <th>Uit</th>
          <th>Locatie</th>
          <th>Stad</th>
        </tr>
      </thead>
      <tbody>
        {calendar.map((game) => {
          const homeLogoUrl = getHandballBelgiumLogo(game.home_logo)
          const awayLogoUrl = getHandballBelgiumLogo(game.away_logo)

          return (
            <tr key={game.id}>
              <td>
                <time>{formatDate(game.date, 'DD/MM')}</time>
              </td>
              <td>
                <p>{`${game.time.split(':')[0]}:${game.time.split(':')[1]}`}</p>
              </td>
              <td>
                <div className="flex items-center space-x-4">
                  <figure className="relative aspect-square h-6">
                    <Image
                      src={homeLogoUrl}
                      alt="Home team logo"
                      layout="fill"
                      objectFit="contain"
                    />
                  </figure>
                  <span>{game.home_short}</span>
                </div>
              </td>
              <td></td>
              <td>
                <div className="flex items-center justify-end space-x-4">
                  <p>{game.away_short}</p>
                  <figure className="relative ml-auto aspect-square h-6">
                    <Image
                      src={awayLogoUrl}
                      alt="Away team logo"
                      layout="fill"
                      objectFit="contain"
                    />
                  </figure>
                </div>
              </td>
              <td>
                <p>{game.venue_name}</p>
              </td>
              <td>
                <p>{game.venue_city}</p>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
