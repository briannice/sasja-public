import MatchReportOverview from '@/components/MatchReportOverview'
import Competition from '@/components/teams/Competition'
import useImage from '@/hooks/useImage'
import { db } from '@/services/firebase'
import { collectionToModels, docRefToModel, queryToModels } from '@/services/firebase/firestore'
import { GameModel, MatchReportModel, RankModel, TeamModel } from '@/types/models'
import { collection, doc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { competitionService } from '@/services/competitions/competition'

type Competition = {
  calendar: GameModel[]
  name: string
  ranking: RankModel[]
}

type Props = {
  competitions: Competition[]
  team: TeamModel
  initialMatchReports: MatchReportModel[]
}

export default function TeamPage({ competitions, team, initialMatchReports }: Props) {
  const image = useImage('teams', team.id, 'lg')

  return (
    <>
      <Head>
        <title>{`Sasja HC | ${team.name}`}</title>
      </Head>
      <main>
        <h1 className="title1 mt-8">{team.name}</h1>
        <div className="mt-8 flex justify-center">
          <figure className="relative aspect-video w-full tablet:h-80 tablet:w-auto">
            {image && (
              <Image src={image} alt="Team Image" fill style={{ objectFit: 'cover' }} unoptimized />
            )}
          </figure>
        </div>

        <MatchReportOverview initialMatchReports={initialMatchReports} teamId={team.id} />

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
    fallback: 'blocking',
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
    const ranking = competition.ranking
      ? await competitionService.getCompetitionRanking(competition)
      : []
    const calendar = await competitionService.getCompetitionCalendar(competition, false)

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
      where('team.id', '==', team.id),
      orderBy('time', 'desc'),
      limit(10)
    )
  )

  const key = team.id

  // Props and ISR
  return {
    props: {
      competitions,
      team,
      initialMatchReports,
      key,
    },
    revalidate: 5 * 60,
  }
}
