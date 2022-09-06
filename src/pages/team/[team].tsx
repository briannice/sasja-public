import Competition from '@/components/Competition'
import { db } from '@/services/firebase'
import { collectionToModels } from '@/services/firebase/firestore'
import { getHandballBelgiumCalendar } from '@/services/hb/calendar'
import { getHandballBelgiumRanking } from '@/services/hb/ranking'
import { GameModel, RankModel, TeamModel } from '@/types/models'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

type Competition = {
  calendar: GameModel[]
  name: string
  ranking: RankModel[]
  serieId: number
}

type Props = {
  competitions: Competition[]
  team: TeamModel
}

export default function TeamPage({ competitions, team }: Props) {
  return (
    <main>
      <h1 className="sr-only">{team.name}</h1>
      {competitions.map(({ calendar, name, ranking, serieId }) => (
        <Competition
          key={name}
          calendar={calendar}
          name={name}
          ranking={ranking}
          serieId={serieId}
        />
      ))}
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const teams = collectionToModels<TeamModel>(await getDocs(query(collection(db, 'teams'))))
  const paths = teams.map((team) => ({ params: { team: team.uid } }))

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true }

  // Team information
  const uid = params.team as string
  const team = collectionToModels<TeamModel>(
    await getDocs(query(collection(db, 'teams'), where('uid', '==', uid)))
  )[0]

  // Ranking information
  const competitions: Competition[] = []

  for (const competition of team.competitions) {
    const ranking = await getHandballBelgiumRanking(competition.serieId)
    const calendar = await getHandballBelgiumCalendar(competition.serieId)

    competitions.push({
      calendar: calendar,
      name: competition.name,
      ranking: ranking,
      serieId: competition.serieId,
    })
  }

  // Props and ISR
  return {
    props: {
      competitions,
      team,
    },
    revalidate: 30 * 60,
  }
}
