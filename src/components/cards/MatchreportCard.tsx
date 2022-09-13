import Link from '@/components/Link'
import ClubLogo from '@/components/teams/ClubLogo'
import { MatchReportModel, OpponentModel, TeamModel } from '@/types/models'
import { formatDate } from '@/utils/date'
import clsx from 'clsx'
import React from 'react'

type Props = {
  matchReport: MatchReportModel
  team: TeamModel | undefined
  opponent: OpponentModel | undefined
}

export default function MatchreportCard({ matchReport, team, opponent }: Props) {
  if (!team || !opponent) return <></>

  const tags = [matchReport.tag, formatDate(matchReport.time, 'DD/MM')]

  return (
    <Link href={`/matchverslag/${matchReport.id}`} className="card card-click card-col-1">
      <section className="flex h-full flex-col justify-evenly p-4 pt-16">
        <div className="absolute inset-x-0 top-0 bg-primary py-2">
          <h3 className="text-center font-kanit text-xl text-white">Matchverslag</h3>
        </div>
        <div
          className={clsx(
            'flex items-center justify-evenly',
            matchReport.home ? 'flex-row' : 'flex-row-reverse'
          )}
        >
          <ClubLogo sasja={true} size={60} />
          <div className="flex flex-col items-center space-y-2">
            {matchReport.score.map((score, i) => (
              <p
                key={i}
                className={clsx(
                  'flex font-kanit',
                  matchReport.home ? 'flex-row' : 'flex-row-reverse'
                )}
              >
                <span
                  className={clsx(
                    'inline-block w-10 text-xl',
                    matchReport.home ? 'text-right' : 'text-left'
                  )}
                >
                  {score.sasja}
                </span>
                <span className="mx-2 inline-block text-lg">-</span>
                <span
                  className={clsx(
                    'inline-block w-10 text-xl',
                    matchReport.home ? 'text-left' : 'text-right'
                  )}
                >
                  {score.opponent}
                </span>
              </p>
            ))}
          </div>
          <ClubLogo path={opponent.logo} size={60} />
        </div>
        <div
          className={clsx('flex items-center', matchReport.home ? 'flex-col' : 'flex-col-reverse')}
        >
          <p className="font-kanit text-2xl">{team.name}</p>
          <p>vs</p>
          <p className="font-kanit text-2xl">{opponent.short}</p>
        </div>
        <ul className="flex justify-center space-x-4">
          {tags.map((tag, i) => (
            <li key={i} className="rounded-sm bg-primary px-1.5 py-0.5">
              <p className="font-kanit text-sm text-white">{tag}</p>
            </li>
          ))}
        </ul>
      </section>
    </Link>
  )
}
