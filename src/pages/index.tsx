import Hero from '@/components/home/Hero'
import News from '@/components/home/News'
import TicketsAndAbos from '@/components/home/TicketsAndAbos'
import { db } from '@/services/firebase'
import { queryToModels } from '@/services/firebase/firestore'
import { getHandballBelgiumGameweeks } from '@/services/hb/gameweek'
import {
  EventModel,
  GameWeek,
  MatchReportModel,
  NewsModel,
  OpponentModel,
  TeamModel,
} from '@/types/models'
import { collection, query } from 'firebase/firestore'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

type Props = {
  events: EventModel[]
  news: NewsModel[]
  teams: TeamModel[]
  opponents: OpponentModel[]
  matchReports: MatchReportModel[]
  gameWeeks: GameWeek[]
}

export default function Home({ events, teams, matchReports, news, opponents, gameWeeks }: Props) {
  return (
    <>
      <Head>
        <title>Sasja HC | Home</title>
      </Head>
      <main>
        <h1 className="sr-only">Sasja HC | Home</h1>
        <Hero events={events} news={news} />
        <News
          events={events}
          matchReports={matchReports}
          news={news}
          opponents={opponents}
          teams={teams}
          gameWeeks={gameWeeks}
        />
        <TicketsAndAbos />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await queryToModels<EventModel>(query(collection(db, 'events')))
  const news = await queryToModels<NewsModel>(query(collection(db, 'news')))
  const teams = await queryToModels<TeamModel>(query(collection(db, 'teams')))
  const opponents = await queryToModels<OpponentModel>(query(collection(db, 'opponents')))
  const matchReports = await queryToModels<MatchReportModel>(query(collection(db, 'matchreport')))
  const gameWeeks = await getHandballBelgiumGameweeks(1)

  return {
    props: {
      events,
      news,
      teams,
      opponents,
      matchReports,
      gameWeeks,
    },
    revalidate: 2 * 60,
  }
}
