import Container from '@/components/Container'
import Link from '@/components/Link'
import { getHandballBelgiumLogo } from '@/services/hb'
import { GameModel, RankModel } from '@/types/models'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  calendar: GameModel[]
  name: string
  ranking: RankModel[]
  serieId: number
}

export default function Competition({ calendar, name, ranking, serieId }: Props) {
  return (
    <Container className="grid grid-cols-2 gap-8">
      <h2 className="col-span-2 text-3xl">{name}</h2>
      <div className="flex flex-col items-center space-y-8">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th className="text-right">Ptn</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((rank) => (
              <tr key={rank.id} className={clsx(rank.name === 'Sasja HC' && 'font-bold')}>
                <td>{rank.position}</td>
                <td>{rank.short}</td>
                <td className="text-right">{rank.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href={`/team/klassement/${serieId}`} className="btn btn-primary btn-text-icon">
          <span>Volledig klassement</span>
          <RiArrowRightSLine />
        </Link>
      </div>
      <div className="flex flex-col items-center space-y-8">
        <table>
          <thead>
            <tr>
              <th>Thuis</th>
              <th className="px-0"></th>
              <th className="px-1"></th>
              <th className="px-0"></th>
              <th className="text-right">Uit</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((game) => {
              const homeLogoUrl = getHandballBelgiumLogo(game.home_club_logo_img_url)
              const awayLogoUrl = getHandballBelgiumLogo(game.away_club_logo_img_url)
              return (
                <tr key={game.id}>
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
                      <span>{game.home_team_short_name}</span>
                    </div>
                  </td>
                  <td className="px-0">
                    {game.game_status_id === 2 && <span>{game.home_score}</span>}
                  </td>
                  <td className="px-1">{game.game_status_id === 2 && <span>{`-`}</span>}</td>
                  <td className="px-0 text-left">
                    {game.game_status_id === 2 && <span>{game.away_score}</span>}
                  </td>
                  <td>
                    <div className="flex items-center justify-end space-x-4">
                      <p>{game.away_team_short_name}</p>
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
                    {game.game_status_id === 2 && (
                      <p
                        className={clsx(
                          'flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white',
                          game.home_score === game.away_score
                            ? 'bg-warning'
                            : game.home_score > game.away_score &&
                              game.home_team_name === 'Sasja HC'
                            ? 'bg-success'
                            : game.home_score < game.away_score &&
                              game.away_team_name === 'Sasja HC'
                            ? 'bg-success'
                            : 'bg-error'
                        )}
                      >
                        {game.home_score === game.away_score
                          ? 'D'
                          : game.home_score > game.away_score && game.home_team_name === 'Sasja HC'
                          ? 'W'
                          : game.home_score < game.away_score && game.away_team_name === 'Sasja HC'
                          ? 'W'
                          : 'L'}
                      </p>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Link href={`/team/kalender/${serieId}`} className="btn btn-primary btn-text-icon">
          <span>Volledige kalender</span>
          <RiArrowRightSLine />
        </Link>
      </div>
    </Container>
  )
}
