import RankingTable from '@/components/teams/RankingTable'
import { db } from '@/services/firebase'
import { collectionToModels } from '@/services/firebase/firestore'
import { getHandballBelgiumRanking } from '@/services/hb/ranking'
import { RankModel, TeamModel } from '@/types/models'
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
        <RankingTable ranking={ranking} />
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
