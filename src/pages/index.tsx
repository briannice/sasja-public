import Tiles from '@/components/home/Tiles'
import { db } from '@/services/firebase'
import { collectionToModels } from '@/services/firebase/firestore'
import { EventModel } from '@/types/models'
import { collection, getDocs, query } from 'firebase/firestore'
import { GetStaticProps } from 'next'
import React from 'react'

type Props = {
  events: EventModel[]
}

export default function Home({ events }: Props) {
  return (
    <main>
      <h1 className="sr-only">Sajsa HC</h1>

      <Tiles events={events} />
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = collectionToModels<EventModel>(await getDocs(query(collection(db, 'events'))))

  return {
    props: {
      events,
    },
  }
}
