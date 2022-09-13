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

  const tags = ['NIEUWS', news.tag]

  return (
    <main className="cms-content-wrapper">
      <h1>{news.title}</h1>
      <div className="mt-8 flex items-center space-x-8">
        <time className="font-kanit text-xl">{formatDate(news.time, 'DD/MM/YYYY')}</time>
        <ul className="flex space-x-8">
          {tags.map((tag, i) => (
            <li key={i} className="rounded-sm bg-primary px-4 py-1 shadow-sm">
              <p className="font-kanit text-sm text-white">{tag}</p>
            </li>
          ))}
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
  const pahts = news.map((news) => ({ params: { id: news.id } }))
  return {
    paths: pahts,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true }
  const id = params.id as string
  const news = await docRefToModel<NewsModel>(doc(db, 'news', id))
  return {
    props: {
      news: news,
    },
  }
}
