import Tiles from '@/components/home/Tiles'
import { db } from '@/services/firebase'
import { collectionToModels } from '@/services/firebase/firestore'
import { EventModel, NewsModel } from '@/types/models'
import { collection, getDocs, query } from 'firebase/firestore'
import { GetStaticProps } from 'next'
import React from 'react'

type Props = {
  events: EventModel[]
  news: NewsModel[]
}

export default function Home({ events, news }: Props) {
  return (
    <main>
      <h1 className="sr-only">Sajsa HC</h1>

      <Tiles events={events} news={news} />
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = collectionToModels<EventModel>(await getDocs(query(collection(db, 'events'))))
  const news = collectionToModels<NewsModel>(await getDocs(query(collection(db, 'news'))))

  return {
    props: {
      events,
      news,
    },
    revalidate: 2 * 60,
  }
}
