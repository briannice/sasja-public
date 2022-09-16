import NewsCard from '@/components/cards/NewsCard'
import Container from '@/components/Container'
import { useTailwindBreakpoint } from '@/hooks/useTailwindBreakpoint'
import { db } from '@/services/firebase'
import { queryToModels } from '@/services/firebase/firestore'
import { NewsModel } from '@/types/models'
import {
  collection,
  doc,
  getDoc,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { RiMoreLine } from 'react-icons/ri'

type Props = {
  initialNews: NewsModel[]
}

export default function NewsOverview({ initialNews }: Props) {
  const [news, setNews] = useState([...initialNews])
  const [hasMore, setHasMore] = useState(true)
  const [showing, setShowing] = useState(0)
  const [step, setStep] = useState(0)

  const breakpoint = useTailwindBreakpoint()

  useEffect(() => {
    if (breakpoint) {
      switch (breakpoint) {
        case 'desktop':
          setShowing(6)
          setHasMore(news.length > 6)
          setStep(6)
          break
        case 'laptop':
          setShowing(6)
          setHasMore(news.length > 6)
          setStep(6)
          break
        case 'tablet':
          setShowing(3)
          setHasMore(news.length > 3)
          setStep(3)
          break
        case 'phone':
          setShowing(2)
          setHasMore(news.length > 2)
          setStep(2)
          break
      }
    }
  }, [breakpoint, news])

  if (!breakpoint) return <></>

  const loadMoreHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (showing + step <= news.length) {
      setShowing(showing + step)
      return
    }

    const lastDoc = await getDoc(doc(db, 'news', news[news.length - 1].id))

    const newNews = await queryToModels<NewsModel>(
      query(
        collection(db, 'news'),
        where('public', '==', true),
        orderBy('time', 'desc'),
        startAfter(lastDoc),
        limit(10)
      )
    )

    if (newNews.length === 0) {
      setShowing(news.length)
      setHasMore(false)
    }

    setNews([...news, ...newNews])
    setShowing(showing + step)
  }

  return (
    <Container className="grid grid-cols-4 gap-8 tablet:grid-cols-8 laptop:grid-cols-12">
      <h2 className="title1 col-span-4 tablet:col-span-8 laptop:col-span-12">Nieuws</h2>
      {news.map((news, i) => i < showing && <NewsCard key={news.id} news={news} />)}
      {hasMore && (
        <div className="col-span-4 flex justify-center tablet:col-span-8 laptop:col-span-12">
          <button onClick={loadMoreHandler} className="btn btn-primary btn-text-icon">
            <span>Meer</span>
            <RiMoreLine />
          </button>
        </div>
      )}
    </Container>
  )
}
