import TicketsAndAbos from '@/components/home/TicketsAndAbos'
import { db } from '@/services/firebase'
import { collectionToModels } from '@/services/firebase/firestore'
import { EventModel, MatchReportModel, NewsModel, OpponentModel, TeamModel } from '@/types/models'
import { collection, getDocs, query } from 'firebase/firestore'
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
  const events = collectionToModels<EventModel>(await getDocs(query(collection(db, 'events'))))
  const news = collectionToModels<NewsModel>(await getDocs(query(collection(db, 'news'))))
  const teams = collectionToModels<TeamModel>(await getDocs(query(collection(db, 'teams'))))
  const opponents = collectionToModels<OpponentModel>(
    await getDocs(query(collection(db, 'opponents')))
  )
  const matchReports = collectionToModels<MatchReportModel>(
    await getDocs(query(collection(db, 'matchreport')))
  )

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
