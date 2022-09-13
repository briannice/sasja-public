import RankingTable from '@/components/teams/RankingTable'
import { db } from '@/services/firebase'
import { docRefToModel, queryToModels } from '@/services/firebase/firestore'
import { getHandballBelgiumRanking } from '@/services/hb/ranking'
import { RankModel, TeamModel } from '@/types/models'
import { collection, doc, query } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

type Props = {
  ranking: RankModel[]
  name: string
}

export default function CalendarPage({ ranking, name }: Props) {
  return (
    <main>
      <h1 className="sr-only">Klassement | {name}</h1>
      <section className="container space-y-8 py-16">
        <h2 className="title1">{name}</h2>
        <RankingTable ranking={ranking} />
      </section>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const teams = await queryToModels<TeamModel>(query(collection(db, 'teams')))
  const paths: any = []
  teams.forEach((team) => {
    const id = team.id
    team.competitions.forEach((competition) => {
      const path = {
        params: {
          team: id,
          serie: competition.name.toLocaleLowerCase().replaceAll(/\ /g, '-'),
        },
      }
      paths.push(path)
    })
  })
  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true }

  const teamId = params.team as string
  const team = await docRefToModel<TeamModel>(doc(db, 'teams', teamId))

  const serieName = params.serie as string
  const competition = team.competitions.find(
    (c) => c.name.toLocaleLowerCase().replaceAll(/\ /g, '-') === serieName
  )

  if (!competition) return { notFound: true }

  const serieId = competition.serieId
  const ranking = await getHandballBelgiumRanking(serieId)

  return {
    props: {
      ranking: ranking,
      name: competition.name,
    },
    revalidate: 60 * 60,
  }
}
