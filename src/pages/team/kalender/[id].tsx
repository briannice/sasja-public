import { db } from '@/services/firebase'
import { collectionToModels } from '@/services/firebase/firestore'
import { getHandballBelgiumLogo } from '@/services/hb'
import { getHandballBelgiumCalendar } from '@/services/hb/calendar'
import { GameModel, TeamModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import { collection, getDocs, query } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React from 'react'

type Props = {
  calendar: GameModel[]
}

export default function RankingPage({ calendar }: Props) {
  return (
    <main>
      <h1 className="sr-only">Klassement</h1>
      <div className="container py-16">
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
              const homeLogoUrl = getHandballBelgiumLogo(game.home_club_logo_img_url)
              const awayLogoUrl = getHandballBelgiumLogo(game.away_club_logo_img_url)

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
                      <span>{game.home_team_short_name}</span>
                    </div>
                  </td>
                  <td></td>
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
      </div>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const teams = collectionToModels<TeamModel>(await getDocs(query(collection(db, 'teams'))))
  const serieIds: string[] = []

  teams.forEach((team) => {
    team.competitions.forEach((competition) => {
      serieIds.push(`${competition.serieId}`)
    })
  })

  const paths = serieIds.map((serieId) => ({ params: { id: serieId } }))

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true }

  const serieId = params.id as string
  const calendar = await getHandballBelgiumCalendar(+serieId)

  return {
    props: {
      calendar,
    },
    revalidate: 30 * 60,
  }
}
