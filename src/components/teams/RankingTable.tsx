import React from 'react'

import ClubLogo from '@/components/teams/ClubLogo'

import { RankModel } from '@/types/models'

import { cn } from '@/utils/utils'

type Props = {
  ranking: RankModel[]
}

export default function RankingTable({ ranking }: Props) {
  return (
    <div className="overflow-auto">
      <table className="text-center">
        <thead>
          <tr>
            <th className="text-center">
              <p>#</p>
            </th>
            <th className="text-right">
              <p>Team</p>
            </th>
            <th className="text-center">
              <p>P</p>
            </th>
            <th className="text-center">
              <p>G</p>
            </th>
            <th className="text-center">
              <p>W</p>
            </th>
            <th className="text-center">
              <p>D</p>
            </th>
            <th className="text-center">
              <p>L</p>
            </th>
            <th className="text-center">
              <p>+/-</p>
            </th>
            <th className="text-center">
              <p>+</p>
            </th>
            <th className="text-center">
              <p>-</p>
            </th>
            <th>Resultaten</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((rank) => (
            <tr key={rank.id}>
              <td>
                <p>{rank.position}</p>
              </td>
              <td>
                <div className="flex items-center justify-end space-x-4">
                  <p>{rank.name}</p>
                  <ClubLogo path={rank.logo} size={20} />
                </div>
              </td>
              <td className="font-bold">
                <p>{rank.points}</p>
              </td>
              <td>
                <p>{rank.played}</p>
              </td>
              <td>
                <p>{rank.wins}</p>
              </td>
              <td>
                <p>{rank.draws}</p>
              </td>
              <td>
                <p>{rank.losses}</p>
              </td>
              <td>
                <p>{rank.difference}</p>
              </td>
              <td>
                <p>{rank.scored}</p>
              </td>
              <td>
                <p>{rank.conceded}</p>
              </td>
              <td>
                <ul className="flex items-center space-x-2">
                  {rank.results.map((type, i) => (
                    <li key={i}>
                      <p
                        className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white',
                          type === 'W' && 'bg-success',
                          type === 'D' && 'bg-warning',
                          type === 'L' && 'bg-error'
                        )}
                      >
                        {type}
                      </p>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
