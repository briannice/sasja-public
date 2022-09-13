import useImage from '@/hooks/useImage'
import { db } from '@/services/firebase'
import { docRefToModel, queryToModels } from '@/services/firebase/firestore'
import { EventModel } from '@/types/models'
import { formatDate, getMonthFromDate, getWeekDayFromDate } from '@/utils/date'
import { collection, doc, query } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  event: EventModel
}

export default function EventDetailPage({ event }: Props) {
  const router = useRouter()
  const image = useImage('events', event ? event.id : '', 'lg')

  if (router.isFallback) return <></>

  const formatTime = (time: string) => {
    const weekday = getWeekDayFromDate(time)
    const month = getMonthFromDate(time)
    const day = formatDate(time, 'D')
    return `${weekday} ${day} ${month}`
  }

  const tags = [formatTime(event.time), event.location, event.address]

  return (
    <main className="cms-content-wrapper">
      <h1>{event.name}</h1>
      <div className="mt-8 flex space-x-8">
        <div className="flex items-center rounded-sm bg-primary px-5 py-2 shadow">
          <p className="font-kanit text-sm text-white">Evenement</p>
        </div>
        {tags.map((tag, i) => (
          <div key={i} className="rounded-sm border-2 border-primary px-5 py-2">
            <p className="box-border font-kanit text-sm">{tag}</p>
          </div>
        ))}
      </div>
      <figure className="relative mt-8 h-80 overflow-hidden">
        {image && <Image src={image} alt="News image." layout="fill" objectFit="contain" />}
      </figure>
      <div className="cms-content" dangerouslySetInnerHTML={{ __html: event.content }} />
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await queryToModels<EventModel>(query(collection(db, 'events')))
  const pahts = events.map((event) => ({ params: { id: event.id } }))
  return {
    paths: pahts,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true }
  const id = params.id as string
  const event = await docRefToModel<EventModel>(doc(db, 'events', id))
  return {
    props: {
      event: event,
    },
  }
}
