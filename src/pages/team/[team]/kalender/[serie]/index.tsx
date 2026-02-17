import CalendarTable from '@/components/teams/CalendarTable'
import { db } from '@/services/firebase'
import { docRefToModel } from '@/services/firebase/firestore'
import { GameModel, TeamModel } from '@/types/models'
import { doc } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { competitionService } from '@/services/competitions/competition'

type Props = {
  name: string
  calendar: GameModel[]
}

export default function CalendarPage({ name, calendar }: Props) {
  return (
    <>
      <Head>
        <title>{`Sasja HC | ${name}`}</title>
      </Head>
      <main>
        <h1 className="sr-only">Wedstrijden | {name}</h1>
        <section className="container space-y-8 py-16">
          <h2 className="title1">{name}</h2>
          <CalendarTable calendar={calendar} />
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

  const calendar = await competitionService.getCompetitionCalendar(competition, false)

  return {
    props: {
      name: competition.name,
      calendar: calendar,
    },
    revalidate: 5 * 60,
  }
}
