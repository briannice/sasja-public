import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'

import React from 'react'

import { collection, doc, query } from 'firebase/firestore'

import { db } from '@/services/firebase'
import { docRefToModel, queryToModels } from '@/services/firebase/firestore'
import { downloadDefaultEventImage, downloadImage } from '@/services/firebase/storage'

import { NewsModel } from '@/types/models'

import { formatDate } from '@/utils/date'

type Props = {
  news: NewsModel
  image: string | null
  defaultImage: string
}

export default function NewsDatailPage({ news, image, defaultImage }: Props) {
  const router = useRouter()

  if (router.isFallback) return <></>

  const tags = ['NIEUWS', news.tag]

  return (
    <>
      <Head>
        <title>{`Sasja HC | ${news.title}`}</title>

        <meta property="og:url" content={`https://www.sasja-antwerpen.com/nieuws/${news.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content="" />
        <meta property="og:image" content={image ? image : defaultImage} />
      </Head>
      <main className="cms-content-root">
        <div className="cms-content-wrapper">
          <h1>{news.title}</h1>
          <ul className="tag-wrapper">
            <li className="tag-time">
              <time>{formatDate(news.time, 'DD/MM/YYYY')}</time>
            </li>
            {tags.map((tag, i) => (
              <li key={i} className="tag-fill">
                <p>{tag}</p>
              </li>
            ))}
          </ul>
          {image && (
            <figure>
              <Image src={image} alt="News image." layout="fill" objectFit="cover" />
            </figure>
          )}
          <div className="cms-content" dangerouslySetInnerHTML={{ __html: news.content }} />
        </div>
      </main>
    </>
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

  const image = await downloadImage(`/news/${news.id}`, 'lg')
  const defaultImage = await downloadDefaultEventImage()

  return {
    props: {
      news,
      image,
      defaultImage,
    },
    revalidate: 5 * 60,
  }
}
