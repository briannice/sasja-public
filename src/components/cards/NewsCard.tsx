import Link from '@/components/Link'
import useImage from '@/hooks/useImage'
import { NewsModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import Image from "next/legacy/image"
import React from 'react'

type Props = {
  news: NewsModel
}

export default function NewsCard({ news }: Props) {
  const image = useImage('news', news.id, 'sm')

  return (
    <Link href={`/nieuws/${news.id}`} className="card card-click card-col-1">
      <section className="flex h-full flex-col">
        <figure className="relative aspect-video">
          {image && <Image src={image} alt="Nieuws banner." layout="fill" objectFit="cover" />}
        </figure>
        <h3 className="m-4 flex-1 border-b border-primary pb-4 text-2xl">{news.title}</h3>
        <div className="m-4 mt-0 flex items-center justify-between">
          <ul className="flex space-x-4">
            <li className="rounded-xs ml-auto bg-primary px-1.5 py-0.5">
              <p className="font-kanit text-sm text-white">NIEUWS</p>
            </li>
            <li className="rounded-xs bg-primary px-1.5 py-0.5">
              <p className="font-kanit text-sm text-white">{news.tag}</p>
            </li>
          </ul>
          <time className="font-kanit">{formatDate(news.time, 'DD/MM')}</time>
        </div>
      </section>
    </Link>
  )
}
