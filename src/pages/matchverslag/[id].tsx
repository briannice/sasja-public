import ClubLogo from '@/components/teams/ClubLogo'
import useImage from '@/hooks/useImage'
import { db } from '@/services/firebase'
import { docRefToModel, queryToModels } from '@/services/firebase/firestore'
import { MatchReportModel, OpponentModel, TeamModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import clsx from 'clsx'
import { collection, doc, query } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  matchReport: MatchReportModel
  team: TeamModel
  opponent: OpponentModel
}

export default function MatchReportDetailPage({ matchReport, team, opponent }: Props) {
  const router = useRouter()
  const image = useImage('matchreport', matchReport ? matchReport.id : '', 'lg')

  if (router.isFallback) return <></>

  const tags = ['MATCHVERSLAG', matchReport.tag]

  return (
    <main className="cms-content-wrapper">
      <h1
        className={clsx(
          'flex items-center',
          matchReport.home ? 'flex-row justify-start' : 'flex-row-reverse justify-end'
        )}
      >
        <p>{team.name}</p>
        <p className="mx-8 text-lg">vs</p>
        <p>{opponent.name}</p>
      </h1>
      <div className="mt-8 flex items-center space-x-8">
        <time className="font-kanit text-xl">{formatDate(matchReport.time, 'DD/MM/YYYY')}</time>
        <ul className="flex space-x-8">
          {tags.map((tag, i) => (
            <li key={i} className="rounded-sm bg-primary px-4 py-1 shadow-sm">
              <p className="font-kanit text-sm text-white">{tag}</p>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={clsx(
          'mt-16 flex items-center justify-center',
          matchReport.home ? 'flex-row' : 'flex-row-reverse'
        )}
      >
        <ClubLogo sasja={true} size={120} />
        <div className="flex flex-col items-center space-y-2">
          {matchReport.score.map((score, i) => (
            <p
              key={i}
              className={clsx(
                'mx-8 flex font-kanit',
                matchReport.home ? 'flex-row' : 'flex-row-reverse'
              )}
            >
              <span
                className={clsx(
                  'inline-block w-10 text-3xl',
                  matchReport.home ? 'text-right' : 'text-left'
                )}
              >
                {score.sasja}
              </span>
              <span className="mx-2 inline-block text-3xl">-</span>
              <span
                className={clsx(
                  'inline-block w-10 text-3xl',
                  matchReport.home ? 'text-left' : 'text-right'
                )}
              >
                {score.opponent}
              </span>
            </p>
          ))}
        </div>
        <ClubLogo path={opponent.logo} size={120} />
      </div>
      <figure className="relative mt-16 h-80 overflow-hidden">
        {image && <Image src={image} alt="News image." layout="fill" objectFit="contain" />}
      </figure>
      <div className="cms-content" dangerouslySetInnerHTML={{ __html: matchReport.content }} />
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const matchReports = await queryToModels<MatchReportModel>(query(collection(db, 'matchreport')))

  const pahts = matchReports.map((mr) => ({ params: { id: mr.id } }))
  return {
    paths: pahts,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { notFound: true }
  const id = params.id as string
  const matchReport = await docRefToModel<MatchReportModel>(doc(db, 'matchreport', id))
  const team = await docRefToModel<TeamModel>(doc(db, 'teams', matchReport.teamId))
  const opponent = await docRefToModel<OpponentModel>(doc(db, 'opponents', matchReport.opponentId))
  return {
    props: {
      matchReport: matchReport,
      team: team,
      opponent: opponent,
    },
  }
}
