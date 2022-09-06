import { db } from '@/services/firebase'
import { collectionToModels } from '@/services/firebase/firestore'
import { getHandballBelgiumRanking } from '@/services/hb/ranking'
import { RankModel, TeamModel } from '@/types/models'
import clsx from 'clsx'
import { collection, getDocs, query } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

type Props = {
  ranking: RankModel[]
}

export default function RankingPage({ ranking }: Props) {
  return (
    <main>
      <h1 className="sr-only">Klassement</h1>
      <div className="container py-16">
        <table className="text-center">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-right">Team</th>
              <th className="text-center">P</th>
              <th className="text-center">G</th>
              <th className="text-center">W</th>
              <th className="text-center">D</th>
              <th className="text-center">L</th>
              <th className="text-center">+/-</th>
              <th className="text-center">+</th>
              <th className="text-center">-</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((rank) => (
              <tr key={rank.id}>
                <td>{rank.position}</td>
                <td className="text-right">{rank.team_name}</td>
                <td className="font-bold">{rank.points}</td>
                <td>{rank.played}</td>
                <td>{rank.wins}</td>
                <td>{rank.draws}</td>
                <td>{rank.losses}</td>
                <td>{rank.score_for - rank.score_against}</td>
                <td>{rank.score_for}</td>
                <td>{rank.score_against}</td>
                <td>
                  <ul className="flex items-center">
                    {rank.result_sequence
                      .replaceAll(/\"|\[|\]/g, '')
                      .split(',')
                      .map((type, i) => (
                        <li key={i}>
                          <p
                            className={clsx(
                              'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white',
                              type === 'W' && 'bg-success',
                              type === 'D' && 'bg-warning',
                              type === 'L' && 'bg-error'
                            )}
                          >
                            {type}
                          </p>
                        </li>
                      ))}
                  </ul>
                </td>
              </tr>
            ))}
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
  const ranking = await getHandballBelgiumRanking(+serieId)

  return {
    props: {
      ranking,
    },
    revalidate: 30 * 60,
  }
}
