import { db } from '@/services/firebase'
import { docRefToModel } from '@/services/firebase/firestore'
import { downloadDefaultEventImage, downloadImage } from '@/services/firebase/storage'
import { EventModel } from '@/types/models'
import { formatDate, getMonthFromDate, getWeekDayFromDate } from '@/utils/date'
import { doc } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  event: EventModel
  image: string | null
  defaultImage: string
}

export default function EventDetailPage({ event, image, defaultImage }: Props) {
  const router = useRouter()

  if (router.isFallback) return <></>

  const formatTimeDate = (time: string) => {
    const weekday = getWeekDayFromDate(time)
    const month = getMonthFromDate(time)
    const day = formatDate(time, 'D')
    return `${weekday} ${day} ${month}`
  }

  const formatTime = (time: string) => {
    return `${formatDate(time, 'HHumm')}`
  }

  const tags = [formatTimeDate(event.time), formatTime(event.time), event.location, event.address]

  return (
    <>
      <Head>
        <title>{`Sasja HC | ${event.name}`}</title>

        <meta property="og:url" content={`https://www.sasja-antwerpen.com/evenement/${event.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={event.name} />
        <meta property="og:description" content="" />
        <meta property="og:image" content={image ? image : defaultImage} />
      </Head>
      <main className="cms-content-wrapper">
        <h1>{event.name}</h1>
        <ul className="tag-wrapper">
          <li className="tag-fill">
            <p>Evenement</p>
          </li>
          {tags.map((tag, i) => (
            <li key={i} className="tag-outline">
              <p>{tag}</p>
            </li>
          ))}
        </ul>
        {image && (
          <figure>
            <Image src={image} alt="News image." fill style={{ objectFit: 'cover' }} unoptimized />
          </figure>
        )}
        <div className="cms-content" dangerouslySetInnerHTML={{ __html: event.content }} />
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const events = await queryToModels<EventModel>(query(collection(db, 'events')))
  // const pahts = events.map((event) => ({ params: { id: event.id } }))
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true }

  const id = params.id as string
  const event = await docRefToModel<EventModel>(doc(db, 'events', id))

  const image = await downloadImage(`/events/${event.id}`, 'lg')
  const defaultImage = await downloadDefaultEventImage()

  return {
    props: {
      event,
      image,
      defaultImage,
    },
    revalidate: 5 * 60,
  }
}
