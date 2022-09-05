import Link from '@/components/Link'
import { RankModel } from '@/types/models'
import clsx from 'clsx'
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'

type Props = {
  name: string
  ranking: RankModel[]
  serieId: number
}

export default function Competition({ name, ranking, serieId }: Props) {
  return (
    <section className="py-16">
      <div className="container grid grid-cols-2 gap-8">
        <h2 className="col-span-2 text-3xl">{name}</h2>
        <div className="flex flex-col items-center space-y-8">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th className="text-right">Ptn</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((rank) => (
                <tr key={rank.id} className={clsx(rank.team_name === 'Sasja HC' && 'font-bold')}>
                  <td>{rank.position}</td>
                  <td>{rank.team_name}</td>
                  <td className="text-right">{rank.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href={`/team/klassement/${serieId}`} className="btn btn-primary btn-text-icon">
            <span>Volledig klassement</span>
            <RiArrowRightSLine />
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-8">
          <table></table>
          <Link href={`/team/kalender/${serieId}`} className="btn btn-primary btn-text-icon">
            <span>Volledige kalender</span>
            <RiArrowRightSLine />
          </Link>
        </div>
      </div>
    </section>
  )
}
