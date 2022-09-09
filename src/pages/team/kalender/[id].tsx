import CalendarTable from '@/components/teams/CalendarTable'
import { db } from '@/services/firebase'
import { collectionToModels } from '@/services/firebase/firestore'
import { getHandballBelgiumCalendar } from '@/services/hb/calendar'
import { GameModel, TeamModel } from '@/types/models'
import { collection, getDocs, query } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

type Props = {
  calendar: GameModel[]
}

export default function RankingPage({ calendar }: Props) {
  return (
    <main>
      <h1 className="sr-only">Klassement</h1>
      <div className="container py-16">
        <CalendarTable calendar={calendar} />
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
