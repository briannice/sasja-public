import ClubLogo from '@/components/teams/ClubLogo'
import { db } from '@/services/firebase'
import { docRefToModel, queryToModels } from '@/services/firebase/firestore'
import { downloadImage } from '@/services/firebase/storage'
import { MatchReportModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import clsx from 'clsx'
import { collection, doc, query } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  matchReport: MatchReportModel
  image: string
}

export default function MatchReportDetailPage({ matchReport, image }: Props) {
  const router = useRouter()

  if (router.isFallback) return <></>

  const tags = ['MATCHVERSLAG', matchReport.tag]

  const createHeader = () => {
    if (matchReport.home) {
      return `${matchReport.team.name} - ${matchReport.opponent.name}`
    } else {
      return `${matchReport.opponent.name} - ${matchReport.team.name}`
    }
  }

  return (
    <>
      <Head>
        <title>{`Sasja HC | ${createHeader()}`}</title>

        <meta
          property="og:url"
          content={`https://www.sasja-antwerpen.com/matchverslagen/${matchReport.id}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={createHeader()} />
        <meta property="og:description" content="" />
        <meta property="og:image" content={image} />
      </Head>
      <main className="cms-content-wrapper">
        <h1>{createHeader()}</h1>
        <ul className="tag-wrapper">
          <li className="tag-time">
            <time>{formatDate(matchReport.time, 'DD/MM/YYYY')}</time>
          </li>
          {tags.map((tag, i) => (
            <li key={i} className="tag-fill">
              <p>{tag}</p>
            </li>
          ))}
        </ul>
        <figure>
          <Image src={image} alt="News image." layout="fill" objectFit="cover" />
        </figure>
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
          <ClubLogo path={matchReport.opponent.logo} size={120} />
        </div>
        <div className="cms-content" dangerouslySetInnerHTML={{ __html: matchReport.content }} />
      </main>
    </>
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

  const image = await downloadImage(`/matchreport/${matchReport.id}`, 'lg')

  return {
    props: {
      matchReport,
      image,
    },
    revalidate: 5 * 60,
  }
}
