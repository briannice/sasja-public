import Container from '@/components/Container'
import MatchReportOverview from '@/components/MatchReportOverview'
import Competition from '@/components/teams/Competition'
import useImage from '@/hooks/useImage'
import { db } from '@/services/firebase'
import { collectionToModels, docRefToModel, queryToModels } from '@/services/firebase/firestore'
import { getHandballBelgiumCalendar } from '@/services/hb/calendar'
import { getHandballBelgiumRanking } from '@/services/hb/ranking'
import { GameModel, MatchReportModel, OpponentModel, RankModel, TeamModel } from '@/types/models'
import { collection, doc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

type Competition = {
  calendar: GameModel[]
  name: string
  ranking: RankModel[]
}

type Props = {
  competitions: Competition[]
  team: TeamModel
  initialMatchReports: MatchReportModel[]
  teams: TeamModel[]
  opponents: OpponentModel[]
}

export default function TeamPage({
  competitions,
  team,
  initialMatchReports,
  opponents,
  teams,
}: Props) {
  const image = useImage('teams', team.id, 'lg')

  return (
    <>
      <Head>
        <title>{`Sasja HC | ${team.name}`}</title>
      </Head>
      <main>
        <h1 className="sr-only">{team.name}</h1>
        <Container card={true} className="grid grid-cols-2 gap-8 p-8">
          <div className="divide-y divide-primary">
            <h2 className="text-4xl font-bold">{team.name}</h2>
          </div>
          <div>
            <figure className="relative aspect-video">
              {image && <Image src={image} alt="Team Image" layout="fill" objectFit="cover" />}
            </figure>
          </div>
        </Container>

        <MatchReportOverview
          initialMatchReports={initialMatchReports}
          teams={teams}
          opponents={opponents}
          teamId={team.id}
        />

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
    </>
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

  // Matchreports
  const initialMatchReports = await queryToModels<MatchReportModel>(
    query(
      collection(db, 'matchreport'),
      where('public', '==', true),
      where('teamId', '==', team.id),
      orderBy('time', 'desc'),
      limit(10)
    )
  )

  const teams = await queryToModels<TeamModel>(query(collection(db, 'teams')))
  const opponents = await queryToModels<OpponentModel>(query(collection(db, 'opponents')))

  // Props and ISR
  return {
    props: {
      competitions,
      team,
      initialMatchReports,
      teams,
      opponents,
    },
    revalidate: 60 * 60,
  }
}
