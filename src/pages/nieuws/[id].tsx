import useImage from '@/hooks/useImage'
import { db } from '@/services/firebase'
import { queryToModels, docRefToModel } from '@/services/firebase/firestore'
import { NewsModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import { collection, doc, query } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React from 'react'

type Props = {
  news: NewsModel
}

export default function NewsDatailPage({ news }: Props) {
  const image = useImage('news', news.id, 'lg')

  return (
    <main className="cms-content-wrapper">
      <h1>{news.title}</h1>
      <div className="cms-content-info">
        <time>{formatDate(news.time, 'DD/MM/YYYY')}</time>
        <ul>
          <li>
            <p>NIEUWS</p>
          </li>
          <li>
            <p>{news.tag}</p>
          </li>
        </ul>
      </div>
      <figure className="relative mt-8 h-80 overflow-hidden">
        {image && <Image src={image} alt="News image." layout="fill" objectFit="contain" />}
      </figure>
      <div className="cms-content" dangerouslySetInnerHTML={{ __html: news.content }} />
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const news = await queryToModels<NewsModel>(query(collection(db, 'news')))
  const pahts = news.map((news) => ({ params: { id: news.title } }))
  return {
    paths: pahts,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true }
  const id = params.id as string
  const news = await docRefToModel(doc(db, 'news', id))
  return {
    props: {
      news: news,
    },
  }
}
