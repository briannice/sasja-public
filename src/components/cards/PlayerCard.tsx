import useImage from '@/hooks/useImage'
import { PlayerModel } from '@/types/models'
import Image from 'next/image'
import React from 'react'

type Props = {
  player: PlayerModel
}

export default function PlayerCard({ player }: Props) {
  const image = useImage('players', player.id, 'sm')

  return (
    <section className="card card-click col-span-3">
      <figure className="relative aspect-[675/900]">
        {image && (
          <Image
            src={image}
            alt="Player Image"
            fill
            className="player-image"
            unoptimized
          />
        )}
      </figure>
      <div className="team-number">{player.backNumber}</div>
      <h3 className="p-2 text-center text-lg">{player.firstname + ' ' + player.lastname}</h3>
    </section>
  )
}
