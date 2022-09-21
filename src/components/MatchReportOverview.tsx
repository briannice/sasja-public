import MatchreportCard from '@/components/cards/MatchreportCard'
import Container from '@/components/Container'
import { useTailwindBreakpoint } from '@/hooks/useTailwindBreakpoint'
import { db } from '@/services/firebase'
import { queryToModels } from '@/services/firebase/firestore'
import { MatchReportModel } from '@/types/models'
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
  initialMatchReports: MatchReportModel[]
  teamId?: string
}

export default function MatchReportOverview({ initialMatchReports, teamId = '' }: Props) {
  const [matchReports, setMatchReports] = useState([...initialMatchReports])
  const [hasMore, setHasMore] = useState(true)
  const [showing, setShowing] = useState(0)
  const [step, setStep] = useState(0)

  const breakpoint = useTailwindBreakpoint()

  useEffect(() => {
    if (breakpoint) {
      switch (breakpoint) {
        case 'desktop':
          setShowing(6)
          setHasMore(matchReports.length > 6)
          setStep(6)
          break
        case 'laptop':
          setShowing(6)
          setHasMore(matchReports.length > 6)
          setStep(6)
          break
        case 'tablet':
          setShowing(3)
          setHasMore(matchReports.length > 3)
          setStep(3)
          break
        case 'phone':
          setShowing(2)
          setHasMore(matchReports.length > 2)
          setStep(2)
          break
      }
    }
  }, [breakpoint, matchReports])

  if (!breakpoint || initialMatchReports.length === 0) return <></>

  const loadMoreHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (showing + step <= matchReports.length) {
      setShowing(showing + step)
      return
    }

    const lastDoc = await getDoc(doc(db, 'matchreport', matchReports[matchReports.length - 1].id))

    let newMatchReports: MatchReportModel[] = []
    if (teamId === '') {
      newMatchReports = await queryToModels<MatchReportModel>(
        query(
          collection(db, 'matchreport'),
          where('public', '==', true),
          where('teamId', '==', teamId),
          orderBy('time', 'desc'),
          startAfter(lastDoc),
          limit(10)
        )
      )
    } else {
      newMatchReports = await queryToModels<MatchReportModel>(
        query(
          collection(db, 'matchreport'),
          where('public', '==', true),
          orderBy('time', 'desc'),
          startAfter(lastDoc),
          limit(10)
        )
      )
    }

    if (newMatchReports.length === 0) {
      setShowing(matchReports.length)
      setHasMore(false)
    }

    setMatchReports([...matchReports, ...newMatchReports])
    setShowing(showing + step)
  }

  return (
    <Container className="grid grid-cols-4 gap-8 tablet:grid-cols-8 laptop:grid-cols-12">
      <h2 className="title1 col-span-4 tablet:col-span-8 laptop:col-span-12">Matchverslagen</h2>
      {matchReports.map(
        (matchReport, i) =>
          i < showing && <MatchreportCard key={matchReport.id} matchReport={matchReport} />
      )}
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
