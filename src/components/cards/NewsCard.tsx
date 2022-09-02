import useImage from '@/hooks/useImage'
import { NewsModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import Image from 'next/image'
import React from 'react'

type Props = {
  news: NewsModel
}

export default function NewsCard({ news }: Props) {
  const image = useImage('news', news.id, 'sm')

  return (
    <section className="card card-click card-col-1">
      <figure className="relative aspect-video">
        {image && <Image src={image} alt="Event image." layout="fill" objectFit="cover" />}
      </figure>
      <h3>{news.title}</h3>
      <div>
        <time>{formatDate(news.time, 'DD/MM')}</time>
        <ul>
          <li>Nieuws</li>
          <li>{news.tag}</li>
        </ul>
      </div>
    </section>
  )
}
