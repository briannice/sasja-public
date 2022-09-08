import TicketsAndAbos from '@/components/home/TicketsAndAbos'
import { db } from '@/services/firebase'
import { queryToModels } from '@/services/firebase/firestore'
import { EventModel, MatchReportModel, NewsModel, OpponentModel, TeamModel } from '@/types/models'
import { collection, query } from 'firebase/firestore'
import { GetStaticProps } from 'next'
import React from 'react'

type Props = {
  events: EventModel[]
  news: NewsModel[]
  teams: TeamModel[]
  opponents: OpponentModel[]
  matchReports: MatchReportModel[]
}

export default function Home({}: Props) {
  return (
    <main>
      <h1 className="sr-only">Sajsa HC</h1>
      <TicketsAndAbos />
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = queryToModels<EventModel>(query(collection(db, 'events')))
  const news = queryToModels<NewsModel>(query(collection(db, 'news')))
  const teams = queryToModels<TeamModel>(query(collection(db, 'teams')))
  const opponents = queryToModels<OpponentModel>(query(collection(db, 'opponents')))
  const matchReports = queryToModels<MatchReportModel>(query(collection(db, 'matchreport')))

  return {
    props: {
      events,
      news,
      teams,
      opponents,
      matchReports,
    },
    revalidate: 2 * 60,
  }
}
