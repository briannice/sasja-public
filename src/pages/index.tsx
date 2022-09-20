import Hero from '@/components/home/Hero'
import News from '@/components/home/News'
import TicketsAndAbos from '@/components/home/TicketsAndAbos'
import { db } from '@/services/firebase'
import { createTimeLine, queryToModels } from '@/services/firebase/firestore'
import { getHandballBelgiumGameweeks } from '@/services/hb/gameweek'
import {
  EventModel,
  GameWeek,
  MatchReportModel,
  NewsModel,
  OpponentModel,
  TeamModel,
  TimeLine,
} from '@/types/models'
import { collection, limit, orderBy, query, Timestamp, where } from 'firebase/firestore'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

type Props = {
  newsTimeLine: TimeLine
  heroTimeLine: TimeLine
  teams: TeamModel[]
  opponents: OpponentModel[]
  gameWeek: GameWeek
}

export default function Home({ newsTimeLine, heroTimeLine, teams, opponents, gameWeek }: Props) {
  return (
    <>
      <Head>
        <title>Sasja HC | Home</title>
      </Head>
      <main>
        <h1 className="sr-only">Sasja HC | Home</h1>
        <Hero timeLine={heroTimeLine} teams={teams} gameWeek={gameWeek} />
        <News timeLine={newsTimeLine} opponents={opponents} teams={teams} />
        <TicketsAndAbos />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await queryToModels<EventModel>(
    query(
      collection(db, 'events'),
      where('public', '==', true),
      where('time', '>=', Timestamp.now()),
      orderBy('time', 'desc')
    )
  )

  const news = await queryToModels<NewsModel>(
    query(
      collection(db, 'news'),
      where('public', '==', true),
      where('pinned', '==', true),
      orderBy('time', 'desc')
    )
  )

  const matchReports = await queryToModels<MatchReportModel>(
    query(
      collection(db, 'matchreport'),
      where('public', '==', true),
      orderBy('time', 'desc'),
      limit(10)
    )
  )

  const newsTimeLine = createTimeLine(events, news, matchReports)
  const heroTimeLine = createTimeLine(events, news, [])

  const teams = await queryToModels<TeamModel>(query(collection(db, 'teams')))
  const opponents = await queryToModels<OpponentModel>(query(collection(db, 'opponents')))

  const gameWeeks = await getHandballBelgiumGameweeks(1)

  return {
    props: {
      teams,
      opponents,
      newsTimeLine,
      heroTimeLine,
      gameWeek: gameWeeks[0],
    },
    revalidate: 5 * 60,
  }
}
