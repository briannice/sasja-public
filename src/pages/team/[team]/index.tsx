import Competition from '@/components/teams/Competition'
import { db } from '@/services/firebase'
import { collectionToModels, docRefToModel } from '@/services/firebase/firestore'
import { getHandballBelgiumCalendar } from '@/services/hb/calendar'
import { getHandballBelgiumRanking } from '@/services/hb/ranking'
import { GameModel, RankModel, TeamModel } from '@/types/models'
import { collection, doc, getDocs, query } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

type Competition = {
  calendar: GameModel[]
  name: string
  ranking: RankModel[]
}

type Props = {
  competitions: Competition[]
  team: TeamModel
}

export default function TeamPage({ competitions, team }: Props) {
  return (
    <main>
      <h1 className="sr-only">{team.name}</h1>
      {competitions.map(({ calendar, name, ranking }) => (
        <Competition
          key={name}
          calendar={calendar}
          name={name}
          ranking={ranking}
          teamId={team.id}
        />
      ))}
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const teams = collectionToModels<TeamModel>(await getDocs(query(collection(db, 'teams'))))
  const paths = teams.map((team) => ({ params: { team: team.id } }))

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true }

  // Team information
  const id = params.team as string
  const team = await docRefToModel<TeamModel>(doc(db, 'teams', id))

  // Ranking information
  const competitions: Competition[] = []

  for (const competition of team.competitions) {
    const ranking = await getHandballBelgiumRanking(competition.serieId)
    const calendar = await getHandballBelgiumCalendar(competition.serieId)

    competitions.push({
      calendar: calendar,
      name: competition.name,
      ranking: ranking,
    })
  }

  // Props and ISR
  return {
    props: {
      competitions,
      team,
    },
    revalidate: 60 * 60,
  }
}
