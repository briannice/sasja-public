import CarouselItem from '@/components/carousel/CarouselItem'
import Link from '@/components/Link'
import { NewsModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  news: NewsModel
  goNextItem: () => void
  goPreviousItem: () => void
  show: boolean
}

export default function NewsCarouselItem({ news, goNextItem, goPreviousItem, show }: Props) {
  return (
    <CarouselItem
      show={show}
      col="news"
      id={news.id}
      goNextItem={goNextItem}
      goPreviousItem={goPreviousItem}
    >
      <h3 className="text-6xl font-bold text-white">{news.title}</h3>
      <ul className="mt-8 flex divide-x divide-primary">
        <li className="pr-8">
          <p className="font-kanit text-xl text-white">{news.tag}</p>
        </li>
        <li className="px-8">
          <time className="font-kanit text-xl text-white">{formatDate(news.time, 'DD/MM')}</time>
        </li>
      </ul>
      <Link href={`/nieuws/${news.id}`} className="btn btn-primary btn-text-icon mt-8">
        <span>Lees meer</span>
        <RiArrowRightSLine />
      </Link>
    </CarouselItem>
  )
}
