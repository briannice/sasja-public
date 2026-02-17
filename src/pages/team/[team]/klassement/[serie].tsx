import RankingTable from '@/components/teams/RankingTable'
import { db } from '@/services/firebase'
import { docRefToModel } from '@/services/firebase/firestore'
import { competitionService } from '@/services/competitions/competition'
import { RankModel, TeamModel } from '@/types/models'
import { doc } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

type Props = {
  ranking: RankModel[]
  name: string
}

export default function CalendarPage({ ranking, name }: Props) {
  return (
    <>
      <Head>
        <title>{`Sasja HC | ${name}`}</title>
      </Head>

      <main>
        <h1 className="sr-only">Klassement | {name}</h1>
        <section className="container space-y-8 py-16">
          <h2 className="title1">{name}</h2>
          <RankingTable ranking={ranking} />
        </section>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true }

  const teamId = params.team as string
  const team = await docRefToModel<TeamModel>(doc(db, 'teams', teamId))

  const serieName = params.serie as string
  const competition = team.competitions.find(
    (c) => c.name.toLocaleLowerCase().replaceAll(/ /g, '-') === serieName
  )

  if (!competition) return { notFound: true }

  const ranking = await competitionService.getCompetitionRanking(competition)

  return {
    props: {
      ranking: ranking,
      name: competition.name,
    },
    revalidate: 5 * 60,
  }
}
