import CarouselHeroItem from '@/components/carousel/CarouselHeroItem'
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
    <CarouselHeroItem
      show={show}
      col="news"
      id={news.id}
      goNextItem={goNextItem}
      goPreviousItem={goPreviousItem}
    >
      <h3>{news.title}</h3>
      <ul>
        <li>
          <p>{news.tag}</p>
        </li>
        <li>
          <time>{formatDate(news.time, 'DD/MM')}</time>
        </li>
      </ul>
      <Link href={`/nieuws/${news.id}`}>
        <span>Lees meer</span>
        <RiArrowRightSLine />
      </Link>
    </CarouselHeroItem>
  )
}
